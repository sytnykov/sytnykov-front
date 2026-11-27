import { getTranslations } from "next-intl/server";

import {
  SchemeItem,
  getProgramScheme,
} from "@/lib/sanity/queries/programScheme";
import { pick } from "@/lib/sanity/types/courseBlocks";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/utils/cn";

import LineIcon, { LineIconName, Rings } from "../homepage/LineIcon";

/*
 * «Правовий конструктор стратегії судового захисту» — the program as a scheme:
 * a main chain with arrows + separate courses. Every block is its own course
 * and opens in a new tab, so «Навчання» stays open (PM requirement).
 */

const u = (uk: string, ru: string) => ({ uk, ru });

/** Structure from the PM's PDF, used until the scheme is filled in the admin. */
const DEFAULT_CHAIN: (SchemeItem & { match?: RegExp })[] = [
  { title: u("Як виграти спір у держави", "Как выиграть спор у государства") },
  {
    title: u(
      "Досудовий порядок вирішення спорів",
      "Досудебный порядок решения споров"
    ),
    match: /досудов/i,
  },
  { title: u("Позовна заява", "Исковое заявление"), match: /позовн/i },
  {
    title: u("Архітектура судового рішення", "Архитектура судебного решения"),
    match: /архітектур/i,
  },
];
const DEFAULT_EXTRAS: (SchemeItem & { match?: RegExp })[] = [
  {
    title: u("Судове мислення", "Судебное мышление"),
    match: /судове мислення/i,
  },
  {
    title: u("Апеляційне оскарження", "Апелляционное обжалование"),
    match: /апеляц/i,
  },
  { title: u("Мистецтво касації", "Искусство кассации"), match: /касац/i },
];

const EXTRA_ICONS: LineIconName[] = [
  "compass",
  "scales",
  "gavel",
  "book",
  "target",
  "search",
];

