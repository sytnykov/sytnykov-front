import type { MetadataRoute } from "next";

import { IS_PREVIEW } from "@/utils/env";
import { SITE_URL } from "@/utils/getBaseUrl";

/** Search and AI crawlers welcome; preview copies are closed completely. */
export default function robots(): MetadataRoute.Robots {
  if (IS_PREVIEW) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }

  // /_next/ stays open: Google needs JS, CSS and /_next/image to render pages
  const disallow = ["/api/", "/*?*page="];

  return {
    rules: [
      { userAgent: "*", allow: "/", disallow },
      // AI assistants and answer engines
      {
        userAgent: [
          "GPTBot",
          "OAI-SearchBot",
          "ChatGPT-User",
          "PerplexityBot",
          "Google-Extended",
          "ClaudeBot",
          "Claude-SearchBot",
        ],
        allow: "/",
        disallow,
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
