/**
 * A preview copy of the site (not sitnikov.com.ua itself): no indexing, no
 * analytics, drafts and the course prototype are visible, leads are marked
 * as tests.
 *
 * NEXT_PUBLIC_NOINDEX=1 forces it, =0 turns it off. Without the variable a
 * Vercel preview deployment counts as a preview by itself
 * (NEXT_PUBLIC_VERCEL_ENV is set by Vercel), so nothing has to be configured.
 */
export const IS_PREVIEW =
  process.env.NEXT_PUBLIC_NOINDEX === "1" ||
  (process.env.NEXT_PUBLIC_NOINDEX !== "0" &&
    (process.env.NEXT_PUBLIC_VERCEL_ENV || process.env.VERCEL_ENV) ===
      "preview");
