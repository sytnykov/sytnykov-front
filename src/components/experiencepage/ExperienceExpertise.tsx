import { getMessages } from "next-intl/server";

import { fadeInAnimation } from "@/helpers/animation";

import Accordion from "../shared/accordion/Accordion";
import { AccordionItem } from "../shared/accordion/type";
import AnimatedWrapper from "../shared/animated/AnimatedWrapper";

const ExperienceExpertise = async () => {
  const messages = await getMessages();

  const expertiseList = messages.experiencePage.expertise
    .expertiseList as AccordionItem[];

  return (
    <section className="relative bg-dark pb-[441px] pt-[52px] text-light xl:h-[796px] xl:pb-[158px] xl:pt-[88px]">
      <AnimatedWrapper
        animation={fadeInAnimation({ x: -50, y: 50, scale: 0.8, delay: 0.5 })}
        className="absolute bottom-0 max-xl:hidden xl:left-0 xl:h-[767px] xl:w-[533px] xl:bg-[url('/images/experiencePage/experience-expertise-person-desk.webp')]"
      />

      <AnimatedWrapper
        animation={fadeInAnimation({ x: 50, y: 50, scale: 0.8, delay: 0.5 })}
        className="absolute bottom-0 h-[478px] w-[676px] bg-[url('/images/experiencePage/experience-expertise-person-mob.webp')] bg-contain max-xl:-right-[70px] xl:hidden"
      />

      <div className="container relative z-[5] max-w-[1280px]">
        <Accordion
          data={expertiseList}
          className="ml-auto max-xl:mx-auto max-xl:max-w-[400px] xl:w-[751px]"
        />
      </div>
    </section>
  );
};

export default ExperienceExpertise;
