import { Metadata } from "next";

import HomeAdvantages from "@/components/homepage/HomeAdvantages";
import HomeAudience from "@/components/homepage/HomeAudience";
import HomeBottomCTA from "@/components/homepage/HomeBottomCTA";
import HomeConsultation from "@/components/homepage/HomeConsultation";
import HomeCourses from "@/components/homepage/HomeCourses";
import HomeExperience from "@/components/homepage/HomeExperience";
import HomeHero from "@/components/homepage/HomeHero";
import HomePublications from "@/components/homepage/HomePublications";
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
    namespace: "homepage",
    path: ROUTES.HOME,
  });
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  return (
    <>
      <HomeHero />
      <HomeCourses lang={locale} />
      <HomeAudience />
      <HomeAdvantages />
      <HomeExperience />
      <HomeConsultation />
      <HomePublications lang={locale} />
      <HomeBottomCTA />
    </>
  );
}
