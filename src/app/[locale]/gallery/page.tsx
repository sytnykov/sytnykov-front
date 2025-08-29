import { Metadata } from "next";

import GalleryContent from "@/components/galleryPage/GalleryContent";
import GalleryHero from "@/components/galleryPage/GalleryHero";
import { ROUTES } from "@/constants/routes";
import { generatePageMetadata } from "@/utils/generatePageMetaData";
import { Locale } from "@/types/locale";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return generatePageMetadata({
    locale,
    namespace: "galleryPage",
    path: ROUTES.GALLERY,
  });
}

const GalleryPage = async ({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) => {
  const { locale } = await params;

  return (
    <>
      <GalleryHero />
      <GalleryContent lang={locale} />
    </>
  );
};

export default GalleryPage;
