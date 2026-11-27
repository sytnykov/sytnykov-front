import { getMessages, getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { ROUTES } from "@/constants/routes";

import LineIcon, { Rings } from "./LineIcon";
import SectionHead, { PillLink } from "./SectionHead";

type ExperienceItem = { title: string; descr: string; result?: string };

const ResultBadge = ({
  children,
  dark,
}: {
  children: string;
  dark?: boolean;
}) => (
  <span
    className={
      dark
        ? "inline-flex items-center gap-1.5 rounded-full bg-[#2fbf71]/15 px-3 py-1.5 text-[12px] font-semibold text-[#6fe3a3] shadow-[inset_0_0_0_1px_rgba(111,227,163,0.35)]"
        : "inline-flex items-center gap-1.5 rounded-full bg-[#e5f6ec] px-3 py-1.5 text-[12px] font-semibold text-[#17734a]"
    }
  >
    <LineIcon name="check" className="size-3.5" />
    {children}
  </span>
);

const HomeExperience = async () => {
  const t = await getTranslations("homepage.experience");
  const messages = await getMessages();
  const list = messages.homepage.experience.experienceList as ExperienceItem[];

  // the decree case is the strongest proof — it leads
  const featuredIdx = Math.max(
    0,
    list.findIndex(i => /Указ/i.test(i.title))
  );
  const featured = list[featuredIdx];
  const rest = list.filter((_, i) => i !== featuredIdx);

  return (
    <section className="relative isolate overflow-hidden bg-light py-14 md:py-20 xl:py-[100px]">
      <div
        aria-hidden
        className="absolute -bottom-[260px] -left-[240px] -z-10 size-[620px] rounded-full bg-[radial-gradient(closest-side,rgba(81,136,255,0.14),rgba(81,136,255,0))]"
      />
      <Rings className="absolute -bottom-[260px] -left-[240px] -z-10 w-[600px] max-md:hidden" />

      <div className="container max-w-[1280px]">
        <SectionHead
          title={t("title")}
          descr={t("descr")}
          action={
            <div className="flex items-center gap-4 max-md:hidden">
              {/* proof badge fills the header like the school badge in courses */}
              <div className="flex items-center gap-3 rounded-full bg-white py-2 pl-2 pr-5 shadow-[0_20px_50px_-28px_rgba(9,17,41,0.45),inset_0_0_0_1px_rgba(9,17,41,0.06)]">
                <span className="relative grid size-[46px] place-items-center rounded-full bg-[linear-gradient(145deg,#13275f,#091129)] text-accent">
                  <LineIcon name="scales" className="size-[22px]" />
                  <span className="absolute -right-0.5 -top-0.5 grid size-[18px] place-items-center rounded-full bg-[#2fbf71] text-light ring-2 ring-white">
                    <LineIcon name="check" className="size-2.5" />
                  </span>
                </span>
                <div>
                  <p className="text-[15px] font-semibold leading-[1.25] text-dark">
                    {t("badgeTitle")}
                  </p>
                  <p className="mt-0.5 text-[13px] text-dark/60">
                    {t("badgeText")}
                  </p>
                </div>
              </div>
              <Link href={ROUTES.EXPERIENCE}>
                <PillLink>{t("button")}</PillLink>
              </Link>
            </div>
          }
        />

        <div className="grid gap-3 md:gap-4 xl:grid-cols-12 xl:gap-5">
          {/* featured case */}
          {featured && (
            <article className="relative isolate flex flex-col justify-between overflow-hidden rounded-[26px] bg-dark p-6 text-light md:p-9 xl:col-span-7 xl:row-span-2">
              <span
                aria-hidden
                className="absolute inset-0 -z-10 bg-[radial-gradient(70%_80%_at_100%_0%,rgba(81,136,255,0.5),rgba(81,136,255,0)_62%)]"
              />
              <Rings className="absolute -right-[170px] -top-[170px] -z-10 w-[480px]" />
              <LineIcon
                name="scales"
                className="absolute right-6 top-6 -z-10 size-[150px] text-accent/25 md:right-10 md:top-10 md:size-[190px]"
              />
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-white/10 px-3 py-1.5 text-[12px] font-medium shadow-[inset_0_0_0_1px_rgba(255,255,255,0.14)]">
                  {t("featured")}
                </span>
                {featured.result && (
                  <ResultBadge dark>{featured.result}</ResultBadge>
                )}
              </div>
              <div className="mt-14 md:mt-32">
                <h3 className="max-w-[520px] text-balance text-[20px] font-semibold leading-[1.2] tracking-[-0.02em] md:text-[26px] xl:text-[30px]">
                  {featured.title}
                </h3>
                <p className="mt-4 max-w-[560px] text-pretty text-[15px] leading-[1.6] text-white/70 md:text-[16px]">
                  {featured.descr}
                </p>
              </div>
            </article>
          )}

          {rest.map(({ title, descr, result }) => (
            <article
              key={title}
              className="group relative isolate overflow-hidden rounded-[24px] bg-[linear-gradient(160deg,#ffffff_35%,#e6edff_140%)] p-6 shadow-[inset_0_0_0_1px_rgba(9,17,41,0.07)] transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[inset_0_0_0_1px_rgba(81,136,255,0.35),0_24px_50px_-30px_rgba(81,136,255,0.7)] md:p-7 xl:col-span-5"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="grid size-11 shrink-0 place-items-center rounded-[14px] bg-[linear-gradient(145deg,#13275f,#091129)] text-accent">
                  <LineIcon name="scales" className="size-[22px]" />
                </span>
                {result && <ResultBadge>{result}</ResultBadge>}
              </div>
              <h3 className="mt-5 text-balance text-[17px] font-semibold leading-[1.3] tracking-[-0.01em] text-dark md:text-[19px]">
                {title}
              </h3>
              <p className="mt-2.5 line-clamp-4 text-pretty text-[14px] leading-[1.6] text-dark/60 md:text-[15px]">
                {descr}
              </p>
            </article>
          ))}
        </div>

        <Link href={ROUTES.EXPERIENCE} className="mt-8 block md:hidden">
          <PillLink>{t("button")}</PillLink>
        </Link>
      </div>
    </section>
  );
};

export default HomeExperience;
