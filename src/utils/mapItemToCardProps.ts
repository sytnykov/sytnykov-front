import {
  AnnouncementItem,
  PublicationItem,
} from "@/lib/sanity/types/queryTypes";
import { formatStartDate } from "@/utils/dateFormatter";
import { Locale } from "@/types/locale";

import { getReadingTimeMinutes } from "./getReadingTimeMinutes";

interface MappedCardProps {
  title: string;
  description: string;
  imgSrc?: string;
  info: string;
  href?: string;
  ariaLabel?: string;
}

export const mapItemToCardProps = (
  item: PublicationItem | AnnouncementItem,
  lang: Locale
): MappedCardProps => {
  const isAnnouncement = "startDate" in item;

  const title = item.title[lang];
  const description = item.description[lang];
  const imgSrc = isAnnouncement
    ? item.previewImage?.url || undefined
    : (item as PublicationItem).mainImageMobile?.url || undefined;

  const info = isAnnouncement
    ? formatStartDate(item.startDate, lang)
    : getReadingTimeMinutes(item.content, lang);

  const href = isAnnouncement
    ? undefined
    : `/${lang}/publications/${item.slug}`;

  const ariaLabel =
    !isAnnouncement && lang === "uk"
      ? "Посилання на повну публікацію"
      : "Ссылка на полную публикацию";

  return { title, description, imgSrc, info, href, ariaLabel };
};
