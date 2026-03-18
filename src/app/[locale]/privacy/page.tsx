import { Metadata } from "next";
import { Locale } from "next-intl";

import LegalPageLayout from "@/components/legalPage/LegalPageLayout";
import PrivacyContent from "@/components/legalPage/PrivacyContent";
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
    namespace: "privacyPage",
    path: ROUTES.PRIVACY,
  });
}

const PrivacyPage = () => {
  return (
    <LegalPageLayout namespace="privacyPage">
      <PrivacyContent />
    </LegalPageLayout>
  );
};

export default PrivacyPage;
