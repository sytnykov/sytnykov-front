import { getTranslations } from "next-intl/server";

import { FaqBlock as Faq, pick } from "@/lib/sanity/types/courseBlocks";
import { APPLICATION } from "@/constants/application";
import { cn } from "@/utils/cn";

import LineIcon, { Rings } from "../../homepage/LineIcon";
import SectionHead from "../../homepage/SectionHead";
import ModalTrigger from "../../module/modal/ModalTrigger";
import JsonLd from "../../seo/JsonLd";
import { BlockCtx } from "./shared";

/** 9. FAQ — answers to objections, under the reviews. */
const FaqBlock = async ({ block, ctx }: { block: Faq; ctx: BlockCtx }) => {
  const t = await getTranslations("courseBuilder");
  const items = (block.items ?? []).map(i => ({
    key: i._key,
    q: pick(i.question, ctx.locale),
    a: pick(i.answer, ctx.locale),
  }));
  if (!items.length) return null;
  const closed = ctx.bg === "bg-light" ? "bg-[#f3f6fd]" : "bg-light";

  return (
    <section className={cn("py-14 md:py-20 xl:py-[100px]", ctx.bg)}>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: items.map(i => ({
            "@type": "Question",
            name: i.q,
            acceptedAnswer: { "@type": "Answer", text: i.a },
          })),
        }}
      />
      <div className="container grid max-w-[1280px] grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
        <div className="contents lg:col-span-5 lg:block">
          <SectionHead
            title={
              pick(block.title, ctx.locale) || t("defaults.courseFaqBlock")
            }
            className="max-lg:mb-0"
          />
          <div className="relative isolate order-3 overflow-hidden rounded-[24px] bg-dark p-6 text-light md:p-7 lg:order-none">
            <Rings className="absolute -right-[120px] -top-[120px] -z-10 w-[340px]" />
            <span className="grid size-12 place-items-center rounded-full bg-accent/15 text-accent shadow-[inset_0_0_0_1px_rgba(81,136,255,0.35)]">
              <LineIcon name="chat" className="size-[22px]" />
            </span>
            <p className="mt-5 text-[18px] font-semibold leading-[1.3]">
              {t("faqMore")}
            </p>
            <p className="mt-2 text-[14px] leading-[1.55] text-white/65">
              {t("finalText")}
            </p>
            <div className="mt-6">
              <ModalTrigger
                variant="course"
                course={ctx.courseTitle}
                buttonVariant="accent"
                label={t("apply")}
                buttonClassName="h-[50px] py-0 text-[15px] font-semibold"
                messageFrom={APPLICATION.COURSE}
              />
            </div>
          </div>
        </div>
        <div className="order-2 flex flex-col gap-2.5 lg:order-none lg:col-span-7">
          {items.map((i, idx) => (
            <details
              key={i.key}
              open={idx === 0}
              className={cn(
                "group rounded-[22px] transition-colors duration-300 open:bg-white open:shadow-[0_18px_40px_-26px_rgba(9,17,41,0.35),inset_0_0_0_1px_rgba(9,17,41,0.06)]",
                closed
              )}
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 text-[16px] font-semibold leading-[1.35] text-dark md:px-6 md:text-[17px] [&::-webkit-details-marker]:hidden">
                {i.q}
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-white text-dark transition-[transform,background-color,color] duration-300 group-open:rotate-45 group-open:bg-accent-strong group-open:text-light">
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
              <p className="-mt-1 max-w-[620px] whitespace-pre-line text-pretty px-5 pb-5 text-[15px] leading-[1.6] text-dark/65 md:px-6 md:pb-6">
                {i.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqBlock;
