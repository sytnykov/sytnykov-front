// Run: npm test (node --test; Node 22.18+ strips the TypeScript types itself)
import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { classifyDevice, classifyTraffic } from "./trafficSource.ts";

const base = { referrerHost: "", selfHost: "sitnikov.com.ua", hasGclid: false };
const t = signals => classifyTraffic({ ...base, ...signals });

describe("classifyTraffic", () => {
  it("reads no referrer as direct", () => {
    assert.deepEqual(t({}), {
      source: "(direct)",
      medium: "(none)",
      channel: "direct",
    });
  });

  it("treats our own host as direct, not a referral", () => {
    assert.equal(t({ referrerHost: "sitnikov.com.ua" }).channel, "direct");
    assert.equal(t({ referrerHost: "www.sitnikov.com.ua" }).channel, "direct");
  });

  for (const [host, source] of [
    ["www.google.com", "google"],
    ["www.google.com.ua", "google"],
    ["google.ru", "google"],
    ["www.bing.com", "bing"],
    ["duckduckgo.com", "duckduckgo"],
  ]) {
    it(`${host} is organic search`, () => {
      assert.deepEqual(t({ referrerHost: host }), {
        source,
        medium: "organic",
        channel: "organic_search",
      });
    });
  }

  for (const [host, source] of [
    ["t.me", "telegram"],
    ["web.telegram.org", "telegram"],
    ["l.instagram.com", "instagram"],
    ["lm.facebook.com", "facebook"],
    ["www.youtube.com", "youtube"],
    ["www.linkedin.com", "linkedin"],
  ]) {
    it(`${host} is social`, () => {
      assert.deepEqual(t({ referrerHost: host }), {
        source,
        medium: "social",
        channel: "social",
      });
    });
  }

  it("gemini.google.com is AI, not Google search", () => {
    assert.equal(t({ referrerHost: "gemini.google.com" }).channel, "ai");
    assert.equal(t({ referrerHost: "chatgpt.com" }).source, "chatgpt");
  });

  it("does not mistake a lookalike host for Google", () => {
    assert.equal(t({ referrerHost: "notgoogle.com" }).channel, "referral");
  });

  it("any other host is a referral named by its host", () => {
    assert.deepEqual(t({ referrerHost: "www.zakon.rada.gov.ua" }), {
      source: "zakon.rada.gov.ua",
      medium: "referral",
      channel: "referral",
    });
  });

  it("reads gclid without UTMs as Google Ads", () => {
    assert.deepEqual(t({ referrerHost: "www.google.com", hasGclid: true }), {
      source: "google",
      medium: "cpc",
      channel: "paid_search",
    });
  });

  it("reads google / cpc UTMs as paid search, with the campaign", () => {
    assert.deepEqual(
      t({ utmSource: "google", utmMedium: "cpc", utmCampaign: "kasatsiya" }),
      {
        source: "google",
        medium: "cpc",
        channel: "paid_search",
        campaign: "kasatsiya",
      }
    );
  });

  it("reads Meta ad UTMs as paid social", () => {
    assert.equal(
      t({ utmSource: "facebook", utmMedium: "paid" }).channel,
      "paid_social"
    );
    assert.equal(t({ utmSource: "ig", utmMedium: "cpc" }).channel, "paid_social");
  });

  it("reads fbclid without UTMs as Facebook / Instagram social", () => {
    assert.deepEqual(t({ hasFbclid: true }), {
      source: "facebook",
      medium: "social",
      channel: "social",
    });
    assert.equal(
      t({ hasFbclid: true, referrerHost: "l.instagram.com" }).source,
      "instagram"
    );
  });

  it("lets UTMs win over the referrer and click ids", () => {
    assert.deepEqual(
      t({
        referrerHost: "www.google.com",
        hasGclid: true,
        utmSource: "Newsletter",
        utmMedium: "email",
      }),
      { source: "newsletter", medium: "email", channel: "email" }
    );
    assert.equal(t({ utmSource: "telegram", utmMedium: "post" }).channel, "social");
  });
});

describe("classifyDevice", () => {
  const iphone =
    "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148";
  const androidTablet =
    "Mozilla/5.0 (Linux; Android 13; SM-X700) AppleWebKit/537.36 Chrome/126 Safari/537.36";
  const mac =
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 Safari/605.1.15";
  const windows =
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/126 Safari/537.36";

  it("detects phones, tablets and an iPad in desktop mode", () => {
    assert.equal(classifyDevice(390, iphone), "mobile");
    assert.equal(classifyDevice(1024, androidTablet), "tablet");
    assert.equal(classifyDevice(1024, mac, 5), "tablet");
    assert.equal(classifyDevice(1440, mac, 0), "desktop");
  });

  it("keeps a narrow desktop window a desktop", () => {
    assert.equal(classifyDevice(600, windows), "desktop");
  });
});
