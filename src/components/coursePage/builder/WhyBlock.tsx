import { getTranslations } from "next-intl/server";
import Image from "next/image";

import { WhyBlock as Why, pick } from "@/lib/sanity/types/courseBlocks";
import { cn } from "@/utils/cn";

import LineIcon, { LineIconName } from "../../homepage/LineIcon";
import SectionHead from "../../homepage/SectionHead";
import { BlockCtx } from "./shared";

const ICONS: LineIconName[] = ["gavel", "scales", "ruler", "team", "target"];

/** + What makes the course special / why choose it (PM request). */
const WhyBlock = async ({ block, ctx }: { block: Why; ctx: BlockCtx }) => {
  const t = await getTranslations("courseBuilder");
  const items = block.items ?? [];
  if (!items.length) return null;
  const panel = ctx.bg === "bg-light" ? "bg-[#f3f6fd]" : "bg-light";

  return (
    <section className={cn("py-14 md:py-20 xl:py-[100px]", ctx.bg)}>
      <div className="container grid max-w-[1280px] grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <SectionHead
            title={pick(block.title, ctx.locale) || t("whyDefault")}
            descr={pick(block.lead, ctx.locale)}
            className="md:mb-8"
          />
          {block.image?.url && (
            <div className="relative h-[240px] overflow-hidden rounded-[24px] md:h-[300px]">
              <Image
                src={block.image.url}
                alt=""
                fill
                sizes="(min-width: 1024px) 480px, 92vw"
                className="object-cover"
              />
              <span
                aria-hidden
                className="absolute inset-0 bg-[linear-gradient(0deg,rgba(9,17,41,0.45),rgba(9,17,41,0)_60%)]"
              />
            </div>
          )}
        </div>
        <ol
          className={cn(
            "rounded-[28px] p-2 lg:col-span-7 lg:self-start",
            panel
          )}
        >
          {items.map((item, idx) => (
            <li
              key={item._key}
              className="flex gap-4 rounded-[22px] p-5 transition-colors duration-300 hover:bg-white md:gap-5 md:p-6"
            >
              <span
                className={cn(
                  "grid size-12 shrink-0 place-items-center rounded-full",
                  idx === 0
                    ? "bg-accent text-light shadow-[0_12px_28px_-10px_rgba(81,136,255,0.9)]"
                    : "bg-dark text-accent"
                )}
              >
                <LineIcon
                  name={ICONS[idx % ICONS.length]}
                  className="size-[22px]"
                />
              </span>
              <div className="min-w-0 pt-0.5">
                <h3 className="text-pretty text-[17px] font-semibold leading-[1.3] md:text-[19px]">
                  {pick(item.title, ctx.locale)}
                </h3>
                {item.text && (
                  <p className="mt-1.5 text-pretty text-[14px] leading-[1.55] text-dark/60 md:text-[15px]">
                    {pick(item.text, ctx.locale)}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default WhyBlock;
