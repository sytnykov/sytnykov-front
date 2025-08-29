import { Metadata } from "next";

import PublicationsContent from "@/components/publicationsPage/PublicationListContent";
import PublicationsHero from "@/components/publicationsPage/PublicationListHero";
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
    namespace: "publicationsPage",
    path: ROUTES.PUBLICATIONS,
  });
}

const PublicationsPage = async ({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) => {
  const { locale } = await params;

  return (
    <>
      <PublicationsHero />
      <PublicationsContent lang={locale} />
    </>
  );
};

export default PublicationsPage;
