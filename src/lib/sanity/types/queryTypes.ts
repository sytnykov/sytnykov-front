import { LocalizedFullContent, LocalizedString, SanityImage } from "./shared";

export type PublicationItem = {
  title: LocalizedString;
  previewImage?: SanityImage;
  mainImage?: SanityImage;
  mainImageMobile?: SanityImage;
  slug: string;
  description: LocalizedString;
  content: LocalizedFullContent;
  gallery?: SanityImage[];
};

export type AnnouncementItem = {
  title: LocalizedString;
  previewImage?: SanityImage;
  description: LocalizedString;
  startDate: string;
};
