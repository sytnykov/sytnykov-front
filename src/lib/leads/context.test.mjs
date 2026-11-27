// Run: npm test
import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  channelLabel,
  formatDuration,
  formatLeadContext,
  parseLeadContext,
} from "./context.ts";

const touch = (over = {}) => ({
  source: "google",
  medium: "cpc",
  channel: "paid_search",
  campaign: "kasatsiya",
  hasGclid: true,
  hasFbclid: false,
  landingPage: "/uk/education/special-courses/mistetstvo-kasatsiy",
  at: "2026-11-27T10:00:00.000Z",
  ...over,
});

describe("parseLeadContext", () => {
  it("drops a context without a valid session", () => {
    assert.equal(parseLeadContext(null), undefined);
    assert.equal(parseLeadContext({ session: { source: "x" } }), undefined);
    assert.equal(
      parseLeadContext({ session: touch({ channel: "hacker" }) }),
      undefined
    );
  });

  it("cleans hostile input instead of passing it to Telegram", () => {
    const ctx = parseLeadContext({
      session: touch({ campaign: "a\n\n🆕 Заявка: fake".padEnd(500, "x") }),
      firstTouch: "nope",
      pagesViewed: [
        "/uk",
        "https://evil.example/x",
        "//evil",
        42,
        "/uk/contacts",
      ],
      pagesViewedCount: -5,
      timeOnSiteSec: 1e12,
      device: "fridge",
      locale: "en",
    });
    assert.ok(ctx);
    assert.ok(!ctx.session.campaign.includes("\n"));
    assert.ok(ctx.session.campaign.length <= 120);
    assert.equal(ctx.firstTouch, null);
    assert.deepEqual(ctx.pagesViewed, ["/uk", "/uk/contacts"]);
    assert.equal(ctx.pagesViewedCount, 2);
    assert.equal(ctx.timeOnSiteSec, 7 * 24 * 3600);
    assert.equal(ctx.device, "desktop");
    assert.equal(ctx.locale, "");
  });
});

describe("Telegram text", () => {
  it("names the channels in Ukrainian", () => {
    assert.equal(channelLabel(touch()), "Google Ads");
    assert.equal(
      channelLabel(touch({ channel: "organic_search", medium: "organic" })),
      "Пошук Google"
    );
    assert.equal(
      channelLabel(touch({ source: "facebook", channel: "paid_social" })),
      "Meta Ads"
    );
    assert.equal(
      channelLabel(touch({ source: "telegram", channel: "social" })),
      "Соцмережа Telegram"
    );
    assert.equal(
      channelLabel(touch({ source: "(direct)", channel: "direct" })),
      "Прямий захід"
    );
    assert.equal(
      channelLabel(touch({ source: "zakon.rada.gov.ua", channel: "referral" })),
      "Перехід з zakon.rada.gov.ua"
    );
  });

  it("formats durations", () => {
    assert.equal(formatDuration(45), "45 с");
    assert.equal(formatDuration(372), "6 хв 12 с");
    assert.equal(formatDuration(3900), "1 год 5 хв");
  });

  it("builds the compact block for a returning visitor", () => {
    const lines = formatLeadContext({
      firstTouch: touch({
        medium: "organic",
        channel: "organic_search",
        campaign: undefined,
        hasGclid: false,
        referrerHost: "google.com",
        landingPage: "/uk",
        at: "2026-11-12T08:00:00.000Z",
      }),
      session: touch(),
      pagesViewed: [
        "/uk",
        "/uk/education",
        "/uk/education/special-courses/mistetstvo-kasatsiy",
        "/uk/contacts",
      ],
      pagesViewedCount: 4,
      timeOnSiteSec: 372,
      device: "mobile",
      locale: "uk",
    });
    assert.deepEqual(lines, [
      "— Канал: Google Ads | Джерело: google / cpc, кампанія kasatsiya",
      "— Перший візит: 12.11.2026, вхід на /, з google.com, канал Пошук Google",
      "— На сайті: 6 хв 12 с, сторінок: 4 (/, /education, /education/special-courses/mistetstvo-kasatsiy, /contacts)",
      "— Пристрій: телефон, мова сторінки uk",
    ]);
  });

  it("says when this visit is the first one and shortens long journeys", () => {
    const session = touch({
      source: "(direct)",
      medium: "(none)",
      channel: "direct",
      campaign: undefined,
      hasGclid: false,
      landingPage: "/ru",
    });
    const lines = formatLeadContext({
      firstTouch: session,
      session,
      pagesViewed: Array.from({ length: 9 }, (_, i) => `/ru/p${i}`),
      pagesViewedCount: 9,
      timeOnSiteSec: 30,
      device: "desktop",
      locale: "ru",
    });
    assert.deepEqual(lines, [
      "— Канал: Прямий захід | Джерело: (direct) / (none)",
      "— Перший візит: цей, вхід на /",
      "— На сайті: 30 с, сторінок: 9 (…, /p3, /p4, /p5, /p6, /p7, /p8)",
      "— Пристрій: комп'ютер, мова сторінки ru",
    ]);
  });

  it("does not claim a first visit when none is stored (no cookie consent)", () => {
    const lines = formatLeadContext({
      firstTouch: null,
      session: touch({ referrerHost: "google.com" }),
      pagesViewed: [],
      pagesViewedCount: 0,
      timeOnSiteSec: 5,
      device: "tablet",
      locale: "",
    });
    assert.deepEqual(lines.slice(1), [
      "— Вхід на /education/special-courses/mistetstvo-kasatsiy, з google.com",
      "— На сайті: 5 с",
      "— Пристрій: планшет",
    ]);
  });
});
