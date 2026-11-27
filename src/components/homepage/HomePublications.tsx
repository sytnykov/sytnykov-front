import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { getPaginatedPublications } from "@/lib/sanity/queries/queries";
import { HOME_PUBLICATIONS_PER_PAGE } from "@/constants/pagination";
import { ROUTES } from "@/constants/routes";
import { mapItemToCardProps } from "@/utils/mapItemToCardProps";
import { Locale } from "@/types/locale";

import PublicationTile from "../publications/PublicationTile";
import SectionHead, { PillLink } from "./SectionHead";

const HomePublications = async ({ lang }: { lang: Locale }) => {
  const t = await getTranslations("homepage.publications");

  let items: Awaited<ReturnType<typeof getPaginatedPublications>> = [];
  try {
    items = await getPaginatedPublications(HOME_PUBLICATIONS_PER_PAGE);
  } catch {
    items = [];
  }
  if (items.length === 0) return null;

  return (
    <section className="relative isolate overflow-hidden bg-[#f3f6fd] pb-10 pt-14 md:pb-12 md:pt-20 xl:pb-14 xl:pt-[100px]">
      <div
        aria-hidden
        className="absolute -right-[220px] -top-[240px] -z-10 size-[620px] rounded-full bg-[radial-gradient(closest-side,rgba(81,136,255,0.14),rgba(81,136,255,0))]"
      />
      <svg
        aria-hidden
        viewBox="0 0 600 600"
        className="absolute -right-[220px] -top-[240px] -z-10 w-[600px] max-md:hidden"
      >
        {[290, 230, 170, 110].map((r, i) => (
          <circle
            key={r}
            cx="300"
            cy="300"
            r={r}
            fill="none"
            stroke="#5188ff"
            strokeOpacity={0.1 + i * 0.04}
            strokeDasharray={i === 0 ? "2 7" : undefined}
          />
        ))}
      </svg>

      <div className="container max-w-[1280px]">
        <SectionHead
          title={t("title")}
          descr={t("descr")}
          action={
            <Link href={ROUTES.PUBLICATIONS} className="max-md:hidden">
              <PillLink>{t("button")}</PillLink>
            </Link>
          }
        />

        <ul className="grid gap-3 md:grid-cols-2 md:gap-5 xl:grid-cols-3">
          {items.map(item => {
            const { title, description, info, href } = mapItemToCardProps(
              item,
              lang
            );
            return (
              <li key={title}>
                <PublicationTile
                  href={href ?? `/${lang}${ROUTES.PUBLICATIONS}`}
                  title={title}
                  description={description}
                  info={info}
                  label={t("label")}
                />
              </li>
            );
          })}
        </ul>

        <Link href={ROUTES.PUBLICATIONS} className="mt-8 block md:hidden">
          <PillLink>{t("button")}</PillLink>
        </Link>
      </div>
    </section>
  );
};

export default HomePublications;
