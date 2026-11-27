import { revalidatePath } from "next/cache";

/**
 * Sanity webhook: after a document is published, refresh cached pages.
 *
 * Sanity → API → Webhooks: URL https://<domain>/api/revalidate,
 * trigger on create/update/delete, HTTP method POST,
 * header `Authorization: Bearer <SANITY_REVALIDATE_SECRET>`.
 * The same secret must be set as SANITY_REVALIDATE_SECRET on Vercel.
 *
 * Most pages render on request and already show fresh content; this covers
 * what is cached for a day (sitemap.xml, llms.txt, announcements).
 */
export async function POST(req: Request): Promise<Response> {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  const auth = req.headers.get("authorization") || "";
  const given = auth.startsWith("Bearer ")
    ? auth.slice(7)
    : new URL(req.url).searchParams.get("secret") || "";

  if (!secret || given !== secret) {
    return new Response(JSON.stringify({ ok: false }), { status: 401 });
  }

  revalidatePath("/", "layout");
  revalidatePath("/sitemap.xml");
  revalidatePath("/llms.txt");

  return new Response(JSON.stringify({ ok: true, revalidated: true }), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
}
