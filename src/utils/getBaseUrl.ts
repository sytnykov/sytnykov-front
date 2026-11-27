/**
 * Canonical origin of the site. One fixed domain (no www) so that
 * www/non-www copies never compete in search.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://sitnikov.com.ua"
).replace(/\/$/, "");

export const getBaseUrl = async () => SITE_URL;
