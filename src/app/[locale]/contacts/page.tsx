import { Metadata } from "next";
import { Locale } from "next-intl";

import Contacts from "@/components/contactsPage/Contacts";
import ContactsFeedback from "@/components/contactsPage/ContactsFeedback";
import ContactsHero from "@/components/contactsPage/ContactsHero";
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
      <ContactsHero />
      <Contacts />
      <ContactsFeedback />
    </>
  );
};

export default ContactsPage;
