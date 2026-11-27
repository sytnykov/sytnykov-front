import { getTranslations } from "next-intl/server";

import { FormatBlock as Format, pick } from "@/lib/sanity/types/courseBlocks";
import { cn } from "@/utils/cn";

import LineIcon, { LineIconName, Rings } from "../../homepage/LineIcon";
import SectionHead from "../../homepage/SectionHead";
import { BlockCtx } from "./shared";

const ICONS: LineIconName[] = [
  "monitor",
  "calendar",
  "document",
  "clock",
  "chat",
  "book",
];

/** 6. Format: number tiles + a dark «support and bonuses» card. */
const FormatBlock = async ({
  block,
  ctx,
}: {
  block: Format;
  ctx: BlockCtx;
}) => {
  const t = await getTranslations("courseBuilder");
  const { locale } = ctx;
  const facts = block.facts ?? [];
  const features = (block.features ?? [])
    .map(f => pick(f, locale))
    .filter(Boolean);
  const hero = ctx.data.sections.find(s => s._type === "courseHeroBlock");
  const formatLabel =
    hero && hero._type === "courseHeroBlock" ? pick(hero.format, locale) : "";
  const tile = ctx.bg === "bg-light" ? "bg-[#f3f6fd]" : "bg-light";

  return (
    <section className={cn("py-14 md:py-20 xl:py-[100px]", ctx.bg)}>
      <div className="container max-w-[1280px]">
        <SectionHead
          title={pick(block.title, locale) || t("defaults.courseFormatBlock")}
        />

        <div className="grid grid-cols-1 gap-3 md:gap-4 lg:grid-cols-12">
          {facts.length > 0 && (
            <ul
              className={cn(
                "grid grid-cols-2 gap-3 md:gap-4",
                features.length
                  ? "lg:col-span-7"
                  : "lg:col-span-12 lg:grid-cols-4"
              )}
            >
              {facts.map((f, idx) => (
                <li
                  key={f._key}
                  className={cn(
                    "relative isolate flex min-h-[170px] flex-col justify-between overflow-hidden rounded-[24px] p-5 md:min-h-[200px] md:p-6",
                    tile
                  )}
                >
                  {/* brand ring detail in the corner */}
                  <svg
                    aria-hidden
                    viewBox="0 0 120 120"
                    className="absolute -right-8 -top-8 -z-10 size-[130px] text-accent"
                  >
                    <circle
                      cx="60"
                      cy="60"
                      r="58"
                      fill="none"
                      stroke="currentColor"
                      strokeOpacity="0.12"
                    />
                    <circle
                      cx="60"
                      cy="60"
                      r="42"
                      fill="none"
                      stroke="currentColor"
                      strokeOpacity="0.18"
                      strokeDasharray="2 6"
                    />
                    <circle
                      cx="60"
                      cy="60"
                      r="26"
                      fill="none"
                      stroke="currentColor"
                      strokeOpacity="0.1"
                    />
                  </svg>
                  <span className="grid size-11 place-items-center rounded-full bg-dark text-accent">
                    <LineIcon
                      name={ICONS[idx % ICONS.length]}
                      className="size-[22px]"
                    />
                  </span>
                  <span className="mt-6 block">
                    <span className="block font-micra text-[34px] leading-none text-dark md:text-[44px]">
                      {f.value}
                    </span>
                    <span className="mt-2.5 block text-[13px] font-medium leading-[1.4] text-dark/60 md:text-[15px]">
                      {pick(f.label, locale)}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          )}

          {features.length > 0 && (
            <div
              className={cn(
                "relative isolate flex flex-col overflow-hidden rounded-[28px] bg-dark p-6 text-light md:p-8",
                facts.length ? "lg:col-span-5" : "lg:col-span-12"
              )}
            >
              <Rings className="absolute -bottom-[180px] -right-[160px] -z-10 w-[460px]" />
              <span
                aria-hidden
                className="absolute -left-[20%] -top-[30%] -z-10 size-[70%] rounded-full bg-accent/25 blur-[80px]"
              />
              <span className="grid size-12 place-items-center rounded-full bg-accent text-light shadow-[0_12px_28px_-10px_rgba(81,136,255,0.9)]">
                <LineIcon name="shield" className="size-[22px]" />
              </span>
              <h3 className="mt-5 text-[20px] font-semibold leading-[1.25] md:text-[22px]">
                {t("formatBonuses")}
              </h3>
              <ul className="mt-5 flex flex-col gap-3.5">
                {features.map(f => (
                  <li
                    key={f}
                    className="flex items-start gap-3 text-[15px] leading-[1.45] text-white/85"
                  >
                    <span className="mt-[1px] grid size-6 shrink-0 place-items-center rounded-full bg-[#22b573] text-light">
                      <LineIcon name="check" className="size-3.5" />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              {formatLabel && (
                <span className="mt-8 inline-flex items-center gap-2 self-start rounded-full bg-white/[0.08] px-4 py-2.5 text-[14px] font-medium shadow-[inset_0_0_0_1px_rgba(255,255,255,0.14)] lg:mt-auto">
                  <LineIcon name="monitor" className="size-4 text-accent" />
                  {formatLabel}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FormatBlock;
