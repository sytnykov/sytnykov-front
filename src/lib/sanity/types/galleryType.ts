import { LocalizedString, SanityImage } from "./shared";

export type GalleryItem = {
  title: LocalizedString;
  description: LocalizedString;
  images: SanityImage[];
};
