/**
 * WayForPay payment result, checked on our server.
 *
 * The visitor comes back from WayForPay with a POST to /api/thanks/<slug>.
 * Anyone can send that POST (or open /uk/thanks/<slug>?status=approved), so
 * the «purchase» analytics event is sent only when:
 * 1. the POST carries a valid merchantSignature: HMAC-MD5 with the merchant
 *    secret key over
 *    merchantAccount;orderReference;amount;currency;authCode;cardPan;
 *    transactionStatus;reasonCode
 *    (the WayForPay payment-result signature), and the status is Approved;
 * 2. the thank-you page then sees our own proof `v`, an HMAC-SHA256 of the
 *    order, amount, currency and course slug made with the same secret, so
 *    the page address cannot be edited into a purchase.
 *
 * Without WAYFORPAY_SECRET_KEY nothing is ever verified: the page still
 * thanks the visitor, it just does not count a purchase.
 */

import { createHmac, timingSafeEqual } from "node:crypto";

const RESULT_FIELDS = [
  "merchantAccount",
  "orderReference",
  "amount",
  "currency",
  "authCode",
  "cardPan",
  "transactionStatus",
  "reasonCode",
] as const;

type Fields = { get(name: string): string | null };

const sameHex = (a: string, b: string) => {
  if (!/^[0-9a-f]+$/i.test(a) || a.length !== b.length) return false;
  return timingSafeEqual(Buffer.from(a.toLowerCase()), Buffer.from(b));
};

/** The signature WayForPay puts on a payment result. */
export function resultSignature(data: Fields, secret: string): string {
  const base = RESULT_FIELDS.map(k => data.get(k) ?? "").join(";");
  return createHmac("md5", secret).update(base, "utf8").digest("hex");
}

/** A WayForPay result with a valid signature and status Approved. */
export function isVerifiedApproval(
  data: Fields,
  secret: string | undefined
): boolean {
  if (!secret) return false;
  const given = data.get("merchantSignature") ?? "";
  if (!given || !sameHex(given, resultSignature(data, secret))) return false;
  return (data.get("transactionStatus") ?? "").toLowerCase() === "approved";
}

export type ThanksProof = {
  slug: string;
  order: string;
  amount: string;
  currency: string;
};

const proofBase = (p: ThanksProof) =>
  ["thanks", p.slug, p.order, p.amount, p.currency].join("|");

/** Our proof for the thank-you page address. */
export function signThanks(p: ThanksProof, secret: string): string {
  return createHmac("sha256", secret)
    .update(proofBase(p), "utf8")
    .digest("hex");
}

export function checkThanks(
  p: ThanksProof,
  proof: string | undefined,
  secret: string | undefined
): boolean {
  if (!secret || !proof || !p.order) return false;
  return sameHex(proof, signThanks(p, secret));
}
