/**
 * First-party visit attribution, kept in the visitor's own browser.
 *
 * - First touch (localStorage, 30 days): how the visitor first arrived.
 * - Session (sessionStorage): how this visit arrived, when it started and the
 *   pages seen.
 *
 * Nothing here is sent anywhere on its own: `getLeadContext()` is read only
 * when the visitor submits a form and goes to our own /api/telegram with it.
 *
 * Storage is used only after the visitor accepts analytics cookies. Before
 * that the data lives in memory for this tab (client-side navigation keeps
 * it), which is enough to attach this visit's source to a lead sent now.
 * Every access is wrapped: nothing here ever throws.
 */

import { readConsent } from "@/components/module/cookies/consent";
import {
  MAX_PAGES,
  type LeadContext,
  type TouchPoint,
} from "@/lib/leads/context";

import {
  classifyDevice,
  classifyTraffic,
  normalizeHost,
} from "./trafficSource";

const FIRST_TOUCH_KEY = "sitnikov:first-touch";
const SESSION_KEY = "sitnikov:session";
const LAST_SESSION_KEY = "sitnikov:last-session";

const FIRST_TOUCH_TTL_MS = 30 * 24 * 3600 * 1000;
/** A tab opened from the site within this window continues the same visit. */
const SESSION_CONTINUE_MS = 30 * 60 * 1000;

type StoredFirstTouch = { touch: TouchPoint; expiresAt: number };

type StoredSession = {
  touch: TouchPoint;
  startedAt: number;
  pages: string[];
  pagesCount: number;
  updatedAt: number;
};

type StorageKind = "local" | "session";

/** Used when storage is not allowed or not available. */
const memory = new Map<string, string>();

function storage(kind: StorageKind): Storage | null {
  if (readConsent()?.analytics !== true) return null;
  try {
    return kind === "local" ? window.localStorage : window.sessionStorage;
  } catch {
    return null;
  }
}

function readRaw(kind: StorageKind, key: string): string | null {
  const memKey = `${kind}:${key}`;
  try {
    const s = storage(kind);
    if (s) {
      const stored = s.getItem(key);
      // Consent came after this page load started: keep what memory gathered.
      if (stored === null && memory.has(memKey)) {
        s.setItem(key, memory.get(memKey) as string);
        return memory.get(memKey) as string;
      }
      return stored;
    }
  } catch {
    // Fall through to memory.
  }
  return memory.get(memKey) ?? null;
}

function writeRaw(kind: StorageKind, key: string, value: string): void {
  memory.set(`${kind}:${key}`, value);
  try {
    storage(kind)?.setItem(key, value);
  } catch {
    // Quota or blocked storage: memory already has it.
  }
}

