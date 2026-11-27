/**
 * Where a lead came from and what the visitor did on the site before writing.
 *
 * Shared by both sides and free of imports, so it runs in the browser, in the
 * API route and in `node --test`. The browser builds a `LeadContext`
 * (`@/lib/analytics/attribution`) and sends it only with a form submit. The
 * server never trusts that object: `parseLeadContext` rebuilds it field by
 * field, drops anything of the wrong shape and caps every string, so a
 * hand-made request can neither break the lead nor flood Telegram.
 */

export const TRAFFIC_CHANNELS = [
  "direct",
  "organic_search",
  "paid_search",
  "paid_social",
  "ai",
  "social",
  "email",
  "referral",
  "campaign",
] as const;

export type TrafficChannel = (typeof TRAFFIC_CHANNELS)[number];

export const DEVICE_CLASSES = ["mobile", "tablet", "desktop"] as const;

export type DeviceClass = (typeof DEVICE_CLASSES)[number];

/** One arrival: the first visit, or the current session. */
export type TouchPoint = {
  source: string;
  medium: string;
  channel: TrafficChannel;
  campaign?: string;
  utmContent?: string;
  utmTerm?: string;
  /** Presence only: the click ids themselves are never kept. */
  hasGclid: boolean;
  hasFbclid: boolean;
  referrerHost?: string;
  /** Path only, no query string. */
  landingPage: string;
  /** ISO timestamp. */
  at: string;
};

export type LeadContext = {
  /** The first visit within 30 days (null when storage is not allowed). */
  firstTouch: TouchPoint | null;
  session: TouchPoint;
  /** Paths seen this session, most recent last, capped at MAX_PAGES. */
  pagesViewed: string[];
  /** Every page view this session, including ones dropped from the list. */
  pagesViewedCount: number;
  timeOnSiteSec: number;
  device: DeviceClass;
  /** Site locale from the URL (uk / ru). */
  locale: string;
};

export const MAX_PAGES = 20;
const MAX_SHORT = 120;
const MAX_PATH = 300;

type Rec = Record<string, unknown>;

const isRecord = (v: unknown): v is Rec =>
  typeof v === "object" && v !== null && !Array.isArray(v);

/** Trims, turns control characters into spaces and caps; undefined if empty. */
export function cleanText(v: unknown, max: number): string | undefined {
  if (typeof v !== "string") return undefined;
  const s = v.replace(/[\u0000-\u001f\u007f]+/g, " ").trim();
  if (!s) return undefined;
  return s.length > max ? s.slice(0, max) : s;
}

/** A same-site path. Absolute URLs and protocol-relative paths are refused. */
export function cleanPath(v: unknown): string | undefined {
  const s = cleanText(v, MAX_PATH);
  if (!s || !s.startsWith("/") || s.startsWith("//")) return undefined;
  return s;
}

function cleanIso(v: unknown): string | undefined {
  if (typeof v !== "string" || v.length > 40) return undefined;
  const t = Date.parse(v);
  return Number.isFinite(t) ? new Date(t).toISOString() : undefined;
}

function cleanInt(v: unknown, max: number): number | undefined {
  if (typeof v !== "number" || !Number.isFinite(v) || v < 0) return undefined;
  return Math.min(Math.round(v), max);
}

function oneOf<T extends string>(
  values: readonly T[],
  v: unknown
): T | undefined {
  return typeof v === "string" && (values as readonly string[]).includes(v)
    ? (v as T)
    : undefined;
}

export function parseTouchPoint(v: unknown): TouchPoint | null {
  if (!isRecord(v)) return null;
  const source = cleanText(v.source, MAX_SHORT);
  const medium = cleanText(v.medium, MAX_SHORT);
  const channel = oneOf(TRAFFIC_CHANNELS, v.channel);
  const landingPage = cleanPath(v.landingPage);
  const at = cleanIso(v.at);
  if (!source || !medium || !channel || !landingPage || !at) return null;

  const out: TouchPoint = {
    source,
    medium,
    channel,
    hasGclid: v.hasGclid === true,
    hasFbclid: v.hasFbclid === true,
    landingPage,
    at,
  };
  const optional = {
    campaign: cleanText(v.campaign, MAX_SHORT),
    utmContent: cleanText(v.utmContent, MAX_SHORT),
    utmTerm: cleanText(v.utmTerm, MAX_SHORT),
    referrerHost: cleanText(v.referrerHost, MAX_SHORT),
  };
  for (const [k, val] of Object.entries(optional) as [
    keyof typeof optional,
    string | undefined,
  ][]) {
    if (val !== undefined) out[k] = val;
  }
  return out;
}

/**
 * Rebuilds a context received from the browser. Undefined when the session
 * touch point is missing; every other field degrades instead of failing.
 */
export function parseLeadContext(input: unknown): LeadContext | undefined {
  if (!isRecord(input)) return undefined;
  const session = parseTouchPoint(input.session);
  if (!session) return undefined;

  const pagesViewed: string[] = [];
  if (Array.isArray(input.pagesViewed)) {
    for (const p of input.pagesViewed.slice(-MAX_PAGES)) {
      const path = cleanPath(p);
      if (path) pagesViewed.push(path);
    }
  }

  return {
    firstTouch: parseTouchPoint(input.firstTouch),
    session,
    pagesViewed,
    pagesViewedCount: Math.max(
      cleanInt(input.pagesViewedCount, 100_000) ?? 0,
      pagesViewed.length
    ),
    // A week is far past any real session; the cap keeps junk readable.
    timeOnSiteSec: cleanInt(input.timeOnSiteSec, 7 * 24 * 3600) ?? 0,
    device: oneOf(DEVICE_CLASSES, input.device) ?? "desktop",
    locale: oneOf(["uk", "ru"] as const, input.locale) ?? "",
  };
}

