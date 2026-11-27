import { Fragment } from "react";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

import { Link } from "@/i18n/navigation";
import { APPLICATION } from "@/constants/application";
import { ROUTES } from "@/constants/routes";

import ModalTrigger from "../module/modal/ModalTrigger";
import ButtonOrLink from "../shared/button/ButtonOrLink ";

/** Wraps the accent words of the headline in a coloured span. */
const highlight = (text: string, words: string[]) => {
  if (!words.length) return text;
  const pattern = new RegExp(`(${words.join("|")})`, "g");

  return text.split(pattern).map((part, idx) =>
    words.includes(part) ? (
      <span key={idx} className="text-accent">
        {part}
      </span>
    ) : (
      <Fragment key={idx}>{part}</Fragment>
    )
  );
};

const Arrow = ({ className = "size-4" }: { className?: string }) => (
  <svg aria-hidden viewBox="0 0 20 20" className={className}>
    <path
      d="M4 10h11m-4-4 4 4-4 4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ArrowUpRight = ({ className = "size-4" }: { className?: string }) => (
  <svg aria-hidden viewBox="0 0 20 20" className={className}>
    <path
      d="M6 14 14 6m-6.5 0H14v6.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Rings = () => (
  <svg
    aria-hidden
    viewBox="0 0 800 800"
    className="hero-rings pointer-events-none absolute left-1/2 top-[46%] h-auto w-[155%] -translate-x-1/2 -translate-y-1/2"
  >
    {[392, 330, 270, 212, 158].map((r, idx) => (
      <circle
        key={r}
        cx="400"
        cy="400"
        r={r}
        fill="none"
        stroke="#5188ff"
        strokeOpacity={0.1 + idx * 0.05}
        strokeWidth="1"
      />
    ))}
    <circle
      cx="400"
      cy="400"
      r="330"
      fill="none"
      stroke="#9db8ff"
      strokeOpacity="0.55"
      strokeWidth="1.5"
      strokeDasharray="2 14"
      className="hero-rings__dash"
    />
  </svg>
);

type MiniStat = { number: string; label: string };

