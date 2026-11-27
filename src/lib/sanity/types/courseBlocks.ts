import { FullContentBlock } from "./shared";

/** Data shapes of the course page constructor (admin: course.sections). */
export type L10n = { uk?: string; ru?: string } | undefined;
export type Img = { url?: string } | undefined;

type Base<T extends string> = { _type: T; _key: string; title?: L10n };

export type HeroBlock = Base<"courseHeroBlock"> & {
  subtitle?: L10n;
  startLabel?: L10n;
  duration?: L10n;
  format?: L10n;
  priceFrom?: number;
  image?: Img;
};
export type ResultsBlock = Base<"courseResultsBlock"> & {
  items?: { _key: string; title?: L10n; text?: L10n }[];
};
export type AudienceBlock = Base<"courseAudienceBlock"> & {
  groups?: { _key: string; title?: L10n; text?: L10n }[];
  lossesTitle?: L10n;
  losses?: (L10n & { _key?: string })[];
};
export type WhyBlock = Base<"courseWhyBlock"> & {
  lead?: L10n;
  items?: { _key: string; title?: L10n; text?: L10n }[];
  image?: Img;
};
/** Internal: «about the course» text of courses made before the constructor. */
export type AboutBlock = Base<"courseAboutBlock"> & {
  content?: { uk?: FullContentBlock[]; ru?: FullContentBlock[] };
  facts?: { icon: string; label: L10n }[];
};
export type TrainerBlock = Base<"courseTrainerBlock"> & {
  storyOverride?: L10n;
};
export type ProgramBlock = Base<"courseProgramBlock"> & {
  modules?: {
    _key: string;
    title?: L10n;
    lessons?: { _key: string; title?: L10n; benefit?: L10n }[];
    /** recording of this module (older courses keep videos per module) */
    videoUrl?: string;
  }[];
};
export type FormatBlock = Base<"courseFormatBlock"> & {
  facts?: { _key: string; value?: string; label?: L10n }[];
  features?: (L10n & { _key?: string })[];
};
export type CoursePackage = {
  _key: string;
  name?: L10n;
  price?: number;
  oldPrice?: number;
  note?: L10n;
  highlighted?: boolean;
  features?: { _key: string; text?: L10n; included?: boolean }[];
  paymentUrl?: string;
};
export type PackagesBlock = Base<"coursePackagesBlock"> & {
  packages?: CoursePackage[];
};
export type ReviewsBlock = Base<"courseReviewsBlock"> & {
  reviews?: {
    _key: string;
    name?: string;
    role?: L10n;
    text?: L10n;
    photo?: Img;
    videoUrl?: string;
    sourceUrl?: string;
  }[];
};
export type FaqBlock = Base<"courseFaqBlock"> & {
  items?: { _key: string; question?: L10n; answer?: L10n }[];
};
export type VideoBlock = Base<"courseVideoBlock"> & {
  videoUrl?: string;
  /** publication date on YouTube, needed by Google for VideoObject markup */
  uploadDate?: string;
  caption?: L10n;
};
export type TextImageBlock = Base<"courseTextImageBlock"> & {
  text?: L10n;
  image?: Img;
  imageLeft?: boolean;
};
export type GalleryBlock = Base<"courseGalleryBlock"> & { images?: Img[] };

export type CourseBlock =
  | HeroBlock
  | ResultsBlock
  | AudienceBlock
  | WhyBlock
  | AboutBlock
  | TrainerBlock
  | ProgramBlock
  | FormatBlock
  | PackagesBlock
  | ReviewsBlock
  | FaqBlock
  | VideoBlock
  | TextImageBlock
  | GalleryBlock;

export type Trainer = {
  name?: L10n;
  role?: L10n;
  photo?: Img;
  story?: L10n;
  facts?: { _key: string; value?: string; label?: L10n }[];
  achievements?: (L10n & { _key?: string })[];
  logos?: Img[];
};

/** Everything a constructor page needs to render. */
export type CoursePageData = {
  title: L10n;
  description?: L10n;
  slug: string;
  category?: { slug?: string; title?: L10n };
  mainImage?: Img;
  flowStart?: string;
  priceValidUntil?: string;
  sections: CourseBlock[];
  trainer?: Trainer | null;
};

/** Picks the visitor's language, falling back to Ukrainian. */
export const pick = (value: L10n, locale: string) =>
  (locale === "ru" ? value?.ru || value?.uk : value?.uk || value?.ru) || "";
