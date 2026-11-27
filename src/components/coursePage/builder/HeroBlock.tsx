import { getTranslations } from "next-intl/server";
import Image from "next/image";

import { HeroBlock as Hero, pick } from "@/lib/sanity/types/courseBlocks";
import { APPLICATION } from "@/constants/application";

import LineIcon, { LineIconName, Rings } from "../../homepage/LineIcon";
import ModalTrigger from "../../module/modal/ModalTrigger";
import { BlockCtx, formatPrice } from "./shared";

const FALLBACK_IMAGE = "/images/homepage/courses/appeal.webp";

/** 1. First screen: title, promised result, key facts, payment visible at once. */
const HeroBlock = async ({ block, ctx }: { block?: Hero; ctx: BlockCtx }) => {
  const t = await getTranslations("courseBuilder");
  const { locale, data, salesClosed, courseTitle } = ctx;
  const hasPackages = data.sections.some(
    s => s._type === "coursePackagesBlock"
  );
  const priceFrom =
    block?.priceFrom ??
    Math.min(
      ...data.sections
        .flatMap(s =>
          s._type === "coursePackagesBlock" ? (s.packages ?? []) : []
        )
        .map(p => p.price ?? Infinity)
    );

  const facts: { icon: LineIconName; label: string; value: string }[] = [
    {
      icon: "calendar",
      label: t("start"),
      value: pick(block?.startLabel, locale),
    },
    {
      icon: "clock",
      label: t("duration"),
      value: pick(block?.duration, locale),
    },
    { icon: "monitor", label: t("format"), value: pick(block?.format, locale) },
  ].filter(f => f.value) as {
    icon: LineIconName;
    label: string;
    value: string;
  }[];

  const image = block?.image?.url || data.mainImage?.url || FALLBACK_IMAGE;
  const trainerName =
    pick(data.trainer?.name, locale) || t("trainerFallback.name");
  const subtitle =
    pick(block?.subtitle, locale) || pick(data.description, locale);

  return (
    <section className="relative isolate overflow-hidden bg-dark text-light">
      <div
        aria-hidden
        className="absolute inset-0 -z-20 bg-[radial-gradient(45%_60%_at_78%_40%,rgba(81,136,255,0.34)_0%,rgba(9,17,41,0)_70%),radial-gradient(35%_45%_at_0%_100%,rgba(0,28,88,0.9)_0%,rgba(9,17,41,0)_100%)]"
      />
      <span
        aria-hidden
        className="absolute inset-0 -z-20 bg-[radial-gradient(rgba(255,255,255,0.07)_1px,transparent_1.2px)] [background-size:18px_18px] [mask-image:linear-gradient(160deg,#000_0%,transparent_45%)]"
      />

      <div className="container grid max-w-[1280px] grid-cols-1 gap-8 pb-12 pt-[104px] md:grid-cols-12 md:pb-16 md:pt-[132px] xl:gap-12 xl:pb-[72px] xl:pt-[150px]">
        <div className="min-w-0 md:col-span-7 md:self-center">
          {data.category?.title && (
            <span className="inline-flex items-center gap-2 rounded-full bg-white/[0.08] px-3.5 py-1.5 text-[13px] font-medium text-[#c9d8ff] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.14)]">
              <LineIcon name="book" className="size-4 text-accent" />
              {pick(data.category.title, locale)}
            </span>
          )}
          <h1 className="mt-5 text-balance font-micra text-[clamp(24px,7vw,32px)] uppercase leading-[1.12] [word-spacing:-0.2em] md:text-[34px] xl:text-[42px] xl:leading-[1.08]">
            {courseTitle}
          </h1>
          {subtitle && (
            <p className="mt-4 max-w-[560px] text-pretty text-[15px] font-medium leading-[1.5] text-[#c9d8ff] md:mt-5 md:text-[17px]">
              {subtitle}
            </p>
          )}

          {facts.length > 0 && (
            <ul className="mt-6 grid grid-cols-1 gap-2 md:mt-8 md:grid-cols-3 md:gap-2.5">
              {facts.map(f => (
                <li
                  key={f.label}
                  className="flex items-center gap-3 rounded-[16px] bg-white/[0.05] p-2.5 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)] md:rounded-[18px] md:p-3"
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-[12px] bg-accent/15 text-accent shadow-[inset_0_0_0_1px_rgba(81,136,255,0.35)]">
                    <LineIcon name={f.icon} className="size-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[12px] text-white/55">
                      {f.label}
                    </span>
                    <span className="block text-[14px] font-semibold leading-[1.3]">
                      {f.value}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-7 flex flex-col gap-3 md:mt-8 lg:flex-row lg:items-center">
            {salesClosed || !hasPackages ? (
              <ModalTrigger
                variant="course"
                course={courseTitle}
                buttonVariant="accent"
                label={salesClosed ? t("nextFlow") : t("apply")}
                buttonClassName="h-[50px] py-0 px-7 text-[15px] font-semibold lg:w-auto"
                messageFrom={APPLICATION.COURSE}
              />
            ) : (
              <a
                href="#packages"
                className="flex h-[50px] items-center justify-center gap-2 rounded-full bg-accent-strong px-7 text-[15px] font-semibold shadow-[0_12px_32px_-12px_rgba(81,136,255,0.8)] transition-colors duration-300 hover:bg-[#2f5fe0]"
              >
                {t("choose")}
                {Number.isFinite(priceFrom) && (
                  <span className="font-medium text-white/80">
                    · {t("from")} {formatPrice(priceFrom)} {t("uah")}
                  </span>
                )}
              </a>
            )}
            {!salesClosed && hasPackages && (
              <ModalTrigger
                variant="course"
                course={courseTitle}
                buttonVariant="transparent"
                label={t("apply")}
                buttonClassName="h-[50px] py-0 px-7 text-[15px] font-semibold border-white/25 lg:w-auto"
                messageFrom={APPLICATION.COURSE}
              />
            )}
          </div>
          {salesClosed && (
            <p className="mt-3 max-w-[460px] text-[13px] text-white/55">
              {t("nextFlowNote")}
            </p>
          )}
        </div>

        <div className="relative md:col-span-5">
          <Rings className="pointer-events-none absolute -right-[38%] top-1/2 -z-10 w-[150%] -translate-y-1/2" />
          <div className="relative isolate h-[360px] overflow-hidden rounded-[28px] shadow-[0_40px_80px_-40px_rgba(0,0,0,0.9)] ring-1 ring-white/10 sm:h-[440px] md:h-full md:min-h-[460px]">
            <Image
              src={image}
              alt={courseTitle}
              fill
              priority
              sizes="(min-width: 1280px) 460px, (min-width: 768px) 40vw, 92vw"
              className="object-cover"
            />
            <span
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-[45%] bg-[linear-gradient(0deg,rgba(9,17,41,0.85)_0%,rgba(9,17,41,0)_100%)]"
            />
            <div className="absolute inset-x-4 bottom-4 flex items-center gap-3 rounded-[18px] bg-light p-2.5 pr-4 text-dark shadow-[0_20px_40px_-20px_rgba(0,0,0,0.6)] md:inset-x-5 md:bottom-5">
              <span className="relative size-11 shrink-0 overflow-hidden rounded-full bg-dark">
                <Image
                  src={
                    data.trainer?.photo?.url ||
                    "/images/homepage/home-hero-card-portrait.webp"
                  }
                  alt={trainerName}
                  fill
                  sizes="44px"
                  className="object-cover object-top"
                />
              </span>
              <span className="min-w-0">
                <span className="block text-[12px] text-dark/60">
                  {t("ledBy")}
                </span>
                <span className="block text-[15px] font-semibold leading-[1.2]">
                  {trainerName}
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBlock;
