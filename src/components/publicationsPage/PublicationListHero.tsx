import { getTranslations } from "next-intl/server";

import { fadeInAnimation } from "@/helpers/animation";

import AnimatedWrapper from "../shared/animated/AnimatedWrapper";

const PublicationListHero = async () => {
  const t = await getTranslations("publicationsPage.hero");

  return (
    <section className="relative h-[562px] md:h-[528px] md:bg-dark">
      <div className="container -bottom-[189px] left-0 max-w-[1280px] bg-dark text-light max-md:absolute max-md:rounded-2xl md:h-full">
        <div className="flex h-full flex-col gap-5 pb-8 pt-12 max-md:mx-auto max-md:max-w-[400px] md:ml-auto md:w-[50%] md:justify-between md:pb-[62px] md:pt-[180px] xl:w-[660px]">
          <AnimatedWrapper animation={fadeInAnimation({ x: 50 })}>
            <h1 className="font-micra text-[22px] uppercase md:text-right xl:text-[44px]">
              {t("title")}
            </h1>
          </AnimatedWrapper>

          <AnimatedWrapper
            animation={fadeInAnimation({ x: -50 })}
            className="flex flex-col gap-8 md:max-w-[387px] md:flex-col-reverse"
          >
            <p className="text-[14px] font-light">{t("descr")}</p>
            <p className="font-micra uppercase leading-[1.3] max-md:text-right xl:text-[18px] xl:leading-[1.22]">
              {t("subtitle")}
            </p>
          </AnimatedWrapper>

          <div className="absolute right-0 top-0 h-[251px] w-[247px] max-md:rounded-2xl max-md:bg-[url('/images/publicationsPage/publications-hero-decor-mob.webp')] md:hidden" />
        </div>
      </div>

      <div className="absolute left-0 top-0 h-[562px] w-full md:h-[528px] md:w-[340px] md:rounded-r-[20px] xl:w-[517px]">
        <div className="absolute left-0 top-0 -z-10 h-full w-full bg-[url('/images/publicationsPage/publications-hero-person.webp')] bg-cover md:z-10" />
        <div className="absolute -left-[120px] top-0 h-[231px] w-[809px] max-md:hidden md:bg-[url('/images/publicationsPage/publications-hero-decor-top-desk.webp')] xl:left-[60px]" />
      </div>

      <div className="absolute bottom-0 right-0 h-[246px] w-[567px] max-md:hidden md:bg-[url('/images/publicationsPage/publications-hero-decor-bot-desk.webp')]" />
    </section>
  );
};

export default PublicationListHero;
