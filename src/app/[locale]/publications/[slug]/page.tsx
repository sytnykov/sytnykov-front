import { notFound } from "next/navigation";

import HomeBottomCTA from "@/components/homepage/HomeBottomCTA";
import ArticleView from "@/components/publications/ArticleView";
import JsonLd from "@/components/seo/JsonLd";
import { ORG_ID, PERSON_ID } from "@/components/seo/siteSchema";
import {
  getAllPublications,
  getPublicationBySlug,
} from "@/lib/sanity/queries/queries";
import { ROUTES } from "@/constants/routes";
import { normalizeTitle } from "@/utils/courseImage";
import { SITE_URL } from "@/utils/getBaseUrl";
import { getReadingTimeMinutes } from "@/utils/getReadingTimeMinutes";
import { mapItemToCardProps } from "@/utils/mapItemToCardProps";
import { Locale } from "@/types/locale";

// export const dynamic = "force-static";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;

  const post = await getPublicationBySlug(slug);

  if (!post) return {};

  const { title, description, previewImage } = post;

  const path = `${ROUTES.PUBLICATIONS}/${slug}`;

  return {
    title: title[locale],
    description: description[locale],
    alternates: {
      canonical: `${SITE_URL}/${locale}${path}`,
      languages: {
        uk: `${SITE_URL}/uk${path}`,
        ru: `${SITE_URL}/ru${path}`,
        "x-default": `${SITE_URL}/uk${path}`,
      },
    },
    openGraph: {
      url: `${SITE_URL}/${locale}${path}`,
      title: title[locale],
      description: description[locale],
      images: previewImage?.url ? [previewImage.url] : [],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: title[locale],
      description: description[locale],
      images: previewImage?.url ? [previewImage?.url] : [],
    },
  };
}

// export async function generateStaticParams() {
//   const posts = await getAllPublicationSlugs();

//   const languages = ["uk", "ru"];

//   return posts.flatMap(post =>
//     languages.map(lang => ({
//       slug: post.slug,
//       lang,
//     }))
//   );
// }

const PublicationPage = async ({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) => {
  const { locale, slug } = await params;
  const post = await getPublicationBySlug(slug);

  if (!post) return notFound();

  const { title, description, content, gallery, mainImage } = post;

  const readingTime = getReadingTimeMinutes(content, locale);

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title[locale],
    description: description[locale],
    image: post.previewImage?.url || mainImage?.url,
    inLanguage: locale,
    mainEntityOfPage: `${SITE_URL}/${locale}${ROUTES.PUBLICATIONS}/${slug}`,
    author: { "@id": PERSON_ID },
    publisher: { "@id": ORG_ID },
  };

  const related = (await getAllPublications().catch(() => []))
    .filter(p => p.slug !== slug)
    .slice(0, 3)
    .map(p => {
      const c = mapItemToCardProps(p, locale);
      return {
        href: c.href ?? `/${locale}${ROUTES.PUBLICATIONS}`,
        title: normalizeTitle(c.title),
        description: c.description,
        info: c.info,
      };
    });

  return (
    <>
      <JsonLd data={articleLd} />
      <ArticleView
        title={normalizeTitle(title[locale] || title.uk)}
        description={description[locale]}
        readingTime={readingTime}
        content={content[locale]?.length ? content[locale] : content.uk}
        gallery={gallery}
        related={related}
      />
      <HomeBottomCTA />
    </>
  );
};

export default PublicationPage;
