import { Metadata } from "next";
import { Locale } from "next-intl";

import AboutCases from "@/components/experiencepage/AboutCases";
import AboutExpertise from "@/components/experiencepage/AboutExpertise";
import AboutHero from "@/components/experiencepage/AboutHero";
import AboutPath from "@/components/experiencepage/AboutPath";
import HomeBottomCTA from "@/components/homepage/HomeBottomCTA";
import { ROUTES } from "@/constants/routes";
import { generatePageMetadata } from "@/utils/generatePageMetaData";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return generatePageMetadata({
    locale,
    namespace: "experiencePage",
    path: ROUTES.EXPERIENCE,
  });
}

const ExperiencePage = () => {
  return (
    <>
      <AboutHero />
      <AboutPath />
      <AboutExpertise />
      <AboutCases />
      <HomeBottomCTA />
    </>
  );
};

export default ExperiencePage;
