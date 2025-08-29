import { Metadata } from "next";

import AnnouncementsContent from "@/components/announcementsPage/AnnouncementsContent";
import AnnouncementsHero from "@/components/announcementsPage/AnnouncementsHero";
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
    namespace: "announcementsPage",
    path: ROUTES.ANNOUNCEMENTS,
  });
}

const AnnouncementsPage = async ({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) => {
  const { locale } = await params;

  return (
    <>
      <AnnouncementsHero />
      <AnnouncementsContent lang={locale} />
    </>
  );
};

export default AnnouncementsPage;
