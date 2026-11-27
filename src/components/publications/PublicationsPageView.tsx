import { getTranslations } from "next-intl/server";
import NextLink from "next/link";

import { getAllPublications } from "@/lib/sanity/queries/queries";
import { normalizeTitle } from "@/utils/courseImage";
import { mapItemToCardProps } from "@/utils/mapItemToCardProps";
import { Locale } from "@/types/locale";

import LineIcon, { Rings } from "../homepage/LineIcon";
import SectionHead from "../homepage/SectionHead";
import PublicationsGrid, { TileData } from "./PublicationsGrid";

/** «Публікації»: dark hero with the latest article + the full list. */
const PublicationsPageView = async ({ lang }: { lang: Locale }) => {
  const t = await getTranslations("publicationsPage");
  const tHome = await getTranslations("homepage.publications");
  const posts = await getAllPublications().catch(() => []);
  const items: TileData[] = posts.map(p => {
    const c = mapItemToCardProps(p, lang);
    return {
      href: c.href ?? `/${lang}/publications`,
      title: normalizeTitle(c.title),
      description: c.description,
      info: c.info,
    };
  });
  const [latest] = items;

  return (
    <>
      <section className="relative isolate overflow-hidden bg-dark text-light">
        <div
          aria-hidden
          className="absolute inset-0 -z-20 bg-[radial-gradient(45%_60%_at_78%_45%,rgba(81,136,255,0.32)_0%,rgba(9,17,41,0)_70%),radial-gradient(35%_45%_at_0%_100%,rgba(0,28,88,0.9)_0%,rgba(9,17,41,0)_100%)]"
        />
        <span
          aria-hidden
          className="absolute inset-0 -z-20 bg-[radial-gradient(rgba(255,255,255,0.07)_1px,transparent_1.2px)] [background-size:18px_18px] [mask-image:linear-gradient(160deg,#000_0%,transparent_45%)]"
        />
        <div className="container grid max-w-[1280px] grid-cols-1 gap-8 pb-12 pt-[104px] md:grid-cols-12 md:pb-16 md:pt-[132px] xl:gap-12 xl:pb-[72px] xl:pt-[150px]">
          <div className="min-w-0 md:col-span-6 md:self-center">
            <h1>
              <span className="block font-micra text-[clamp(30px,9vw,40px)] uppercase leading-[1.08] [word-spacing:-0.2em] md:text-[44px] xl:text-[60px]">
                {t("hero.title")}
              </span>
              <span className="mt-4 block max-w-[520px] text-pretty text-[15px] font-medium leading-[1.45] text-[#c9d8ff] md:mt-5 md:text-[17px]">
                {t("hero.subtitle")}
              </span>
            </h1>
            <p className="mt-5 max-w-[520px] text-pretty text-[15px] leading-[1.6] text-white/70 md:text-[16px]">
              {t("hero.descr")}
            </p>
          </div>

          {latest && (
            <div className="relative md:col-span-6">
              <Rings className="pointer-events-none absolute -right-[30%] top-1/2 -z-10 w-[140%] -translate-y-1/2" />
              <NextLink
                href={latest.href}
                className="group relative isolate flex h-full min-h-[320px] flex-col overflow-hidden rounded-[28px] bg-[linear-gradient(150deg,#1d3a8a_0%,#0d1838_75%)] p-6 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.9)] ring-1 ring-white/10 md:p-8"
              >
                <span
                  aria-hidden
                  className="absolute inset-0 -z-10 bg-[radial-gradient(70%_80%_at_100%_0%,rgba(81,136,255,0.55),rgba(81,136,255,0)_65%)]"
                />
                <LineIcon
                  name="document"
                  className="absolute -bottom-4 -right-4 -z-10 size-[180px] text-accent/25 transition-transform duration-700 group-hover:-translate-y-2"
                />
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-light px-3 py-1.5 text-[12px] font-semibold text-dark">
                    <LineIcon
                      name="target"
                      className="size-3.5 text-accent-strong"
                    />
                    {t("latest")}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-[12px] font-medium shadow-[inset_0_0_0_1px_rgba(255,255,255,0.14)]">
                    <LineIcon name="clock" className="size-3.5" />
                    {latest.info}
                  </span>
                </div>
                <h2 className="mt-auto text-balance pt-10 text-[22px] font-semibold leading-[1.25] md:text-[28px]">
                  {latest.title}
                </h2>
                <p className="mt-3 line-clamp-3 max-w-[480px] text-[15px] leading-[1.6] text-white/70">
                  {latest.description}
                </p>
                <span className="mt-6 flex items-center justify-between gap-3 self-stretch rounded-full bg-light py-[7px] pl-6 pr-[7px] text-[15px] font-semibold text-dark transition-colors duration-300 group-hover:bg-[#dfe8ff] md:inline-flex md:self-start md:pl-5">
                  {t("read")}
                  <span className="grid size-9 place-items-center rounded-full bg-accent-strong text-light">
                    <svg aria-hidden viewBox="0 0 20 20" className="size-4">
                      <path
                        d="M4 10h11m-4-4 4 4-4 4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </span>
              </NextLink>
            </div>
          )}
        </div>
      </section>

      <section className="bg-[#f3f6fd] py-14 md:py-20 xl:py-[100px]">
        <div className="container max-w-[1280px]">
          <SectionHead title={t("allTitle")} descr={t("allDescr")} />
          <PublicationsGrid items={items} label={tHome("label")} />
        </div>
      </section>
    </>
  );
};

export default PublicationsPageView;
