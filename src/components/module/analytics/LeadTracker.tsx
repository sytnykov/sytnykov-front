"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

import { recordPageView } from "@/lib/analytics/attribution";

/**
 * Records the pages of a visit for lead attribution. Mounted once in the
 * locale layout; renders nothing and sends nothing on its own.
 */
const LeadTracker = () => {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname) recordPageView(pathname);
  }, [pathname]);

  return null;
};

export default LeadTracker;
