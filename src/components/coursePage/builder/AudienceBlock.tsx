import { getTranslations } from "next-intl/server";

import {
  AudienceBlock as Audience,
  pick,
} from "@/lib/sanity/types/courseBlocks";
import { cn } from "@/utils/cn";

import LineIcon, { LineIconName, Rings } from "../../homepage/LineIcon";
import SectionHead from "../../homepage/SectionHead";
import { BlockCtx } from "./shared";

const ICONS: LineIconName[] = [
  "briefcase",
  "team",
  "building",
  "search",
  "scales",
  "book",
];

/** 3. Who the course is for + what you lose without it (pains of the audience). */
const AudienceBlock = async ({
  block,
  ctx,
}: {
  block: Audience;
  ctx: BlockCtx;
}) => {
  const t = await getTranslations("courseBuilder");
  const groups = block.groups ?? [];
  const losses = (block.losses ?? [])
    .map(l => pick(l, ctx.locale))
    .filter(Boolean);
  const tile = ctx.bg === "bg-light" ? "bg-[#f3f6fd]" : "bg-light";

  return (
    <section className={cn("py-14 md:py-20 xl:py-[100px]", ctx.bg)}>
      <div className="container max-w-[1280px]">
        <SectionHead
          title={
            pick(block.title, ctx.locale) || t("defaults.courseAudienceBlock")
          }
        />
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-6">
          <ul
            className={cn(
              "grid grid-cols-1 gap-3",
              losses.length
                ? "md:grid-cols-2 lg:col-span-7 lg:grid-cols-1"
                : "md:grid-cols-2 lg:col-span-12 xl:grid-cols-3"
            )}
          >
            {groups.map((g, idx) => (
              <li
                key={g._key}
                className={cn(
                  "flex gap-4 rounded-[22px] p-5",
                  // beside the losses card: one compact row per audience
                  losses.length
                    ? "md:p-5 lg:items-center"
                    : "md:flex-col md:p-6",
                  tile,
                  groups.length % 2 === 1 &&
                    idx === groups.length - 1 &&
                    "md:max-lg:col-span-2"
                )}
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-[14px] bg-accent/10 text-accent">
                  <LineIcon
                    name={ICONS[idx % ICONS.length]}
                    className="size-[22px]"
                  />
                </span>
                <div>
                  <h3 className="text-pretty text-[16px] font-semibold leading-[1.3] md:text-[17px]">
                    {pick(g.title, ctx.locale)}
                  </h3>
                  {g.text && (
                    <p className="mt-2 text-pretty text-[14px] leading-[1.55] text-dark/60">
                      {pick(g.text, ctx.locale)}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>

          {losses.length > 0 && (
            <div className="relative isolate flex flex-col overflow-hidden rounded-[28px] bg-dark p-6 text-light md:p-8 lg:col-span-5">
              <Rings className="absolute -right-[140px] -top-[140px] -z-10 w-[380px]" />
              <h3 className="max-w-[320px] text-[20px] font-semibold leading-[1.25] md:text-[22px]">
                {pick(block.lossesTitle, ctx.locale) || t("defaults.losses")}
              </h3>
              <ul className="mt-6 flex flex-col gap-4 lg:mb-8">
                {losses.map(l => (
                  <li key={l} className="flex items-start gap-3">
                    <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-[#ff6b6b]/15 text-[#ff9090] shadow-[inset_0_0_0_1px_rgba(255,107,107,0.35)]">
                      <LineIcon name="close" className="size-4" />
                    </span>
                    <span className="text-[15px] leading-[1.5] text-white/80">
                      {l}
                    </span>
                  </li>
                ))}
              </ul>
              {ctx.data.sections.some(s => s._type === "coursePackagesBlock") &&
                !ctx.salesClosed && (
                  <a
                    href="#packages"
                    className="mt-8 flex h-[50px] items-center justify-center rounded-full bg-accent-strong px-7 text-[15px] font-semibold shadow-[0_12px_32px_-12px_rgba(81,136,255,0.8)] transition-colors duration-300 hover:bg-[#2f5fe0] lg:mt-auto lg:self-start"
                  >
                    {t("choose")}
                  </a>
                )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AudienceBlock;
