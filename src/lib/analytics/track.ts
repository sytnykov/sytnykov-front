/**
 * One place to send analytics events.
 * Events go to the GTM dataLayer only: GTM forwards them to GA4. When GA4 is
 * loaded directly (no GTM), gtag.js reads the same dataLayer, so a second
 * gtag("event") call would count every event twice.
 * Nothing is sent until the visitor accepts analytics cookies (Consent Mode).
 */
type EventParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

/** Our events → Meta Pixel standard events (Pixel loads only after consent). */
const META_EVENTS: Record<string, string> = {
  generate_lead: "Lead",
  begin_checkout: "InitiateCheckout",
  purchase: "Purchase",
  click_phone: "Contact",
  click_telegram: "Contact",
  click_email: "Contact",
};

export const track = (event: string, params: EventParams = {}) => {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
  const meta = META_EVENTS[event];
  if (meta && window.fbq) {
    const { value, currency } = params;
    window.fbq(
      "track",
      meta,
      value !== undefined ? { value, currency: currency ?? "UAH" } : {}
    );
  }
};
