// Run: npm test
import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import { describe, it } from "node:test";

import {
  checkThanks,
  isVerifiedApproval,
  resultSignature,
  signThanks,
} from "./wayforpay.ts";

const SECRET = "test-secret";
const result = (over = {}) => {
  const fields = {
    merchantAccount: "sitnikov_com_ua",
    orderReference: "ORD-1",
    amount: "4500",
    currency: "UAH",
    authCode: "541963",
    cardPan: "41****8217",
    transactionStatus: "Approved",
    reasonCode: "1100",
    ...over,
  };
  const p = new URLSearchParams(fields);
  if (!("merchantSignature" in over))
    p.set("merchantSignature", resultSignature(p, SECRET));
  return p;
};

describe("WayForPay result signature", () => {
  it("is HMAC-MD5 over the documented fields joined by ;", () => {
    const expected = createHmac("md5", SECRET)
      .update("sitnikov_com_ua;ORD-1;4500;UAH;541963;41****8217;Approved;1100")
      .digest("hex");
    assert.equal(resultSignature(result(), SECRET), expected);
  });

  it("accepts a signed approved result", () => {
    assert.equal(isVerifiedApproval(result(), SECRET), true);
  });

  it("refuses without the secret, without or with a wrong signature", () => {
    assert.equal(isVerifiedApproval(result(), undefined), false);
    assert.equal(isVerifiedApproval(result(), "other-secret"), false);
    assert.equal(
      isVerifiedApproval(result({ merchantSignature: "" }), SECRET),
      false
    );
    assert.equal(
      isVerifiedApproval(result({ merchantSignature: "zz" }), SECRET),
      false
    );
  });

  it("refuses a signed result that is not approved", () => {
    assert.equal(
      isVerifiedApproval(result({ transactionStatus: "Declined" }), SECRET),
      false
    );
  });

  it("refuses a result edited after signing", () => {
    const p = result();
    p.set("amount", "1");
    assert.equal(isVerifiedApproval(p, SECRET), false);
  });
});

describe("thank-you page proof", () => {
  const proof = { slug: "mistetstvo-kasatsiy", order: "ORD-1", amount: "4500", currency: "UAH" };

  it("accepts our own proof only for the same order, amount and course", () => {
    const v = signThanks(proof, SECRET);
    assert.equal(checkThanks(proof, v, SECRET), true);
    assert.equal(checkThanks({ ...proof, amount: "9000" }, v, SECRET), false);
    assert.equal(checkThanks({ ...proof, slug: "other" }, v, SECRET), false);
  });

  it("never passes without the secret, an order or a proof", () => {
    const v = signThanks(proof, SECRET);
    assert.equal(checkThanks(proof, v, undefined), false);
    assert.equal(checkThanks(proof, undefined, SECRET), false);
    assert.equal(checkThanks({ ...proof, order: "" }, signThanks({ ...proof, order: "" }, SECRET), SECRET), false);
  });
});
