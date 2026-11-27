import { PainsBlock as Pains, pick } from "@/lib/sanity/types/courseBlocks";
import { cn } from "@/utils/cn";

import LineIcon from "../../homepage/LineIcon";
import SectionHead from "../../homepage/SectionHead";
import { BlockCtx } from "./shared";

/**
 * + Pains, fears and objections of the audience: each point with an optional
 * answer from the course. Hidden without a title or points.
 */
const PainsBlock = ({ block, ctx }: { block: Pains; ctx: BlockCtx }) => {
  const title = pick(block.title, ctx.locale);
  const items = (block.items ?? [])
    .map(i => ({
      key: i._key,
      title: pick(i.title, ctx.locale),
      text: pick(i.text, ctx.locale),
    }))
    .filter(i => i.title);
  if (!title || !items.length) return null;
  const tile = ctx.bg === "bg-light" ? "bg-[#f3f6fd]" : "bg-light";

  return (
    <section className={cn("py-14 md:py-20 xl:py-[100px]", ctx.bg)}>
      <div className="container max-w-[1280px]">
        <SectionHead title={title} />
        <ul className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
          {items.map(item => (
            <li
              key={item.key}
              className={cn(
                "flex items-start gap-4 rounded-[22px] p-5 md:p-6",
                tile
              )}
            >
              <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-full bg-[#ff6b6b]/10 text-[#e25555]">
                <LineIcon name="close" className="size-[18px]" />
              </span>
              <div className="min-w-0">
                <h3 className="text-pretty text-[16px] font-semibold leading-[1.35] text-dark [overflow-wrap:anywhere] md:text-[17px]">
                  {item.title}
                </h3>
                {item.text && (
                  <p className="mt-2 flex items-start gap-2 text-[14px] leading-[1.55] text-dark/65 md:text-[15px]">
                    <LineIcon
                      name="check"
                      className="mt-[3px] size-4 shrink-0 text-[#22b573]"
                    />
                    <span>{item.text}</span>
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

export default PainsBlock;
