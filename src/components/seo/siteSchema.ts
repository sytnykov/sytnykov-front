import { siteConfig } from "@/constants/siteConfig";
import { SITE_URL } from "@/utils/getBaseUrl";

const sameAs = siteConfig.socialLinks
  .map(({ href }) => href)
  .filter(href => href.startsWith("http"));

export const PERSON_ID = `${SITE_URL}/#person`;
export const ORG_ID = `${SITE_URL}/#organization`;

/** Person + professional service + website: shared by every page. */
export const siteSchema = (locale: string) => {
  const uk = locale === "uk";
  const phone = `+${siteConfig.phone.replace(/\D/g, "")}`;

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
        email: siteConfig.email,
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
        email: siteConfig.email,
        founder: { "@id": PERSON_ID },
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
