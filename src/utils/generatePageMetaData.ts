import type { Metadata } from "next";
import { Locale } from "next-intl";
import { getTranslations } from "next-intl/server";

import { routing } from "@/i18n/routing";

import { getBaseUrl } from "./getBaseUrl";

type GeneratePageMetadataProps = {
  locale: Locale;
  namespace: string;
  path: string;
  overrides?: Partial<Metadata>;
};

export async function generatePageMetadata({
  locale,
  namespace,
  path,
  overrides = {},
}: GeneratePageMetadataProps): Promise<Metadata> {
  const t = await getTranslations();

  const companyName = t("header.companyName");
  const title = t(namespace + ".hero.title");
  const description = t(namespace + ".hero.descr");
  const siteName = t("seo.siteName");

  const baseUrl = await getBaseUrl();

  const { defaultLocale, locales } = routing;

  const localizedPath = `/${locale}${path}`;
  const alternates: Record<string, string> = {};
  locales.forEach(loc => {
    alternates[loc] = loc === defaultLocale ? path : `/${loc}${path}`;
  });

  const defaultOgImage = `${baseUrl}/images/seo-default.webp`;

  const metadata: Metadata = {
    title: `${companyName} | ${title}`,
    description: description,
    metadataBase: new URL(baseUrl),
    openGraph: {
      title: title,
      description: description,
      url: `${baseUrl}${localizedPath}`,
      type: "website",
      siteName: siteName,
      images: [
        {
          url: defaultOgImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: locale === "uk" ? "uk_UA" : "ru_RU",
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      images: [defaultOgImage],
    },
    alternates: {
      canonical: `${baseUrl}${localizedPath}`,
      languages: alternates,
    },
    ...overrides,
  };

  return metadata;
}
