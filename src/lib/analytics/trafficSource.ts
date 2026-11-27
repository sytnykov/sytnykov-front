/**
 * Where a visit came from, from what the browser sees on arrival: referrer
 * host, UTM parameters and whether a Google (gclid) or Meta (fbclid) click id
 * was present.
 *
 * Pure, so the rules are unit-tested (trafficSource.test.mjs) rather than
 * discovered in Telegram. Precedence: UTMs > gclid > fbclid > referrer >
 * direct. A referrer from our own host is navigation inside the site and
 * counts as direct.
 */

import type { DeviceClass, TrafficChannel } from "../leads/context";

export type ArrivalSignals = {
  /** `document.referrer` host, or empty. */
  referrerHost: string;
  /** Our own host, so internal navigation is not a referral. */
  selfHost: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  hasGclid: boolean;
  hasFbclid?: boolean;
};

export type TrafficSource = {
  source: string;
  medium: string;
  channel: TrafficChannel;
  campaign?: string;
};

type HostRule = { name: string; pattern: RegExp };

/** `host` is `domain` or a subdomain of it. */
function hostRule(name: string, ...domains: string[]): HostRule {
  const alt = domains.map(d => d.replace(/\./g, "\\.")).join("|");
  return { name, pattern: new RegExp(`(^|\\.)(${alt})$`, "i") };
}

// AI first: gemini.google.com must not read as Google search.
const AI_RULES: HostRule[] = [
  hostRule("chatgpt", "chatgpt.com", "chat.openai.com"),
  hostRule("perplexity", "perplexity.ai"),
  hostRule("copilot", "copilot.microsoft.com"),
  hostRule("gemini", "gemini.google.com"),
  hostRule("claude", "claude.ai"),
];

const SEARCH_RULES: HostRule[] = [
  { name: "google", pattern: /(^|\.)google\.[a-z]{2,3}(\.[a-z]{2})?$/i },
  hostRule("bing", "bing.com"),
  hostRule("duckduckgo", "duckduckgo.com"),
  { name: "yahoo", pattern: /(^|\.)yahoo\.[a-z]{2,3}(\.[a-z]{2})?$/i },
  hostRule("ecosia", "ecosia.org"),
];

const SOCIAL_RULES: HostRule[] = [
  hostRule("threads", "threads.net", "threads.com"),
  hostRule("instagram", "instagram.com"),
  hostRule("facebook", "facebook.com", "fb.com", "fb.me"),
  hostRule("telegram", "t.me", "telegram.org", "telegram.me"),
  hostRule("youtube", "youtube.com", "youtu.be"),
  hostRule("tiktok", "tiktok.com"),
  hostRule("linkedin", "linkedin.com", "lnkd.in"),
  hostRule("viber", "viber.com"),
];

/** utm_source values that mean Meta (Facebook / Instagram ads). */
const META_SOURCES = /^(facebook|instagram|fb|ig|meta|threads|an)$/i;

function match(rules: HostRule[], host: string): string | undefined {
  return rules.find(r => r.pattern.test(host))?.name;
}

export function normalizeHost(host: string): string {
  return host
    .trim()
    .toLowerCase()
    .replace(/^www\./, "")
    .replace(/\.$/, "");
}

/** `utm_source` written as a bare name ("google") or a host ("chatgpt.com"). */
function knownName(rules: HostRule[], value: string): string | undefined {
  const v = normalizeHost(value);
  return rules.find(r => r.name === v)?.name ?? match(rules, v);
}

const PAID_MEDIUMS =
  /^(cpc|ppc|paid|paidsearch|paid_search|paid-search|cpm|display|banner|paid_social|paidsocial|paid-social)$/i;

export function classifyTraffic(signals: ArrivalSignals): TrafficSource {
  const utmSource = signals.utmSource?.trim();
  const utmMedium = signals.utmMedium?.trim();
  const campaign = signals.utmCampaign?.trim() || undefined;
  const withCampaign = (t: Omit<TrafficSource, "campaign">): TrafficSource =>
    campaign ? { ...t, campaign } : t;

  if (utmSource) {
    const source = utmSource.toLowerCase();
    const medium = (utmMedium || "(not set)").toLowerCase();
    let channel: TrafficChannel = "campaign";
    if (PAID_MEDIUMS.test(medium)) {
      if (knownName(SEARCH_RULES, source)) channel = "paid_search";
      else if (META_SOURCES.test(source) || knownName(SOCIAL_RULES, source))
        channel = "paid_social";
    } else if (knownName(AI_RULES, source)) {
      channel = "ai";
    } else if (medium === "email" || medium === "newsletter") {
      channel = "email";
    } else if (medium === "social" || knownName(SOCIAL_RULES, source)) {
      channel = "social";
    } else if (medium === "organic" && knownName(SEARCH_RULES, source)) {
      channel = "organic_search";
    } else if (medium === "referral") {
      channel = "referral";
    }
    return withCampaign({ source, medium, channel });
  }

  if (signals.hasGclid) {
    return withCampaign({
      source: "google",
      medium: "cpc",
      channel: "paid_search",
    });
  }

  const host = normalizeHost(signals.referrerHost);
  const self = normalizeHost(signals.selfHost);
  const external = host && host !== self ? host : "";

  // Meta adds fbclid to every outbound link, ads and ordinary posts alike, and
  // its in-app browsers often send no referrer: without UTMs it is "social".
  if (signals.hasFbclid) {
    const social = external ? match(SOCIAL_RULES, external) : undefined;
    return withCampaign({
      source: social === "instagram" ? "instagram" : "facebook",
      medium: "social",
      channel: "social",
    });
  }

  if (!external) {
    return withCampaign({
      source: "(direct)",
      medium: "(none)",
      channel: "direct",
    });
  }

  const ai = match(AI_RULES, external);
  if (ai)
    return withCampaign({ source: ai, medium: "referral", channel: "ai" });
  const search = match(SEARCH_RULES, external);
  if (search)
    return withCampaign({
      source: search,
      medium: "organic",
      channel: "organic_search",
    });
  const social = match(SOCIAL_RULES, external);
  if (social)
    return withCampaign({
      source: social,
      medium: "social",
      channel: "social",
    });
  return withCampaign({
    source: external,
    medium: "referral",
    channel: "referral",
  });
}

/**
 * Device class from viewport width and user agent. The UA decides for phones
 * and tablets that say so; the width covers the rest, and a narrow window on a
 * UA that is clearly a desktop stays a desktop.
 */
export function classifyDevice(
  viewportWidth: number,
  userAgent: string,
  maxTouchPoints = 0
): DeviceClass {
  const ua = userAgent || "";
  if (/iPad|Tablet|PlayBook|Silk|Android(?!.*Mobile)/i.test(ua))
    return "tablet";
  if (/Mobi|iPhone|iPod|Android.*Mobile|Windows Phone|Opera Mini/i.test(ua))
    return "mobile";
  // iPadOS asks for desktop sites with a Mac UA; only the touch screen gives it away.
  if (/Macintosh/i.test(ua) && maxTouchPoints > 1) return "tablet";
  if (!Number.isFinite(viewportWidth) || viewportWidth <= 0) return "desktop";
  if (viewportWidth < 768 && !/Windows NT|Macintosh|X11|CrOS/i.test(ua))
    return "mobile";
  return "desktop";
}
