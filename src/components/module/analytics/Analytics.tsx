"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

import { TRACK_EVENT, track } from "@/lib/analytics/track";
import { IS_PREVIEW } from "@/utils/env";

import {
  CONSENT_CHANGED_EVENT,
  Consent,
  readConsent,
} from "../cookies/consent";

/** GA4, Clarity and events live in the GTM container; set "none" to disable it. */
const GTM_ID =
  process.env.NEXT_PUBLIC_GTM_ID === "none"
    ? ""
    : process.env.NEXT_PUBLIC_GTM_ID || "GTM-WR25C8Z2";
const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-SHD2CN19M2";
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID || "zfioiskill";
/** Meta Pixel: set NEXT_PUBLIC_META_PIXEL_ID (or add the Pixel tag in GTM instead). */
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || "";

/**
 * Preview copies (see IS_PREVIEW) never send data to the client's analytics
 * unless NEXT_PUBLIC_ANALYTICS_DEBUG=1.
 */
const ENABLED = !IS_PREVIEW || process.env.NEXT_PUBLIC_ANALYTICS_DEBUG === "1";

/** Consent Mode v2 defaults: everything denied until the visitor accepts. */
const consentDefaults = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
var c = null;
try { c = JSON.parse(localStorage.getItem('sitnikov-consent')); } catch (e) {}
var s = c && c.analytics ? 'granted' : 'denied';
gtag('consent', 'default', {
  analytics_storage: s, ad_storage: s, ad_user_data: s, ad_personalization: s,
  functionality_storage: 'granted', security_storage: 'granted',
  wait_for_update: 500
});
`;

/**
 * The GTM container (~200 KB) is fetched once the page itself has finished
 * loading, or at the visitor's first tap, key press or scroll if that comes
 * earlier, so it does not compete with the first screen on a phone.
 * Nothing is lost: the consent defaults above are already in the dataLayer,
 * and every event pushed before the container arrives is processed, in order,
 * as soon as it does. An analytics event (track) also starts it at once.
 */
const FIRST_INPUT_EVENTS = ["pointerdown", "keydown", "touchstart", "scroll"];

const useGtm = (id: string) => {
  useEffect(() => {
    if (!id) return;

    let started = false;
    let cancelled = false;
    let timer = 0;
    const options = { capture: true, passive: true } as const;

    const start = () => {
      if (started || cancelled) return;
      // the consent defaults (inline script below) always go in first
      if (typeof window.gtag !== "function") {
        window.clearTimeout(timer);
        timer = window.setTimeout(start, 50);
        return;
      }
      started = true;
      cleanup();
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
      const script = document.createElement("script");
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtm.js?id=${id}`;
      document.head.appendChild(script);
    };

    // after "load": let the browser finish what it is painting first
    const whenIdle = () => {
      if (typeof window.requestIdleCallback === "function") {
        window.requestIdleCallback(start, { timeout: 2000 });
      } else {
        timer = window.setTimeout(start, 200);
      }
    };

    const cleanup = () => {
      window.clearTimeout(timer);
      window.removeEventListener("load", whenIdle);
      window.removeEventListener(TRACK_EVENT, start);
      FIRST_INPUT_EVENTS.forEach(type =>
        window.removeEventListener(type, start, options)
      );
    };

    FIRST_INPUT_EVENTS.forEach(type =>
      window.addEventListener(type, start, options)
    );
    window.addEventListener(TRACK_EVENT, start);
    // an event is already waiting (e.g. "purchase" on the thank-you page)
    const hasEvent = (window.dataLayer || []).some(
      entry => !!entry && typeof entry === "object" && "event" in entry
    );
    if (hasEvent) start();
    else if (document.readyState === "complete") whenIdle();
    else window.addEventListener("load", whenIdle);

    return () => {
      cancelled = true;
      cleanup();
    };
  }, [id]);
};

/** Clicks on phone, Telegram and e-mail links become analytics events. */
const useContactClicks = () => {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement | null)?.closest?.("a");
      const href = link?.getAttribute("href") || "";
      if (href.startsWith("tel:")) track("click_phone", { link_url: href });
      else if (href.startsWith("mailto:"))
        track("click_email", { link_url: href });
      else if (/t\.me\/|telegram\.me\//.test(href))
        track("click_telegram", { link_url: href });
    };
    document.addEventListener("click", onClick, { capture: true });
    return () =>
      document.removeEventListener("click", onClick, { capture: true });
  }, []);
};

const Analytics = () => {
  const [consent, setConsent] = useState<Consent | null>(null);
  useContactClicks();
  useGtm(ENABLED ? GTM_ID : "");

  useEffect(() => {
    setConsent(readConsent());
    const onChange = (e: Event) =>
      setConsent((e as CustomEvent<Consent>).detail);
    window.addEventListener(CONSENT_CHANGED_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_CHANGED_EVENT, onChange);
  }, []);

  if (!ENABLED) return null;

  return (
    <>
      <Script id="consent-default" strategy="afterInteractive">
        {consentDefaults}
      </Script>

      {/* the GTM container itself is added by useGtm */}
      {!GTM_ID && GA_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga4" strategy="afterInteractive">
            {`gtag('js', new Date()); gtag('config', '${GA_ID}');`}
          </Script>
        </>
      )}

      {/* Clarity sets its own cookies, so it waits for consent.
          With GTM it is loaded by the container, not here (no double count). */}
      {!GTM_ID && CLARITY_ID && consent?.analytics && (
        <Script id="clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window, document, "clarity", "script", "${CLARITY_ID}");`}
        </Script>
      )}

      {/* Meta Pixel sets advertising cookies, so it also waits for consent */}
      {META_PIXEL_ID && consent?.analytics && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${META_PIXEL_ID}');fbq('track','PageView');`}
        </Script>
      )}
    </>
  );
};

export default Analytics;