const Arrow = ({ className }: { className?: string }) => (
  <svg aria-hidden viewBox="0 0 24 24" className={className}>
    <path
      d="M5 12h13m-5-5 5 5-5 5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

type Card = { title: string; note: string; href?: string };

const Block = ({
  card,
  label,
  icon,
  dark,
  open,
  soon,
}: {
  card: Card;
  label: string;
  icon?: LineIconName;
  dark?: boolean;
  open: string;
  soon: string;
}) => {
  const inner = (
    <>
      <div className="flex items-center justify-between gap-3">
        <span
          className={cn(
            "inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[12px] font-semibold",
            dark ? "bg-white/10 text-[#c9d8ff]" : "bg-dark/5 text-dark/60"
          )}
        >
          {icon && <LineIcon name={icon} className="size-4 text-accent" />}
          {label}
        </span>
        {card.href && (
          <span
            className={cn(
              "grid size-9 shrink-0 place-items-center rounded-full transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5",
              dark ? "bg-accent text-light" : "bg-dark text-light"
            )}
          >
            <svg aria-hidden viewBox="0 0 20 20" className="size-4">
              <path
                d="M6 14 14 6m-6.5 0H14v6.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        )}
      </div>
      <p
        className={cn(
          "mt-5 text-balance text-[18px] font-semibold leading-[1.3] md:text-[19px]",
          dark ? "text-light" : "text-dark"
        )}
      >
        {card.title}
      </p>
      {card.note && (
        <p
          className={cn(
            "mt-2 text-[14px] leading-[1.5]",
            dark ? "text-white/60" : "text-dark/60"
          )}
        >
          {card.note}
        </p>
      )}
      <span
        className={cn(
          "mt-auto pt-5 text-[13px] font-semibold",
          card.href
            ? dark
              ? "text-[#9db8ff]"
              : "text-accent-ink"
            : dark
              ? "text-white/40"
              : "text-dark/40"
        )}
      >
        {card.href ? open : soon}
      </span>
    </>
  );

  const base = cn(
    "group flex h-full flex-col rounded-[24px] p-5 xl:min-h-[190px] transition-[transform,box-shadow] duration-500 md:p-6",
    dark
      ? "bg-dark text-light shadow-[0_30px_60px_-30px_rgba(9,17,41,0.8)]"
      : "bg-light shadow-[0_1px_2px_rgba(9,17,41,0.05)]",
    !card.href &&
      !dark &&
      "border border-dashed border-dark/15 bg-light/70 shadow-none",
    card.href &&
      "hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(9,17,41,0.45)]"
  );

  return card.href ? (
    <a href={card.href} target="_blank" rel="noopener" className={base}>
      {inner}
    </a>
  ) : (
    <div className={base}>{inner}</div>
  );
};

const ProgramScheme = async ({ locale }: { locale: string }) => {
  const t = await getTranslations("educationPage.scheme");
  const { scheme, courses } = await getProgramScheme();

  const toCard = (item: SchemeItem & { match?: RegExp }): Card => {
    const matched = item.course?.slug
      ? item.course
      : item.match
        ? courses.find(c => item.match!.test(c.title ?? ""))
        : undefined;
    return {
      title: pick(item.title, locale),
      note: pick(item.note, locale),
      href:
        matched?.slug && matched.category
          ? `/${locale}${ROUTES.EDUCATION}/${matched.category}/${matched.slug}`
          : undefined,
    };
  };

  const chain = (scheme?.chain?.length ? scheme.chain : DEFAULT_CHAIN).map(
    toCard
  );
  const extras = (scheme?.extras?.length ? scheme.extras : DEFAULT_EXTRAS).map(
    toCard
  );
  const labels = { open: t("open"), soon: t("soon") };

  return (
    <section className="relative isolate overflow-hidden bg-light py-14 md:py-20 xl:py-[100px]">
      <div className="container max-w-[1280px]">
        <div className="mb-7 flex flex-col gap-4 md:mb-10 md:gap-5">
          <h2 className="max-w-[1040px] font-micra text-[26px] leading-[1.12] text-dark [word-spacing:-0.18em] md:text-[34px] xl:text-[44px]">
            {pick(scheme?.title, locale) || t("title")}
          </h2>
          <p className="max-w-[640px] text-pretty text-[15px] leading-[1.55] text-dark/65 md:text-[17px]">
            {pick(scheme?.descr, locale) || t("descr")}
          </p>
        </div>

        <div className="relative isolate overflow-hidden rounded-[32px] bg-[#f3f6fd] p-4 md:p-8 xl:p-10">
          <span
            aria-hidden
            className="absolute inset-0 -z-10 bg-[radial-gradient(rgba(9,17,41,0.07)_1px,transparent_1.2px)] [background-size:18px_18px] [mask-image:linear-gradient(180deg,#000_0%,transparent_70%)]"
          />
          <Rings className="pointer-events-none absolute -right-[200px] -top-[220px] -z-10 w-[620px]" />

          {/* main chain */}
          <p className="mb-4 flex items-center gap-2 text-[14px] font-semibold text-dark md:mb-5">
            <span className="grid size-7 place-items-center rounded-full bg-accent text-light">
              <Arrow className="size-4" />
            </span>
            {t("chainLabel")}
          </p>
          <ol className="flex flex-col xl:flex-row xl:items-stretch">
            {chain.map((card, idx) => (
              <li
                key={card.title}
                className="flex flex-col xl:flex-1 xl:flex-row"
              >
                <div className="min-w-0 xl:flex-1">
                  <Block
                    card={card}
                    label={`${t("step")} ${idx + 1}`}
                    dark={idx === 0}
                    {...labels}
                  />
                </div>
                {idx < chain.length - 1 && (
                  <span
                    aria-hidden
                    className="flex items-center justify-center py-2 text-accent xl:px-2 xl:py-0"
                  >
                    <Arrow className="size-7 rotate-90 xl:rotate-0" />
                  </span>
                )}
              </li>
            ))}
          </ol>

          {/* separate courses */}
          <div className="mt-8 border-t border-dashed border-dark/15 pt-6 md:mt-10 md:pt-8">
            <p className="mb-4 flex items-center gap-2 text-[14px] font-semibold text-dark md:mb-5">
              <span className="grid size-7 place-items-center rounded-full bg-dark text-accent">
                <LineIcon name="layers" className="size-4" />
              </span>
              {pick(scheme?.extrasTitle, locale) || t("extrasLabel")}
            </p>
            <ul className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4">
              {extras.map((card, idx) => (
                <li key={card.title}>
                  <Block
                    card={card}
                    label={t("separate")}
                    icon={EXTRA_ICONS[idx % EXTRA_ICONS.length]}
                    {...labels}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProgramScheme;
