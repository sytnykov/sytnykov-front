import { NextRequest, NextResponse } from "next/server";

/**
 * WayForPay return URL: https://sitnikov.com.ua/api/thanks/<course-slug>
 * WayForPay sends the visitor here with a POST form (status, amount, order).
 * We turn it into a normal page address so the browser can show
 * /uk/thanks/<course-slug> and the address can be refreshed safely.
 */
const SAFE = /^[a-z0-9-]{1,120}$/;

const toPage = async (
  req: NextRequest,
  slug: string,
  data: URLSearchParams
) => {
  const lang = req.nextUrl.searchParams.get("lang") === "ru" ? "ru" : "uk";
  const target = new URL(
    `/${lang}/thanks/${SAFE.test(slug) ? slug : ""}`,
    req.nextUrl.origin
  );

  const status = (
    data.get("transactionStatus") ||
    data.get("status") ||
    ""
  ).toLowerCase();
  if (status) target.searchParams.set("status", status.slice(0, 20));
  const amount = Number(data.get("amount"));
  if (Number.isFinite(amount) && amount > 0)
    target.searchParams.set("amount", String(amount));
  const currency = data.get("currency");
  if (currency && /^[A-Z]{3}$/.test(currency))
    target.searchParams.set("currency", currency);
  const order = data.get("orderReference");
  if (order && /^[\w.-]{1,64}$/.test(order))
    target.searchParams.set("order", order);

  // 303: the browser follows with GET
  return NextResponse.redirect(target, 303);
};

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  let data = new URLSearchParams();
  try {
    const type = req.headers.get("content-type") || "";
    if (type.includes("application/json")) {
      const json = (await req.json()) as Record<string, unknown>;
      data = new URLSearchParams(
        Object.entries(json).map(([k, v]) => [k, String(v ?? "")])
      );
    } else {
      const form = await req.formData();
      form.forEach((v, k) => typeof v === "string" && data.set(k, v));
    }
  } catch {
    /* empty or unknown body: still show the page */
  }
  return toPage(req, slug, data);
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  return toPage(req, slug, req.nextUrl.searchParams);
}
