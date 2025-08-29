import { getMessages } from "next-intl/server";
import Image from "next/image";

import { fadeInAnimation } from "@/helpers/animation";

import Accordion from "../shared/accordion/Accordion";
import { AccordionItem } from "../shared/accordion/type";
import AnimatedWrapper from "../shared/animated/AnimatedWrapper";

const ExperienceCareerPath = async () => {
  const messages = await getMessages();

  const careerPathList = messages.experiencePage.careerPath
    .careerPathList as AccordionItem[];

  return (
    <section className="relative pb-[120px] pt-[297px] xl:py-[100px]">
      <div className="container max-w-[1280px]">
        <div className="flex flex-col gap-16 xl:flex-row xl:gap-6">
          <Accordion
            data={careerPathList}
            className="max-xl:mx-auto max-xl:max-w-[400px]"
          />

          <AnimatedWrapper
            animation={fadeInAnimation({ x: 50, delay: 0.5 })}
            className="relative h-[217px] w-full rounded-lg max-xl:mx-auto max-xl:max-w-[400px] xl:h-[424px] xl:w-[578px] xl:shrink-0"
          >
            <Image
              src={
                "/images/experiencePage/experience-careerPath-university.webp"
              }
              fill
              sizes="(max-width: 768px) 400px, 578px"
              className="h-auto rounded-lg object-cover"
              alt="Фото університету"
            />
          </AnimatedWrapper>
        </div>
      </div>

      <div className="absolute -bottom-[160px] right-0 h-[361px] w-[335px] bg-[url('/images/experiencePage/experience-careerPath-decor.webp')] xl:hidden" />
    </section>
  );
};

export default ExperienceCareerPath;
