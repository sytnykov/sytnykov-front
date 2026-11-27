import { createClient } from "@sanity/client";

import { formatLeadContext, parseLeadContext } from "@/lib/leads/context";
import { IS_PREVIEW } from "@/utils/env";

type Payload = {
  name?: string;
  phone?: string;
  email?: string;
  message?: string;
  course?: string;
  messageFrom?: string;
  page?: string;
  /** honeypot — must stay empty */
  company?: string;
  /** ms between opening the form and sending it */
  elapsed?: number;
  /** visit attribution from the browser, untrusted (see lib/leads/context) */
  lead?: unknown;
};

const MIN_FILL_TIME_MS = 2500;
const clip = (value: unknown, max: number) =>
  typeof value === "string" ? value.trim().slice(0, max) : "";

const ok = () => new Response(JSON.stringify({ ok: true }), { status: 200 });
const fail = (error: string, status: number) =>
  new Response(JSON.stringify({ error }), { status });

/** Saves the request in the admin (Sanity) when a write token is configured. */
const saveToAdmin = async (doc: Record<string, string>) => {
  const token = process.env.SANITY_API_WRITE_TOKEN;
  if (!token) return;

  const writer = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
    token,
    useCdn: false,
  });

  // The dataset is public: an id with a dot ("applications.<id>") puts the
  // document on a private path that only authenticated requests can read,
  // so names, phones and e-mails never leak through the public API.
  await writer.create({
    _id: `applications.${crypto.randomUUID()}`,
    _type: "application",
    status: "new",
    submittedAt: new Date().toISOString(),
    ...doc,
  });
};

export async function POST(req: Request): Promise<Response> {
  let body: Payload;
  try {
    body = (await req.json()) as Payload;
  } catch {
    return fail("Bad request", 400);
  }

  // Anti-spam: bots fill the hidden field. Answer "ok" so they get no
  // signal, but drop the request.
  if (clip(body.company, 200)) return ok();
  // Submitted too fast (autofill + instant click, or a bot): ask to retry
  // instead of pretending success, so a real lead is never lost silently.
  if ((body.elapsed ?? 0) < MIN_FILL_TIME_MS) {
    return fail("Too fast, please try again", 429);
  }

  const name = clip(body.name, 150);
  const phone = clip(body.phone, 25);
  const email = clip(body.email, 150);
  const message = clip(body.message, 1000);
  const course = clip(body.course, 200);
  const source = clip(body.messageFrom, 100);
  const page = clip(body.page, 300);

  if (!name || phone.replace(/\D/g, "").length < 7) {
    return fail("Invalid form data", 422);
  }

  const context = parseLeadContext(body.lead);
  const attribution = context ? formatLeadContext(context) : [];

  const lines = [
    `🆕 Заявка: ${source || "з сайту"}${course ? ` — ${course}` : ""}`,
    `👤 Ім'я: ${name}`,
    `📞 Телефон: ${phone}`,
  ];
  if (email) lines.push(`✉️ E-mail: ${email}`);
  if (message) lines.push(`📝 Повідомлення: ${message}`);
  if (page) lines.push(`🔗 Сторінка: ${page}`);
  lines.push(...attribution);
  // Preview copies share the client's chat and admin: say it is a test.
  if (IS_PREVIEW) lines.unshift("🧪 ТЕСТ з превʼю-копії сайту, не обробляти");

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  const [telegram, admin] = await Promise.allSettled([
    token && chatId
      ? fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chat_id: chatId, text: lines.join("\n") }),
        }).then(res => {
          if (!res.ok) throw new Error(`Telegram API ${res.status}`);
        })
      : Promise.reject(
          new Error("Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID")
        ),
    saveToAdmin({
      name,
      phone,
      email,
      message,
      course,
      source: IS_PREVIEW ? `ТЕСТ · ${source}` : source,
      page,
      attribution: attribution.map(l => l.replace(/^— /, "")).join("\n"),
    }),
  ]);

  if (telegram.status === "rejected") console.error(telegram.reason);
  if (admin.status === "rejected") console.error(admin.reason);

  // The request is accepted if at least one channel received it.
  const delivered =
    telegram.status === "fulfilled" ||
    (admin.status === "fulfilled" && !!process.env.SANITY_API_WRITE_TOKEN);

  return delivered ? ok() : fail("Delivery failed", 502);
}
