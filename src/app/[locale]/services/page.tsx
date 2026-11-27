import { Metadata } from "next";
import { Locale } from "next-intl";

import HomeBottomCTA from "@/components/homepage/HomeBottomCTA";
import ServicesDirection from "@/components/servicespage/ServicesDirection";
import ServicesFaq from "@/components/servicespage/ServicesFaq";
import ServicesHero from "@/components/servicespage/ServicesHero";
import ServicesProcess from "@/components/servicespage/ServicesProcess";
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
    namespace: "servicepage",
    path: ROUTES.SERVICES,
  });
}

const ServicesPage = () => {
  return (
    <>
      <ServicesHero />
      <ServicesDirection index={0} />
      <ServicesDirection index={1} />
      <ServicesDirection index={2} />
      <ServicesProcess />
      <ServicesFaq />
      <HomeBottomCTA />
    </>
  );
};

export default ServicesPage;
