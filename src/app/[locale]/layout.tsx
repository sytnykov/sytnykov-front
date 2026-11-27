import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Montserrat } from "next/font/google";
import localFont from "next/font/local";
import { notFound } from "next/navigation";

import { routing } from "@/i18n/routing";
import { Locale } from "@/types/locale";

import "./globals.css";

import Analytics from "@/components/module/analytics/Analytics";
import CookieBanner from "@/components/module/cookies/CookieBanner";
import Footer from "@/components/module/footer/Footer";
import Header from "@/components/module/header/Header";
import JsonLd from "@/components/seo/JsonLd";
import { siteSchema } from "@/components/seo/siteSchema";
import { SITE_URL } from "@/utils/getBaseUrl";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Олександр Ситников — адвокат, суддя ВАС у відставці",
  description:
    "Курси для адвокатів і юристів та консультації адвоката у публічно-правових спорах.",
  // Preview copies (e.g. *.vercel.app) must never be indexed.
  ...(process.env.NEXT_PUBLIC_NOINDEX === "1" && {
    robots: { index: false, follow: false },
  }),
};

/** Display font: preloaded, with a size-matched fallback so headings do not jump. */
const micra = localFont({
  src: "../../../public/fonts/Micra-Regular.woff2",
  weight: "400",
  style: "normal",
  display: "swap",
  variable: "--font-micra",
  adjustFontFallback: "Arial",
  preload: true,
});

const montserrat = Montserrat({
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-montserrat",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  const all = await getMessages();
  // Only what client components translate goes to the browser;
  // server components read the full dictionary on the server.
  const CLIENT_NAMESPACES = ["header", "form", "modal", "cookies", "paginator"] as const;
  const messages = {
    ...Object.fromEntries(CLIENT_NAMESPACES.map(ns => [ns, all[ns]])),
    educationPage: { list: (all.educationPage as Record<string, unknown>)?.list },
  } as typeof all;

  return (
    <html lang={locale} className="scroll-smooth">
      <body
        className={`${montserrat.variable} ${micra.variable} relative z-[1] flex min-h-screen flex-col antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main className="flex-grow overflow-x-hidden">{children}</main>
          <Footer />
          <CookieBanner />
          <Analytics />
        </NextIntlClientProvider>
        <JsonLd data={siteSchema(locale)} />
      </body>
    </html>
  );
}
