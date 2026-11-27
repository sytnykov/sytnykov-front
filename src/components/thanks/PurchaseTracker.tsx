"use client";

import { useEffect } from "react";

import { track } from "@/lib/analytics/track";

/** Sends the «purchase» event once per order, even if the page is refreshed. */
const PurchaseTracker = ({
  course,
  order,
  value,
  currency,
}: {
  course: string;
  order?: string;
  value?: number;
  currency?: string;
}) => {
  useEffect(() => {
    const key = `sitnikov-purchase:${order || course}`;
    try {
      if (window.sessionStorage.getItem(key)) return;
      window.sessionStorage.setItem(key, "1");
    } catch {
      /* storage blocked: still send once for this view */
    }
    track("purchase", {
      transaction_id: order,
      value,
      currency: currency || "UAH",
      course,
    });
  }, [course, order, value, currency]);

  return null;
};

export default PurchaseTracker;