// ---------------------------------------------------------------------------
// Telegram text (Ukrainian)
// ---------------------------------------------------------------------------

const META_SOURCES = /^(facebook|instagram|fb|ig|meta|threads)$/i;
const SOURCE_NAMES: Record<string, string> = {
  google: "Google",
  bing: "Bing",
  duckduckgo: "DuckDuckGo",
  yahoo: "Yahoo",
  ecosia: "Ecosia",
  facebook: "Facebook",
  instagram: "Instagram",
  threads: "Threads",
  telegram: "Telegram",
  tiktok: "TikTok",
  linkedin: "LinkedIn",
  youtube: "YouTube",
  viber: "Viber",
  chatgpt: "ChatGPT",
  perplexity: "Perplexity",
  copilot: "Copilot",
  gemini: "Gemini",
  claude: "Claude",
};

const nameOf = (source: string) => SOURCE_NAMES[source] ?? source;

/** Short Ukrainian name of a channel, e.g. "Google Ads", "Пошук Google". */
export function channelLabel(t: TouchPoint): string {
  const name = nameOf(t.source);
  switch (t.channel) {
    case "paid_search":
      return t.source === "google" ? "Google Ads" : `Платний пошук ${name}`;
    case "paid_social":
      return META_SOURCES.test(t.source) ? "Meta Ads" : `Реклама ${name}`;
    case "organic_search":
      return `Пошук ${name}`;
    case "social":
      return t.hasFbclid && !t.referrerHost
        ? "Facebook / Instagram"
        : `Соцмережа ${name}`;
    case "ai":
      return `AI-асистент ${name}`;
    case "email":
      return "E-mail розсилка";
    case "referral":
      return `Перехід з ${t.source}`;
    case "campaign":
      return `Кампанія (${t.source})`;
    default:
      return "Прямий захід";
  }
}

const kyivDate = (iso: string, withTime: boolean) =>
  new Date(iso).toLocaleString("uk-UA", {
    timeZone: "Europe/Kyiv",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    ...(withTime && { hour: "2-digit", minute: "2-digit" }),
  });

export function formatDuration(sec: number): string {
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;
  if (h) return `${h} год ${m} хв`;
  if (m) return `${m} хв ${s} с`;
  return `${s} с`;
}

/** "/uk/education/x" → "/education/x"; long slugs cut. */
const shortPath = (path: string) => {
  const p = path.replace(/^\/(uk|ru)(?=\/|$)/, "") || "/";
  // long enough for course slugs: the manager needs to see which course
  return p.length > 80 ? `${p.slice(0, 79)}…` : p;
};

const DEVICE_NAMES: Record<DeviceClass, string> = {
  mobile: "телефон",
  tablet: "планшет",
  desktop: "комп'ютер",
};

const MAX_LISTED_PAGES = 6;

/** "google / cpc, кампанія brand, оголошення a1, ключ «x»" */
function sourceLine(t: TouchPoint): string {
  const parts = [`${t.source} / ${t.medium}`];
  if (t.campaign) parts.push(`кампанія ${t.campaign}`);
  if (t.utmContent) parts.push(`оголошення ${t.utmContent}`);
  if (t.utmTerm) parts.push(`ключ «${t.utmTerm}»`);
  return parts.join(", ");
}

/**
 * Lines appended to the Telegram lead, compact, empty parts omitted:
 * — Канал: Google Ads | Джерело: google / cpc, кампанія brand
 * — Перший візит: 12.11.2026, вхід на /education, з google.com
 * — На сайті: 6 хв 12 с, сторінок: 4 (/, /education, /contacts)
 * — Пристрій: телефон, мова сторінки uk
 */
export function formatLeadContext(ctx: LeadContext): string[] {
  const { session: s, firstTouch: f } = ctx;
  const lines = [`— Канал: ${channelLabel(s)} | Джерело: ${sourceLine(s)}`];

  if (f && f.at !== s.at) {
    const first = [
      `— Перший візит: ${kyivDate(f.at, false)}`,
      `вхід на ${shortPath(f.landingPage)}`,
    ];
    if (f.referrerHost) first.push(`з ${f.referrerHost}`);
    if (f.channel !== s.channel || f.source !== s.source)
      first.push(`канал ${channelLabel(f)}`);
    lines.push(first.join(", "));
  } else {
    // Without cookie consent there is no stored first visit: do not claim one.
    const visit = [
      f
        ? `— Перший візит: цей, вхід на ${shortPath(s.landingPage)}`
        : `— Вхід на ${shortPath(s.landingPage)}`,
    ];
    if (s.referrerHost) visit.push(`з ${s.referrerHost}`);
    lines.push(visit.join(", "));
  }

  const listed = ctx.pagesViewed.slice(-MAX_LISTED_PAGES).map(shortPath);
  const more = ctx.pagesViewedCount > listed.length ? "…, " : "";
  const pages = ctx.pagesViewedCount
    ? `, сторінок: ${ctx.pagesViewedCount} (${more}${listed.join(", ")})`
    : "";
  lines.push(`— На сайті: ${formatDuration(ctx.timeOnSiteSec)}${pages}`);

  const device = [`— Пристрій: ${DEVICE_NAMES[ctx.device]}`];
  if (ctx.locale) device.push(`мова сторінки ${ctx.locale}`);
  lines.push(device.join(", "));
  return lines;
}

/** Coarse event parameters for the dataLayer (no journey, no ids). */
export function leadEventParams(t: TouchPoint | null) {
  return t
    ? {
        lead_channel: t.channel,
        lead_source: t.source,
        lead_medium: t.medium,
        ...(t.campaign && { lead_campaign: t.campaign }),
      }
    : {};
}