function readJson<T>(kind: StorageKind, key: string): T | null {
  const raw = readRaw(kind, key);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

const isBrowser = () =>
  typeof window !== "undefined" && typeof document !== "undefined";

function cap(v: string | null | undefined, max = 120): string | undefined {
  const s = v?.trim();
  return s ? s.slice(0, max) : undefined;
}

export function localeFromPath(path: string): string {
  const m = /^\/(uk|ru)(\/|$)/.exec(path);
  return m ? m[1] : "";
}

function touchFromCurrentUrl(now: number): TouchPoint {
  let params = new URLSearchParams();
  try {
    params = new URLSearchParams(window.location.search);
  } catch {
    // Keep empty params.
  }
  let referrerHost = "";
  try {
    referrerHost = document.referrer ? new URL(document.referrer).host : "";
  } catch {
    referrerHost = "";
  }

  const utmSource = cap(params.get("utm_source"));
  const utmMedium = cap(params.get("utm_medium"));
  const utmCampaign = cap(params.get("utm_campaign"));
  const hasGclid = params.has("gclid") || params.has("gbraid");
  const hasFbclid = params.has("fbclid");
  const traffic = classifyTraffic({
    referrerHost,
    selfHost: window.location.host,
    utmSource,
    utmMedium,
    utmCampaign,
    hasGclid,
    hasFbclid,
  });

  const touch: TouchPoint = {
    source: traffic.source,
    medium: traffic.medium,
    channel: traffic.channel,
    hasGclid,
    hasFbclid,
    landingPage: window.location.pathname.slice(0, 300) || "/",
    at: new Date(now).toISOString(),
  };
  const optional = {
    campaign: traffic.campaign,
    utmContent: cap(params.get("utm_content")),
    utmTerm: cap(params.get("utm_term")),
  };
  for (const [k, v] of Object.entries(optional) as [
    keyof typeof optional,
    string | undefined,
  ][]) {
    if (v !== undefined) touch[k] = v;
  }
  const host = normalizeHost(referrerHost);
  if (host && host !== normalizeHost(window.location.host))
    touch.referrerHost = host;
  return touch;
}

/** New campaign parameters in the URL start a new session, as GA4 does. */
function urlHasNewCampaign(session: StoredSession): boolean {
  try {
    const params = new URLSearchParams(window.location.search);
    const utm = cap(params.get("utm_source"));
    if (utm && utm.toLowerCase() !== session.touch.source) return true;
    const campaign = cap(params.get("utm_campaign"));
    if (campaign && campaign !== session.touch.campaign) return true;
    if (params.has("gclid") && !session.touch.hasGclid) return true;
  } catch {
    // No URL: nothing new.
  }
  return false;
}

function saveSession(session: StoredSession): void {
  const json = JSON.stringify(session);
  writeRaw("session", SESSION_KEY, json);
  writeRaw("local", LAST_SESSION_KEY, json);
}

function ensureFirstTouch(touch: TouchPoint, now: number): void {
  const stored = readJson<StoredFirstTouch>("local", FIRST_TOUCH_KEY);
  if (stored?.touch && stored.expiresAt > now) return;
  writeRaw(
    "local",
    FIRST_TOUCH_KEY,
    JSON.stringify({ touch, expiresAt: now + FIRST_TOUCH_TTL_MS })
  );
}

function startSession(now: number): StoredSession {
  const touch = touchFromCurrentUrl(now);

  // sessionStorage is per tab: a tab opened from one of our pages continues
  // the visit it came from.
  if (touch.channel === "direct") {
    let fromSelf = false;
    try {
      fromSelf =
        !!document.referrer &&
        new URL(document.referrer).host === window.location.host;
    } catch {
      fromSelf = false;
    }
    const last = readJson<StoredSession>("local", LAST_SESSION_KEY);
    if (
      fromSelf &&
      last?.touch &&
      typeof last.updatedAt === "number" &&
      now - last.updatedAt < SESSION_CONTINUE_MS
    ) {
      const continued: StoredSession = { ...last, updatedAt: now };
      saveSession(continued);
      return continued;
    }
  }

  const session: StoredSession = {
    touch,
    startedAt: now,
    pages: [],
    pagesCount: 0,
    updatedAt: now,
  };
  ensureFirstTouch(touch, now);
  saveSession(session);
  return session;
}

function currentSession(now: number): StoredSession {
  const stored = readJson<StoredSession>("session", SESSION_KEY);
  if (
    !stored?.touch ||
    !Array.isArray(stored.pages) ||
    urlHasNewCampaign(stored)
  ) {
    return startSession(now);
  }
  return stored;
}

/**
 * Records one page view. Called by LeadTracker on every pathname change; the
 * same path twice in a row counts once.
 */
export function recordPageView(path: string): void {
  if (!isBrowser()) return;
  try {
    const now = Date.now();
    const session = currentSession(now);
    if (session.pages[session.pages.length - 1] !== path) {
      session.pages = [...session.pages, path.slice(0, 300)].slice(-MAX_PAGES);
      session.pagesCount += 1;
    }
    session.updatedAt = now;
    saveSession(session);
  } catch {
    // Attribution is best effort.
  }
}

/** This visit's source for event parameters; null on the server. */
export function getSessionTouch(): TouchPoint | null {
  if (!isBrowser()) return null;
  try {
    return currentSession(Date.now()).touch;
  } catch {
    return null;
  }
}

/** Snapshot sent with a lead. Never throws; null on the server. */
export function getLeadContext(): LeadContext | null {
  if (!isBrowser()) return null;
  try {
    const now = Date.now();
    const session = currentSession(now);
    const stored = readJson<StoredFirstTouch>("local", FIRST_TOUCH_KEY);
    // Without storage the "first touch" is only this tab's visit: unknown.
    const firstTouch =
      storage("local") && stored?.touch && stored.expiresAt > now
        ? stored.touch
        : null;
    let maxTouchPoints = 0;
    try {
      maxTouchPoints = navigator.maxTouchPoints ?? 0;
    } catch {
      maxTouchPoints = 0;
    }
    return {
      firstTouch,
      session: session.touch,
      pagesViewed: session.pages,
      pagesViewedCount: Math.max(session.pagesCount, session.pages.length),
      timeOnSiteSec: Math.max(0, Math.round((now - session.startedAt) / 1000)),
      device: classifyDevice(
        window.innerWidth,
        navigator.userAgent,
        maxTouchPoints
      ),
      locale: localeFromPath(window.location.pathname),
    };
  } catch {
    return null;
  }
}
