import { Metadata } from "next";
import { Locale } from "next-intl";

import ExperienceCareerPath from "@/components/experiencepage/ExperienceCareerPath";
import ExperienceExpertise from "@/components/experiencepage/ExperienceExpertise";
import ExperienceHero from "@/components/experiencepage/ExperienceHero";
import ExperienceProud from "@/components/experiencepage/ExperienceProud";
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
      <ExperienceHero />
      <ExperienceCareerPath />
      <ExperienceExpertise />
      <ExperienceProud />
    </>
  );
};

export default ExperiencePage;