const HomeHero = async () => {
  const t = await getTranslations("homepage.hero");

  const steps = t.raw("program.steps") as string[];
  const accentWords = t.raw("titleAccent") as string[];
  const words = t("title").split(/\s+/);
  // 4 balanced lines: "Мислити / як суддя. / Вигравати / в суді."
  const lines = [
    words[0],
    `${words[1]} ${words[2]}`,
    words[3],
    words.slice(4).join(" "),
  ];

  const extraStats = t.raw("bigStat.extra") as MiniStat[];

  const allStats: MiniStat[] = [
    {
      number: `${t("bigStat.number")}${t("bigStat.plus")}`,
      label: t("bigStat.label"),
    },
    ...extraStats,
  ];

  return (
    <section className="relative isolate overflow-hidden bg-dark text-light">
      {/* atmosphere */}
      <div
        aria-hidden
        className="absolute inset-0 -z-20 bg-[radial-gradient(70%_45%_at_50%_62%,rgba(81,136,255,0.38)_0%,rgba(9,17,41,0)_70%),radial-gradient(35%_45%_at_0%_100%,rgba(0,28,88,0.9)_0%,rgba(9,17,41,0)_100%)] md:bg-[radial-gradient(45%_60%_at_72%_50%,rgba(81,136,255,0.40)_0%,rgba(9,17,41,0)_70%),radial-gradient(35%_45%_at_0%_100%,rgba(0,28,88,0.9)_0%,rgba(9,17,41,0)_100%)] xl:bg-[radial-gradient(42%_58%_at_53%_45%,rgba(81,136,255,0.42)_0%,rgba(9,17,41,0)_70%),radial-gradient(35%_45%_at_0%_100%,rgba(0,28,88,0.9)_0%,rgba(9,17,41,0)_100%),radial-gradient(30%_40%_at_100%_0%,rgba(0,28,88,0.7)_0%,rgba(9,17,41,0)_100%)]"
      />

      <div className="container relative grid max-w-[1280px] grid-cols-1 pb-8 pt-[92px] md:grid-cols-2 md:gap-x-8 md:pb-14 md:pt-[120px] lg:gap-x-12 xl:block xl:h-[min(100svh,900px)] xl:min-h-[850px] xl:pb-0 xl:pt-0">
        {/* ── headline + actions ── */}
        <div className="relative z-20 md:col-start-1 md:row-start-1 md:self-center xl:absolute xl:left-[50px] xl:top-[178px] xl:z-0 xl:w-[520px]">
          {/* readability halo under the copy */}
          <div
            aria-hidden
            className="pointer-events-none absolute -left-[12%] -top-[14%] -z-10 h-[128%] w-[128%] rounded-[50%] bg-dark/75 blur-[56px] max-xl:hidden"
          />
          <h1>
            <span className="block font-micra text-[clamp(31px,9.4vw,44px)] leading-[1.06] [word-spacing:-0.22em] md:text-[clamp(40px,5.4vw,56px)] xl:text-[64px] xl:leading-[1.05]">
              {lines.map(line => (
                <span key={line} className="block whitespace-nowrap">
                  {highlight(line, accentWords)}
                </span>
              ))}
            </span>
            <span className="mt-4 block max-w-[440px] text-pretty text-[14px] font-medium leading-[1.45] text-[#c9d8ff] sm:text-[15px] md:mt-5 md:text-[16px] lg:text-[17px] xl:mt-6 xl:max-w-[430px]">
              {t("titleSeo")}
            </span>
          </h1>

          <div className="mt-5 flex flex-col gap-2.5 sm:max-w-[400px] md:mt-6 md:gap-3 lg:flex-row xl:mt-7 xl:max-w-none">
            <ButtonOrLink
              href={ROUTES.EDUCATION}
              variant="accent"
              className="h-[50px] py-0 text-[15px] font-semibold md:h-[52px] lg:w-[200px]"
            >
              {t("button")}
              <Arrow className="ml-2 size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </ButtonOrLink>

            <ModalTrigger
              variant="consultation"
              buttonVariant="transparent"
              buttonClassName="h-[50px] py-0 text-[15px] md:h-[52px] lg:w-[240px] border-white/35 hover:border-white"
              messageFrom={APPLICATION.CONSULTATION}
            />
          </div>
        </div>

        {/* ── portrait stage ── */}
        <div className="relative z-10 mx-auto mt-7 w-full max-w-[400px] md:col-start-2 md:row-span-2 md:row-start-1 md:mt-0 md:max-w-none md:self-end xl:absolute xl:bottom-0 xl:left-1/2 xl:aspect-[628/832] xl:h-[90%] xl:w-auto xl:-translate-x-[38%]">
          <div className="relative mx-auto aspect-[1/1.05] w-full md:aspect-[628/832] xl:absolute xl:inset-0 xl:w-full">
            <Rings />
            <div className="hero-portrait absolute inset-0 [mask-image:linear-gradient(to_bottom,#000_70%,transparent_98%)] md:[mask-image:linear-gradient(to_bottom,#000_64%,transparent_96%)] xl:[mask-image:linear-gradient(to_bottom,#000_70%,transparent_100%)]">
              <Image
                src="/images/homepage/home-hero-person-hq.webp"
                alt={t("signature.name")}
                fill
                sizes="(min-width: 1280px) 640px, (min-width: 768px) 45vw, 360px"
                className="origin-[50%_8%] scale-[1.42] object-cover object-[50%_6%] md:scale-100 md:object-contain md:object-bottom"
                priority
                fetchPriority="high"
                quality={85}
              />
            </div>
          </div>

          {/* proof strip laid over the portrait (phone + tablet) */}
          <dl className="relative z-10 -mt-[16%] grid grid-cols-3 rounded-[18px] border border-white/10 bg-[#0d1838]/85 px-1 py-3 backdrop-blur-md md:-mt-[22%] md:px-2 md:py-4 xl:hidden">
            {allStats.map(({ number, label }, idx) => (
              <div
                key={label}
                className={
                  idx > 0
                    ? "border-l border-white/10 px-2 text-center"
                    : "px-2 text-center"
                }
              >
                <dt className="sr-only">{label}</dt>
                <dd className="whitespace-nowrap text-[18px] font-semibold tabular-nums leading-none tracking-[-0.03em] sm:text-[20px] md:text-[24px]">
                  {idx === 0 ? (
                    <>
                      {t("bigStat.number")}
                      <span className="text-accent">{t("bigStat.plus")}</span>
                    </>
                  ) : (
                    number
                  )}
                </dd>
                <dd className="mt-1 text-[11px] leading-[1.25] text-white/60 md:mt-1.5 md:text-[12px]">
                  {label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* ── authored programme (floating, top-right on desktop) ── */}
        <Link
          href={ROUTES.EDUCATION}
          className="group relative z-20 order-4 mt-2.5 block rounded-[18px] border border-white/10 bg-[#0d1838]/90 p-4 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.8)] backdrop-blur-md transition-colors duration-300 hover:border-accent/70 md:order-none md:col-span-2 md:row-start-3 md:mt-6 md:rounded-[20px] md:p-5 xl:absolute xl:right-[50px] xl:top-[178px] xl:mt-0 xl:w-[290px]"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[12px] font-medium text-accent">
                {t("program.label")}
              </p>
              <p className="mt-1 text-balance text-[15px] font-semibold leading-[1.3] md:mt-1.5 md:text-[17px] xl:text-[15px]">
                {t("program.title")}
              </p>
              <p className="mt-1 text-[13px] leading-[1.4] text-white/65 md:hidden">
                {t("program.summary")}
              </p>
            </div>
            <span className="grid size-9 shrink-0 place-items-center rounded-full bg-white/10 transition-colors duration-300 group-hover:bg-accent">
              <ArrowUpRight />
            </span>
          </div>
          <ol className="mt-4 hidden gap-y-2.5 border-t border-white/10 pt-4 md:grid md:grid-cols-2 md:gap-x-6 lg:grid-cols-4 xl:grid-cols-1">
            {steps.map((step, idx) => (
              <li
                key={step}
                className="flex items-center gap-3 text-[13px] leading-[1.3] text-white/80"
              >
                <span className="grid size-6 shrink-0 place-items-center rounded-full border border-accent/60 text-[11px] font-semibold tabular-nums text-accent">
                  {idx + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </Link>

        {/* ── who he is (bottom-left) ── */}
        <Link
          href={ROUTES.EXPERIENCE}
          className="group relative z-20 order-3 mt-2.5 flex items-center gap-3 rounded-[18px] border border-white/10 bg-[#0d1838]/85 p-2.5 backdrop-blur-md transition-colors duration-300 hover:border-accent/60 md:order-none md:col-start-1 md:row-start-2 md:mt-8 md:gap-4 md:self-end md:rounded-[20px] md:p-3 xl:absolute xl:bottom-10 xl:left-[50px] xl:mt-0 xl:w-[480px]"
        >
          <div className="relative size-[68px] shrink-0 overflow-hidden rounded-[12px] bg-[radial-gradient(90%_90%_at_50%_20%,#3a6be0_0%,#13245a_70%)] md:size-[104px] md:rounded-[14px] xl:size-[130px]">
            <Image
              src="/images/homepage/home-hero-card-portrait.webp"
              alt={t("card.imgAlt")}
              fill
              sizes="130px"
              className="object-cover object-top"
              priority
            />
            <span className="absolute right-1.5 top-1.5 hidden size-7 place-items-center rounded-full bg-light text-dark transition-colors duration-300 group-hover:bg-accent group-hover:text-light md:grid">
              <ArrowUpRight className="size-3.5" />
            </span>
          </div>
          <div className="min-w-0 flex-1 pr-2">
            <p className="text-[15px] font-semibold leading-[1.2] tracking-[-0.01em] md:text-[17px] xl:text-[19px]">
              {t("card.title")}
            </p>
            <p className="mt-1 text-[13px] leading-[1.4] text-white/65 md:hidden">
              {t("card.short")}
            </p>
            <p className="mt-1.5 hidden text-pretty text-[13px] leading-[1.45] text-white/65 md:block xl:mt-2 xl:text-[14px]">
              {t("card.text")}
            </p>
          </div>
          <span className="grid size-9 shrink-0 place-items-center rounded-full bg-white/10 transition-colors duration-300 group-hover:bg-accent md:hidden">
            <ArrowUpRight />
          </span>
        </Link>

        {/* ── proof (bottom-right, desktop) ── */}
        <div className="absolute bottom-10 right-[50px] z-20 hidden w-[320px] rounded-[20px] border border-white/10 bg-[#0d1838]/85 px-5 py-[18px] backdrop-blur-md xl:block">
          <div className="flex items-end justify-between gap-3">
            <p className="whitespace-nowrap text-[46px] font-semibold tabular-nums leading-[0.9] tracking-[-0.04em]">
              {t("bigStat.number")}
              <span className="text-accent">{t("bigStat.plus")}</span>
            </p>
            <p className="pb-1 text-right text-[13px] leading-[1.25] text-white/65">
              {t("bigStat.label")}
            </p>
          </div>
          <dl className="mt-4 grid grid-cols-2 border-t border-white/10 pt-4">
            {extraStats.map(({ number, label }, idx) => (
              <div
                key={label}
                className={idx > 0 ? "border-l border-white/10 pl-4" : ""}
              >
                <dt className="sr-only">{label}</dt>
                <dd className="text-[22px] font-semibold tabular-nums leading-none tracking-[-0.02em]">
                  {number}
                </dd>
                <dd className="mt-1.5 text-[12px] text-white/60">{label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
