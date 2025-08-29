import {
  AnnouncementItem,
  PublicationItem,
} from "@/lib/sanity/types/queryTypes";

export const isPublicationList = (
  list: (AnnouncementItem | PublicationItem)[]
): list is PublicationItem[] => {
  if (!Array.isArray(list) || list.length === 0) return false;
  return !("startDate" in list[0]);
};
