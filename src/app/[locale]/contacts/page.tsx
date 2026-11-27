import { Metadata } from "next";
import { Locale } from "next-intl";

import ContactsView from "@/components/contactsPage/ContactsView";
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
    namespace: "contactsPage",
    path: ROUTES.CONTACTS,
  });
}

const ContactsPage = () => {
  return (
    <>
      <ContactsView />
    </>
  );
};

export default ContactsPage;
