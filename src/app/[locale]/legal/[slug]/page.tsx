import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

import { LEGAL_DRAFTS } from "@/data/legalDrafts";

import PrivacyContent from "@/components/legalPage/PrivacyContent";
import TermsContent from "@/components/legalPage/TermsContent";
import RenderContent from "@/components/shared/renderContent/RenderContent";
import { Link } from "@/i18n/navigation";
import { getLegalPage } from "@/lib/sanity/queries/legal";
import { LEGAL_PAGES, LegalSlug, legalPath } from "@/constants/legal";
import { siteConfig } from "@/constants/siteConfig";
import { IS_PREVIEW } from "@/utils/env";
import { generatePageMetadata } from "@/utils/generatePageMetaData";
import { Locale } from "@/types/locale";

/**
 * Drafts in LEGAL_DRAFTS hold placeholders ([ПІБ], РНОКПП [номер]...), so they
 * are shown only on preview copies. Production shows a short note until the
 * real document is published in Sanity. The privacy policy and the terms of
 * use already have final texts (the client's former /privacy and /terms
 * pages), so those are shown instead.
 */
const SHOW_DRAFTS = IS_PREVIEW;
const PENDING: Record<Locale, string> = {
  uk: "Документ готується до публікації. Якщо він потрібен вам зараз, напишіть нам:",
  ru: "Документ готовится к публикации. Если он нужен вам сейчас, напишите нам:",
};

type Params = Promise<{ locale: Locale; slug: string }>;

const isLegalSlug = (slug: string): slug is LegalSlug =>
  (LEGAL_PAGES as readonly string[]).includes(slug);

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLegalSlug(slug)) return {};
  const t = await getTranslations({ locale, namespace: "legal" });

  return generatePageMetadata({
    locale,
    namespace: "legal",
    path: legalPath(slug),
    overrides: {
      title: `${t(`docs.${slug}`)} | sitnikov.com.ua`,
      description: t("descr"),
      // service documents: keep them out of search results, follow links
      robots: { index: false, follow: true },
    },
  });
}

const LegalPage = async ({ params }: { params: Params }) => {
  const { locale, slug } = await params;
  if (!isLegalSlug(slug)) notFound();

  const t = await getTranslations({ locale, namespace: "legal" });
  const doc = await getLegalPage(slug);
  const content = doc?.content?.[locale]?.length
    ? doc.content[locale]
    : doc?.content?.uk;
  const title = doc?.title?.[locale] || doc?.title?.uk || t(`docs.${slug}`);
  const updated = doc?.updatedAt
    ? new Date(doc.updatedAt).toLocaleDateString(
        locale === "uk" ? "uk-UA" : "ru-RU",
        { day: "numeric", month: "long", year: "numeric" }
      )
    : null;

  return (
    <>
      <section className="relative isolate overflow-hidden bg-dark pb-12 pt-[120px] text-light md:pb-16 md:pt-[150px]">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(45%_70%_at_85%_30%,rgba(81,136,255,0.28)_0%,rgba(9,17,41,0)_70%),radial-gradient(35%_60%_at_0%_100%,rgba(0,28,88,0.9)_0%,rgba(9,17,41,0)_100%)]"
        />
        <div className="container max-w-[1280px]">
          <h1 className="max-w-[860px] text-balance font-micra text-[26px] leading-[1.12] [word-spacing:-0.18em] md:text-[34px] xl:text-[44px]">
            {title}
          </h1>
          {updated && (
            <p className="mt-4 text-[14px] text-white/60">
              {t("updated")}: {updated}
            </p>
          )}
        </div>
      </section>

      <section className="bg-light py-12 md:py-16 xl:py-20">
        <div className="container grid max-w-[1280px] grid-cols-1 gap-10 lg:grid-cols-12">
          <nav
            aria-label={t("navLabel")}
            className="lg:col-span-4 xl:col-span-3"
          >
            <ul className="flex flex-col gap-1.5 lg:sticky lg:top-28">
              {LEGAL_PAGES.map(item => (
                <li key={item}>
                  <Link
                    href={legalPath(item)}
                    aria-current={item === slug ? "page" : undefined}
                    className={
                      item === slug
                        ? "block rounded-[14px] bg-dark px-4 py-3 text-[14px] font-semibold text-light"
                        : "block rounded-[14px] bg-[#f3f6fd] px-4 py-3 text-[14px] font-medium text-dark/75 transition-colors hover:bg-[#e6ecfa] hover:text-dark"
                    }
                  >
                    {t(`docs.${item}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <article className="flex max-w-[760px] flex-col gap-4 text-[15px] leading-[1.7] text-dark/80 md:text-[16px] lg:col-span-8 xl:col-span-9 [&_h2]:mt-6 [&_h2]:text-[20px] [&_h2]:font-semibold [&_h2]:leading-[1.3] [&_h2]:text-dark [&_h3]:mt-6 [&_h3]:text-[20px] [&_h3]:leading-[1.3] [&_h3]:text-dark [&_h4]:mt-4 [&_h4]:text-[18px] [&_h4]:text-dark">
            {content?.length ? (
              <RenderContent content={content} />
            ) : slug === "privacy-policy" ? (
              <PrivacyContent />
            ) : slug === "terms-of-use" ? (
              <TermsContent />
            ) : !SHOW_DRAFTS ? (
              <p>
                {PENDING[locale] ?? PENDING.uk}{" "}
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-accent underline underline-offset-4"
                >
                  {siteConfig.email}
                </a>
              </p>
            ) : (
              LEGAL_DRAFTS[slug].sections.map(section => (
                <div key={section.heading} className="flex flex-col gap-3">
                  <h2>{section.heading}</h2>
                  {section.paragraphs.map(p => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              ))
            )}
          </article>
        </div>
      </section>
    </>
  );
};

export default LegalPage;
