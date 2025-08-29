import { getAllAnnouncements } from "@/lib/sanity/queries/queries";
import { Locale } from "@/types/locale";

import PublicationsPaginatedList from "../shared/publicationList/PublicationsPaginatedList";

export const revalidate = 3600;

const AnnouncementsContent = async ({ lang }: { lang: Locale }) => {
  const announcementList = await getAllAnnouncements();

  return (
    <PublicationsPaginatedList publicationList={announcementList} lang={lang} />
  );
};

export default AnnouncementsContent;
