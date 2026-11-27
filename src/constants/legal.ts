/** Legal documents: slug in the URL and in the admin (Sanity `legalPage`). */
export const LEGAL_PAGES = [
  "privacy-policy",
  "public-offer",
  "digital-content-agreement",
  "refund-policy",
  "terms-of-use",
] as const;

export type LegalSlug = (typeof LEGAL_PAGES)[number];

export const legalPath = (slug: LegalSlug) => `/legal/${slug}`;
