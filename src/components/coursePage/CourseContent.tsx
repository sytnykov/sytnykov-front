import { CourseItem } from "@/lib/sanity/types/courseTypes";
import { Locale } from "@/types/locale";
import { fadeInAnimation } from "@/helpers/animation";

import Accordion from "../shared/accordion/Accordion";
import AnimatedWrapper from "../shared/animated/AnimatedWrapper";
import RenderContent from "../shared/renderContent/RenderContent";

interface ICourseContentProps {
  course: CourseItem;
  lang: Locale;
}

const CourseContent = ({ course, lang }: ICourseContentProps) => {
  const { firstBlock, secondBlock } = course;
  // Courses built in the constructor may have no old-format content at all.
  const firstContent = firstBlock?.content?.[lang] ?? firstBlock?.content?.uk;
  const hasSecond = !!secondBlock?.accordion?.length;
  if (!firstContent?.length && !hasSecond) return null;

  return (
    <section className="py-[120px]">
      <div className="container max-w-[1280px]">
        {firstBlock?.title?.[lang] && (
          <AnimatedWrapper animation={fadeInAnimation({ y: -50 })}>
            <h2 className="mb-10 font-micra text-[22px] uppercase xl:text-[40px] xl:leading-[1.4]">
              {firstBlock.title[lang]}
            </h2>
          </AnimatedWrapper>
        )}

        {!!firstContent?.length && (
          <AnimatedWrapper
            animation={fadeInAnimation({ y: -50, delay: 0.3 })}
            className="flex flex-col gap-6"
          >
            <RenderContent content={firstContent} />
          </AnimatedWrapper>
        )}

        {hasSecond && secondBlock?.title?.[lang] && (
          <AnimatedWrapper animation={fadeInAnimation({ x: 50, delay: 0.5 })}>
            <h2 className="mb-[52px] mt-[120px] font-micra text-[22px] uppercase xl:mb-[40px] xl:text-[40px] xl:leading-[1.4]">
              {secondBlock.title[lang]}
            </h2>
          </AnimatedWrapper>
        )}

        {hasSecond && (
          <Accordion
            data={secondBlock.accordion}
            lang={lang}
            isCourse
            className="gap-4 xl:gap-6"
          />
        )}
      </div>
    </section>
  );
};

export default CourseContent;
