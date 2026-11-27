import { Metadata } from "next";

import AnnouncementsView from "@/components/announcementsPage/AnnouncementsView";
import HomeBottomCTA from "@/components/homepage/HomeBottomCTA";
import { ROUTES } from "@/constants/routes";
import { generatePageMetadata } from "@/utils/generatePageMetaData";
import { Locale } from "@/types/locale";

export const revalidate = 86400;

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
      <AnnouncementsView lang={locale} />
      <HomeBottomCTA />
    </>
  );
};

export default AnnouncementsPage;
