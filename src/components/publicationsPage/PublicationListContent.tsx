import { getAllPublications } from "@/lib/sanity/queries/queries";
import { Locale } from "@/types/locale";

import PublicationsPaginatedList from "../shared/publicationList/PublicationsPaginatedList";

const PublicationListContent = async ({ lang }: { lang: Locale }) => {
  const publicationList = await getAllPublications();

  return (
    <PublicationsPaginatedList publicationList={publicationList} lang={lang} />
  );
};

export default PublicationListContent;
