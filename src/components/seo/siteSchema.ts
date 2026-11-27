import type { SiteContacts } from "@/lib/siteSettings";
import { SITE_URL } from "@/utils/getBaseUrl";

export const PERSON_ID = `${SITE_URL}/#person`;
export const ORG_ID = `${SITE_URL}/#organization`;
/** the practice as an Organization (brand, socials), next to the LegalService */
export const BRAND_ID = `${SITE_URL}/#brand`;

/** Person + professional service + website: shared by every page. */
export const siteSchema = (locale: string, contacts: SiteContacts) => {
  const uk = locale === "uk";
  const phone = `+${contacts.phone.replace(/\D/g, "")}`;
  const sameAs = [
    ...contacts.socialLinks.map(({ href }) => href),
    contacts.googleReviewsUrl ?? "",
  ].filter(href => href.startsWith("http"));

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": PERSON_ID,
        name: uk ? "Олександр Ситников" : "Александр Сытников",
        jobTitle: uk
          ? "Адвокат, суддя Вищого адміністративного суду України у відставці"
          : "Адвокат, судья Высшего административного суда Украины в отставке",
        url: `${SITE_URL}/${locale}`,
        image: `${SITE_URL}/images/homepage/home-hero-person-hq.webp`,
        email: contacts.email,
        telephone: phone,
        knowsAbout: uk
          ? [
              "Адміністративне право",
              "Адміністративний процес",
              "Касація",
              "Податкові спори",
              "Судова промова",
            ]
          : [
              "Административное право",
              "Административный процесс",
              "Кассация",
              "Налоговые споры",
              "Судебная речь",
            ],
        sameAs,
      },
      {
        "@type": "LegalService",
        "@id": ORG_ID,
        name: uk
          ? "Олександр Ситников — адвокат"
          : "Александр Сытников — адвокат",
        url: `${SITE_URL}/${locale}`,
        image: `${SITE_URL}/images/seo-default.webp`,
        telephone: phone,
        email: contacts.email,
        founder: { "@id": PERSON_ID },
        parentOrganization: { "@id": BRAND_ID },
        areaServed: { "@type": "Country", name: "Ukraine" },
        address: {
          "@type": "PostalAddress",
          addressLocality: uk ? "Київ" : "Киев",
          addressCountry: "UA",
        },
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "09:00",
          closes: "18:00",
        },
        sameAs,
      },
      {
        "@type": "Organization",
        "@id": BRAND_ID,
        name: uk ? "Олександр Ситников" : "Александр Сытников",
        url: `${SITE_URL}/${locale}`,
        logo: `${SITE_URL}/apple-icon.png`,
        email: contacts.email,
        telephone: phone,
        founder: { "@id": PERSON_ID },
        contactPoint: {
          "@type": "ContactPoint",
          telephone: phone,
          email: contacts.email,
          contactType: "customer service",
          availableLanguage: ["uk", "ru"],
        },
        sameAs,
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "sitnikov.com.ua",
        inLanguage: ["uk", "ru"],
        publisher: { "@id": ORG_ID },
      },
    ],
  };
};
