import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { readdirSync, statSync } from "node:fs";
import path from "node:path";
import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} from "next/constants";

import imageWidths from "./src/lib/images/sizes.json";

/** Changes when a picture in public/images is added, removed or replaced. */
const imagesVersion = () => {
  const hash = createHash("sha1");
  const walk = (dir: string) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else hash.update(`${entry.name}:${statSync(full).size};`);
    }
  };
  try {
    walk(path.join(process.cwd(), "public/images"));
  } catch {
    return "";
  }
  return hash.digest("hex").slice(0, 10);
};

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async redirects() {
    return [
      // one mirror only: www → sitnikov.com.ua (permanent, keeps the path)
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.sitnikov.com.ua" }],
        destination: "https://sitnikov.com.ua/:path*",
        permanent: true,
      },
      // the root always opens the Ukrainian version
      { source: "/", destination: "/uk", permanent: true },
      // the client's legal pages lived at /privacy and /terms before the legal hub
      {
        source: "/:locale(uk|ru)/privacy",
        destination: "/:locale/legal/privacy-policy",
        permanent: true,
      },
      {
        source: "/:locale(uk|ru)/terms",
        destination: "/:locale/legal/terms-of-use",
        permanent: true,
      },
    ];
  },
  experimental: {
    // import only the parts of these libraries that pages use
    optimizePackageImports: ["framer-motion", "motion", "date-fns", "swiper"],
  },
  env: {
    NEXT_PUBLIC_IMAGES_VERSION: imagesVersion(),
  },
  // Page <title>, description and hreflang always arrive inside <head>
  // (by default Next streams them into <body> for ordinary browsers, where
  // SEO checkers and some crawlers do not look).
  htmlLimitedBots: /.*/,
  images: {
    // No Vercel optimiser (/_next/image): CMS pictures are resized by the
    // Sanity CDN, pictures from public/images are static copies made by
    // scripts/optimize-images.mjs. See src/lib/images/loader.ts.
    loader: "custom",
    loaderFile: "./src/lib/images/loader.ts",
    imageSizes: imageWidths.imageSizes,
    deviceSizes: imageWidths.deviceSizes,
  },
  async rewrites() {
    return {
      // a browser that accepts AVIF gets the lighter .avif copy of the picture
      beforeFiles: [
        {
          source: "/_opt/:path(.*).webp",
          has: [{ type: "header", key: "accept", value: ".*image/avif.*" }],
          destination: "/_opt/:path.avif",
        },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
  async headers() {
    return [
      {
        // the address carries ?v=<version of public/images>
        source: "/_opt/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
          { key: "Vary", value: "Accept" },
        ],
      },
    ];
  },
};

const withNextIntl = createNextIntlPlugin();

export default function config(phase: string) {
  // The resized copies must exist before the build collects public/, whatever
  // build command is used; workers of the same build skip the repeat.
  if (
    (phase === PHASE_PRODUCTION_BUILD || phase === PHASE_DEVELOPMENT_SERVER) &&
    !process.env.IMAGES_OPTIMISED
  ) {
    execFileSync(
      process.execPath,
      [path.join(process.cwd(), "scripts/optimize-images.mjs")],
      { stdio: "inherit" }
    );
    process.env.IMAGES_OPTIMISED = "1";
  }
  return withNextIntl(nextConfig);
}
