"use client";

type LoaderProps = { src: string; width: number; quality?: number };

const SANITY_CDN = "https://cdn.sanity.io/";
const LOCAL_RASTER = /^\/images\/.+\.(webp|png|jpe?g)$/i;
// changes when any file in public/images changes (see next.config.ts)
const VERSION = process.env.NEXT_PUBLIC_IMAGES_VERSION || "";

/**
 * next/image without Vercel's optimiser (/_next/image), whose quota on the
 * Hobby plan is small and, once spent, breaks every picture on the site.
 *
 * - CMS pictures are resized by Sanity's own image CDN (AVIF/WebP by browser).
 * - Pictures from public/images are served as static copies that
 *   scripts/optimize-images.mjs prepares at build time, one per width from
 *   sizes.json (the same list next.config.ts gives to next/image). The link
 *   is to the .webp; browsers that accept AVIF get the .avif copy instead
 *   (rewrite in next.config.ts).
 * - Everything else (SVG icons) is served as is.
 */
export default function imageLoader({ src, width, quality }: LoaderProps) {
  if (src.startsWith(SANITY_CDN)) {
    const url = new URL(src);
    url.searchParams.set("w", String(width));
    url.searchParams.set("q", String(quality || 75));
    url.searchParams.set("fit", "max");
    url.searchParams.set("auto", "format");
    return url.toString();
  }

  if (LOCAL_RASTER.test(src)) {
    const name = src.replace(/\.\w+$/, "");
    return `/_opt${name}-${width}.webp${VERSION ? `?v=${VERSION}` : ""}`;
  }

  return src;
}
