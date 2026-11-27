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
  const metaTitleKey = namespace + ".hero.metaTitle";
  const metaDescrKey = namespace + ".hero.metaDescr";
  const hasMetaTitle = t.has(metaTitleKey);
  const title = hasMetaTitle ? t(metaTitleKey) : t(namespace + ".hero.title");
  const description = t.has(metaDescrKey)
    ? t(metaDescrKey)
    : t(namespace + ".hero.descr");
  const siteName = t("seo.siteName");

  const baseUrl = await getBaseUrl();

  const { defaultLocale, locales } = routing;

  const localizedPath = `/${locale}${path === "/" ? "" : path}`;
  // every locale lives under its prefix (/uk, /ru); x-default → default locale
  const cleanPath = path === "/" ? "" : path;
  const alternates: Record<string, string> = {};
  locales.forEach(loc => {
    alternates[loc] = `${baseUrl}/${loc}${cleanPath}`;
  });
  alternates["x-default"] = `${baseUrl}/${defaultLocale}${cleanPath}`;

  const defaultOgImage = `${baseUrl}/images/seo-default.webp`;

  const metadata: Metadata = {
    title: hasMetaTitle ? title : `${companyName} | ${title}`,
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
