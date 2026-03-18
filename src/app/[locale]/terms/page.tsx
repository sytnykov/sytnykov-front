import { Metadata } from "next";
import { Locale } from "next-intl";

import LegalPageLayout from "@/components/legalPage/LegalPageLayout";
import TermsContent from "@/components/legalPage/TermsContent";
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
    namespace: "termsPage",
    path: ROUTES.TERMS,
  });
}

const TermsPage = () => {
  return (
    <LegalPageLayout namespace="termsPage">
      <TermsContent />
    </LegalPageLayout>
  );
};

export default TermsPage;
