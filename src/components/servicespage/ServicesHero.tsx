import { getTranslations } from "next-intl/server";

import { fadeInAnimation } from "@/helpers/animation";

import AnimatedWrapper from "../shared/animated/AnimatedWrapper";

const ServicesHero = async () => {
  const t = await getTranslations("servicepage.hero");

  return (
    <section className="relative h-[647px] max-md:pt-[120px] md:h-[493px] xl:h-[520px]">
      <div className="container flex h-full max-w-[1280px] flex-col justify-between md:flex-row md:pt-[388px]">
        <AnimatedWrapper animation={fadeInAnimation({ x: -50, delay: 0.4 })}>
          <p className="z-10 max-w-[268px] font-micra uppercase md:w-[250px] md:text-light">
            {t("subtitle")}
          </p>
        </AnimatedWrapper>

        <div className="bg-dark px-[22px] py-8 text-light max-md:-mx-5 max-md:rounded-2xl md:absolute md:right-0 md:top-0 md:h-full md:w-[58%] md:rounded-l-2xl md:text-right">
          <AnimatedWrapper
            animation={fadeInAnimation({ x: 50 })}
            className="top-[156px] max-xl:right-[32px] md:absolute xl:left-[415px]"
          >
            <h1 className="font-micra text-[24px] uppercase md:mb-8 xl:text-[44px]">
              {t("title")}
            </h1>
            <p className="-top-[365px] left-0 text-[12px] font-light max-md:absolute max-md:max-w-[155px] max-md:text-dark md:ml-auto md:w-[240px] md:text-[14px]">
              {t("descr")}
            </p>

            <AnimatedWrapper
              animation={fadeInAnimation({
                scale: 0.8,
                delay: 0.7,
              })}
              className="absolute max-md:hidden md:-left-[410px] md:-top-[152px] md:h-[488px] md:w-[503px] md:bg-[url('/images/servicespage/services-hero-person-desk.webp')] xl:-top-[125px]"
            />
          </AnimatedWrapper>
        </div>
      </div>

      <AnimatedWrapper
        animation={fadeInAnimation({
          x: 50,
          scale: 0.8,
          delay: 0.7,
        })}
        className="absolute -bottom-[40px] right-0 -z-[5] h-[575px] w-[350px] bg-contain max-md:bg-[url('/images/servicespage/services-hero-person-mob.webp')] md:hidden"
      />

      <div className="absolute -z-10 bg-no-repeat max-md:hidden md:left-0 md:top-0 md:h-full md:w-[45%] md:bg-[url('/images/servicespage/services-hero-bg.webp')]" />
    </section>
  );
};

export default ServicesHero;
