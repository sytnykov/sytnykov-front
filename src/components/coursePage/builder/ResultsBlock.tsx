import { getTranslations } from "next-intl/server";

import { ResultsBlock as Results, pick } from "@/lib/sanity/types/courseBlocks";
import { cn } from "@/utils/cn";

import LineIcon, { LineIconName } from "../../homepage/LineIcon";
import SectionHead from "../../homepage/SectionHead";
import { BlockCtx } from "./shared";

const ICONS: LineIconName[] = [
  "target",
  "scales",
  "document",
  "chart",
  "shield",
  "compass",
];

/** 2. Results: 3–5 outcomes that can be checked after the course. */
const ResultsBlock = async ({
  block,
  ctx,
}: {
  block: Results;
  ctx: BlockCtx;
}) => {
  const t = await getTranslations("courseBuilder");
  const items = block.items ?? [];
  if (!items.length) return null;
  const five = items.length === 5;

  return (
    <section className={cn("py-14 md:py-20 xl:py-[100px]", ctx.bg)}>
      <div className="container max-w-[1280px]">
        <SectionHead
          title={
            pick(block.title, ctx.locale) || t("defaults.courseResultsBlock")
          }
        />
        <ul
          className={cn(
            "grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4",
            items.length === 3 && "xl:grid-cols-3",
            five && "xl:grid-cols-6"
          )}
        >
          {items.map((item, idx) => (
            <li
              key={item._key}
              className={cn(
                "flex flex-col gap-5 rounded-[24px] p-6 xl:p-7",
                ctx.bg === "bg-light" ? "bg-[#f3f6fd]" : "bg-light",
                five && (idx < 3 ? "xl:col-span-2" : "xl:col-span-3"),
                five && idx === 4 && "md:col-span-2 xl:col-span-3",
                idx === 0 && "bg-dark text-light"
              )}
            >
              <span
                className={cn(
                  "grid size-12 place-items-center rounded-full",
                  idx === 0 ? "bg-accent text-light" : "bg-dark text-accent"
                )}
              >
                <LineIcon
                  name={ICONS[idx % ICONS.length]}
                  className="size-[22px]"
                />
              </span>
              <div>
                <h3 className="text-pretty text-[17px] font-semibold leading-[1.3] md:text-[19px]">
                  {pick(item.title, ctx.locale)}
                </h3>
                {item.text && (
                  <p
                    className={cn(
                      "mt-2 text-pretty text-[14px] leading-[1.55] md:text-[15px]",
                      idx === 0 ? "text-white/65" : "text-dark/60"
                    )}
                  >
                    {pick(item.text, ctx.locale)}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ResultsBlock;
