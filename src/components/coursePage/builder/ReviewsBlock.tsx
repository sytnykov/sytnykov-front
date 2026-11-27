import { getTranslations } from "next-intl/server";
import Image from "next/image";

import { ReviewsBlock as Reviews, pick } from "@/lib/sanity/types/courseBlocks";
import { cn } from "@/utils/cn";

import LineIcon from "../../homepage/LineIcon";
import SectionHead from "../../homepage/SectionHead";
import { BlockCtx, paragraphs } from "./shared";

const initials = (name = "") =>
  name
    .split(/\s+/)
    .map(w => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

/** 8. Student reviews added in the admin (text, photo, video, source link). */
const ReviewsBlock = async ({
  block,
  ctx,
}: {
  block: Reviews;
  ctx: BlockCtx;
}) => {
  const t = await getTranslations("courseBuilder");
  const reviews = block.reviews ?? [];
  if (!reviews.length) return null;
  const card = ctx.bg === "bg-light" ? "bg-[#f3f6fd]" : "bg-light";

  return (
    <section className={cn("py-14 md:py-20 xl:py-[100px]", ctx.bg)}>
      <div className="container max-w-[1280px]">
        <SectionHead
          title={
            pick(block.title, ctx.locale) || t("defaults.courseReviewsBlock")
          }
        />
        <ul className="-mx-8 flex snap-x snap-mandatory scroll-px-8 gap-3 overflow-x-auto px-8 pb-2 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-2 md:overflow-visible md:px-0 md:pb-0 xl:grid-cols-3 [&::-webkit-scrollbar]:hidden">
          {reviews.map(r => (
            <li
              key={r._key}
              className={cn(
                "flex w-[86%] shrink-0 snap-start flex-col rounded-[24px] p-6 md:w-auto xl:p-7",
                card
              )}
            >
              <LineIcon name="quote" className="size-8 text-accent" />
              <div className="mt-4 flex flex-1 flex-col gap-3 text-[15px] leading-[1.6] text-dark/75">
                {paragraphs(pick(r.text, ctx.locale)).map(p => (
                  <p key={p}>{p}</p>
                ))}
              </div>
              <div className="mt-6 flex items-center gap-3 border-t border-dark/10 pt-5">
                <span className="relative grid size-12 shrink-0 place-items-center overflow-hidden rounded-full bg-dark text-[14px] font-semibold text-accent">
                  {r.photo?.url ? (
                    <Image
                      src={r.photo.url}
                      alt={r.name ?? ""}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  ) : (
                    initials(r.name)
                  )}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[15px] font-semibold leading-[1.25]">
                    {r.name}
                  </span>
                  <span className="block text-[13px] text-dark/60">
                    {pick(r.role, ctx.locale)}
                  </span>
                </span>
              </div>
              {(r.videoUrl || r.sourceUrl) && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {r.videoUrl && (
                    <a
                      href={r.videoUrl}
                      target="_blank"
                      rel="nofollow noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-dark py-2 pl-2 pr-4 text-[13px] font-semibold text-light transition-colors hover:bg-[#13245a]"
                    >
                      <span className="grid size-6 place-items-center rounded-full bg-accent">
                        <LineIcon name="play" className="size-3.5" />
                      </span>
                      {t("videoReview")}
                    </a>
                  )}
                  {r.sourceUrl && (
                    <a
                      href={r.sourceUrl}
                      target="_blank"
                      rel="nofollow noopener noreferrer"
                      className="inline-flex items-center rounded-full border border-dark/15 px-4 py-2 text-[13px] font-semibold transition-colors hover:border-dark"
                    >
                      {t("source")}
                    </a>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ReviewsBlock;
