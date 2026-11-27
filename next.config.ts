import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

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
  images: {
    // AVIF is ~20–30% lighter than WebP, WebP stays as fallback
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
    ],
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
