import { getTranslations } from "next-intl/server";

import { ProgramBlock as Program, pick } from "@/lib/sanity/types/courseBlocks";
import { cn } from "@/utils/cn";

import LineIcon from "../../homepage/LineIcon";
import SectionHead from "../../homepage/SectionHead";
import { BlockCtx } from "./shared";

/** 5. Program: modules → lessons, each lesson with its benefit. */
const ProgramBlock = async ({
  block,
  ctx,
}: {
  block: Program;
  ctx: BlockCtx;
}) => {
  const t = await getTranslations("courseBuilder");
  const modules = block.modules ?? [];
  if (!modules.length) return null;
  const card = ctx.bg === "bg-light" ? "bg-[#f3f6fd]" : "bg-light";

  return (
    <section className={cn("py-14 md:py-20 xl:py-[100px]", ctx.bg)}>
      <div className="container max-w-[1280px]">
        <SectionHead
          title={
            pick(block.title, ctx.locale) || t("defaults.courseProgramBlock")
          }
        />
        <div className="flex flex-col gap-3">
          {modules.map((m, idx) => {
            const lessons = m.lessons ?? [];
            return (
              <details
                key={m._key}
                open={idx === 0}
                className={cn(
                  "group rounded-[24px] transition-shadow duration-300 open:shadow-[0_24px_50px_-30px_rgba(9,17,41,0.35)]",
                  card
                )}
              >
                <summary className="flex cursor-pointer list-none items-center gap-3 p-5 md:gap-5 md:p-6 [&::-webkit-details-marker]:hidden">
                  <span className="grid size-12 shrink-0 place-items-center rounded-full bg-dark font-micra max-md:hidden text-[15px] text-accent group-open:bg-accent-strong group-open:text-light">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[12px] font-medium text-dark/60">
                      {t("module")} {idx + 1} ·{" "}
                      {t("lessons", { count: lessons.length })}
                    </span>
                    <span className="mt-0.5 block text-pretty text-[17px] font-semibold leading-[1.3] md:text-[19px]">
                      {pick(m.title, ctx.locale)}
                    </span>
                  </span>
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-dark/5 text-dark transition-transform duration-300 group-open:rotate-45">
                    <svg aria-hidden viewBox="0 0 20 20" className="size-4">
                      <path
                        d="M10 4v12M4 10h12"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </summary>
                <ol
                  className={cn(
                    "mx-5 mb-5 border-t border-dark/10 md:mx-6 md:mb-6 md:ml-[92px]",
                    !lessons.length && "hidden"
                  )}
                >
                  {lessons.map((l, li) => (
                    <li
                      key={l._key}
                      className="flex gap-4 border-b border-dark/10 py-4 last:border-0 last:pb-0"
                    >
                      <span className="w-8 shrink-0 pt-0.5 text-[13px] font-semibold tabular-nums text-accent-ink">
                        {idx + 1}.{li + 1}
                      </span>
                      <div className="min-w-0">
                        <p className="text-pretty text-[15px] font-semibold leading-[1.4] md:text-[16px]">
                          {pick(l.title, ctx.locale)}
                        </p>
                        {l.benefit && (
                          <p className="mt-1.5 flex items-start gap-2 text-pretty text-[14px] leading-[1.5] text-dark/60">
                            <LineIcon
                              name="target"
                              className="mt-0.5 size-4 shrink-0 text-accent"
                            />
                            {pick(l.benefit, ctx.locale)}
                          </p>
                        )}
                      </div>
                    </li>
                  ))}
                </ol>
                {m.videoUrl && (
                  <div className="mx-5 mb-5 md:mx-6 md:mb-6 md:ml-[92px]">
                    <a
                      href={m.videoUrl}
                      target="_blank"
                      rel="nofollow noopener noreferrer"
                      className="inline-flex items-center gap-2.5 rounded-full bg-dark py-2 pl-2 pr-5 text-[14px] font-semibold text-light transition-colors duration-300 hover:bg-[#13245a]"
                    >
                      <span className="grid size-8 place-items-center rounded-full bg-accent">
                        <LineIcon name="play" className="size-4" />
                      </span>
                      {t("watch")}
                    </a>
                  </div>
                )}
              </details>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProgramBlock;
