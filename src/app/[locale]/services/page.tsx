import { Metadata } from "next";
import { Locale } from "next-intl";

import ServicesAnalytics from "@/components/servicespage/ServicesAnalytics";
import ServicesConsulting from "@/components/servicespage/ServicesConsulting";
import ServicesHero from "@/components/servicespage/ServicesHero";
import ServicesPractice from "@/components/servicespage/ServicesPractice";
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
      <ServicesPractice />
      <ServicesAnalytics />
      <ServicesConsulting />
    </>
  );
};

export default ServicesPage;
