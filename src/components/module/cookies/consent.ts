/** Visitor's cookie choice, kept in the browser. */
export const CONSENT_KEY = "sitnikov-consent";
export const OPEN_SETTINGS_EVENT = "sitnikov:open-cookie-settings";
export const CONSENT_CHANGED_EVENT = "sitnikov:consent-changed";

export type Consent = { analytics: boolean; ts: number };

export const readConsent = (): Consent | null => {
  try {
    const raw = window.localStorage.getItem(CONSENT_KEY);
    return raw ? (JSON.parse(raw) as Consent) : null;
  } catch {
    return null;
  }
};

export const saveConsent = (analytics: boolean) => {
  const consent: Consent = { analytics, ts: Date.now() };
  try {
    window.localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
  } catch {
    /* private mode: the choice lives for this page view only */
  }
  const state = analytics ? "granted" : "denied";
  window.gtag?.("consent", "update", {
    analytics_storage: state,
    ad_storage: state,
    ad_user_data: state,
    ad_personalization: state,
  });
  window.dispatchEvent(
    new CustomEvent(CONSENT_CHANGED_EVENT, { detail: consent })
  );
};
