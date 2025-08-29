import { getGallery } from "@/lib/sanity/queries/gallery";
import { Locale } from "@/types/locale";

import GalleryPaginated from "./GalleryPaginated";

const GalleryContent = async ({ lang }: { lang: Locale }) => {
  const galleryList = await getGallery();

  return (
    <>
      {galleryList.map((item, index) => (
        <GalleryPaginated key={index} data={item} lang={lang} index={index} />
      ))}
    </>
  );
};

export default GalleryContent;
