import { notFound } from "next/navigation";

import PublicationContent from "@/components/publicationPage/PublicationContent";
import PublicationHero from "@/components/publicationPage/PublicationHero";
import {
  // getAllPublicationSlugs,
  getPublicationBySlug,
} from "@/lib/sanity/queries/queries";
import { getReadingTimeMinutes } from "@/utils/getReadingTimeMinutes";
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

  return {
    title: title[locale],
    description: description[locale],
    openGraph: {
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

  const { title, description, content, gallery, mainImage, mainImageMobile } =
    post;

  const readingTime = getReadingTimeMinutes(content, locale);

  return (
    <>
      <PublicationHero
        title={title[locale]}
        description={description[locale]}
        mainImage={mainImage}
        mainImageMobile={mainImageMobile}
        readingTime={readingTime}
      />
      <PublicationContent
        content={content[locale]}
        gallery={gallery}
        title={title[locale]}
      />
    </>
  );
};

export default PublicationPage;
