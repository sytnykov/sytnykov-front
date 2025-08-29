import { getTranslations } from "next-intl/server";
import Image from "next/image";

import { fadeInAnimation } from "@/helpers/animation";

import AnimatedWrapper from "../shared/animated/AnimatedWrapper";

const ExperienceHero = async () => {
  const t = await getTranslations("experiencePage.hero");

  return (
    <section className="relative bg-[linear-gradient(153.1deg,_#FFFFFF_16.83%,_#C0D4FF_172.17%)] pb-[99px] pt-[124px] md:h-[528px] xl:overflow-hidden xl:pt-[136px]">
      <div className="container max-md:max-w-[462px] md:max-w-[1280px] xl:relative xl:h-full">
        <div className="max-md:mr-auto max-md:max-w-[190px]">
          <AnimatedWrapper
            viewport={{ once: true, amount: 0 }}
            animation={fadeInAnimation({ y: -50 })}
          >
            <h1 className="mb-7 font-micra text-[24px] max-xl:leading-[1.6] max-md:mx-auto max-md:max-w-[400px] md:mb-8 md:text-[32px] xl:text-[48px]">
              {t.rich("titlePlain", {
                span: chunks => (
                  <span className="text-[#00279D]">{chunks}</span>
                ),
              })}
            </h1>
          </AnimatedWrapper>

          <AnimatedWrapper
            viewport={{ once: true, amount: 0 }}
            animation={fadeInAnimation({ x: 50 })}
            className="md:w-[374px] xl:ml-auto"
          >
            <div>
              <p className="font-light max-md:text-[13px]">{t("descr")}</p>
            </div>
          </AnimatedWrapper>
        </div>

        <div className="absolute z-[5] h-[221px] w-full max-w-[400px] max-xl:-bottom-[177px] max-xl:left-1/2 max-xl:-translate-x-1/2 md:h-[301px] md:max-w-[829px] xl:-bottom-[99px] xl:left-0">
          <AnimatedWrapper
            viewport={{ once: true, amount: 0 }}
            animation={fadeInAnimation({ y: 50, delay: 0.5 })}
            className="h-full w-full"
          >
            <Image
              src="/images/experiencePage/experience-hero-photo.webp"
              fill
              sizes="(max-width: 768px) 400px, 829px"
              alt={t("imgAlt")}
              className="object-cover max-xl:rounded-b-3xl xl:rounded-r-xl"
            />
          </AnimatedWrapper>

          <AnimatedWrapper
            viewport={{ amount: 0 }}
            animation={fadeInAnimation({ y: 50, delay: 0.5 })}
            className="absolute -bottom-[22px] -right-[100px] -z-[1] h-[328px] w-[426px] max-xl:hidden xl:bg-[url('/images/experiencePage/experience-hero-leftDecor-desk.webp')]"
          />
        </div>
      </div>

      <div className="absolute bottom-0 right-0 h-[410px] w-[156px] bg-[url('/images/experiencePage/experience-hero-decor-mob.webp')] xl:h-[253px] xl:w-[230px] xl:bg-[url('/images/experiencePage/experience-hero-rightDecor-desk.webp')]" />
    </section>
  );
};

export default ExperienceHero;
