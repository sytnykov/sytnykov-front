import { Metadata } from "next";

import HomeAdvantages from "@/components/homepage/HomeAdvantages";
import HomeBottomCTA from "@/components/homepage/HomeBottomCTA";
import HomeCourses from "@/components/homepage/HomeCourses";
import HomeExperience from "@/components/homepage/HomeExperience";
import HomeHero from "@/components/homepage/HomeHero";
import HomeKnowledge from "@/components/homepage/HomeKnowledge";
import HomePublications from "@/components/homepage/HomePublications";
import HomeTopCTA from "@/components/homepage/HomeTopCTA";
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
      <HomeAdvantages />
      <HomeTopCTA />
      <HomePublications lang={locale} />
      <HomeKnowledge />
      <HomeExperience />
      <HomeBottomCTA />
    </>
  );
}
