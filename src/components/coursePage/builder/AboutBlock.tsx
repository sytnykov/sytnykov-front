import { getTranslations } from "next-intl/server";

import { AboutBlock as About, pick } from "@/lib/sanity/types/courseBlocks";
import { APPLICATION } from "@/constants/application";
import { cn } from "@/utils/cn";

import LineIcon, { LineIconName, Rings } from "../../homepage/LineIcon";
import ModalTrigger from "../../module/modal/ModalTrigger";
import RenderContent from "../../shared/renderContent/RenderContent";
import { BlockCtx } from "./shared";

/** «About the course» for courses made before the constructor: their own text + a key-facts card. */
const AboutBlock = async ({ block, ctx }: { block: About; ctx: BlockCtx }) => {
  const t = await getTranslations("courseBuilder");
  const content = (ctx.locale === "ru" ? block.content?.ru : block.content?.uk)
    ?.length
    ? (ctx.locale === "ru" ? block.content?.ru : block.content?.uk)!
    : (block.content?.uk ?? []);
  if (!content.length) return null;
  const facts = block.facts ?? [];

  return (
    <section className={cn("py-14 md:py-20 xl:py-[100px]", ctx.bg)}>
      <div className="container grid max-w-[1280px] grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="min-w-0 lg:col-span-8">
          <h2 className="mb-7 text-balance font-micra text-[26px] leading-[1.12] [word-spacing:-0.18em] md:mb-9 md:text-[34px] xl:text-[44px]">
            {pick(block.title, ctx.locale) || t("aboutDefault")}
          </h2>
          <div className="flex max-w-[760px] flex-col gap-4 text-[15px] leading-[1.7] text-dark/75 md:text-[17px] [&_h2]:mt-4 [&_h2]:text-[20px] [&_h2]:font-semibold [&_h2]:text-dark [&_h3]:mt-4 [&_h3]:text-[19px] [&_h3]:text-dark [&_h4]:mt-3 [&_h4]:text-[18px] [&_h4]:text-dark [&_li::marker]:text-accent [&_li]:pl-1 [&_span.font-bold]:font-semibold [&_span.font-bold]:text-dark [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-2">
            <RenderContent content={content} />
          </div>
        </div>

        <aside className="lg:col-span-4">
          <div className="relative isolate overflow-hidden rounded-[28px] bg-dark p-6 text-light md:p-7 lg:sticky lg:top-28">
            <Rings className="absolute -right-[130px] -top-[130px] -z-10 w-[360px]" />
            <p className="text-[18px] font-semibold leading-[1.3]">
              {ctx.courseTitle}
            </p>
            {facts.length > 0 && (
              <ul className="mt-5 flex flex-col gap-3">
                {facts.map(f => (
                  <li
                    key={pick(f.label, ctx.locale)}
                    className="flex items-center gap-3 text-[14px] text-white/80"
                  >
                    <span className="grid size-9 shrink-0 place-items-center rounded-full bg-accent/15 text-accent shadow-[inset_0_0_0_1px_rgba(81,136,255,0.35)]">
                      <LineIcon
                        name={f.icon as LineIconName}
                        className="size-[18px]"
                      />
                    </span>
                    {pick(f.label, ctx.locale)}
                  </li>
                ))}
              </ul>
            )}
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
        </aside>
      </div>
    </section>
  );
};

export default AboutBlock;
