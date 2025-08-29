import { getTranslations } from "next-intl/server";

import { fadeInAnimation } from "@/helpers/animation";

import AnimatedWrapper from "../shared/animated/AnimatedWrapper";

const AnnouncementsHero = async () => {
  const t = await getTranslations("announcementsPage.hero");

  return (
    <section className="relative h-[513px] md:h-[528px] md:bg-dark">
      <div className="container -bottom-[258px] left-0 h-[274px] max-w-[1280px] bg-dark text-light max-md:absolute max-md:rounded-2xl md:h-full">
        <div className="flex h-full flex-col justify-between gap-5 pb-9 pt-12 max-md:mx-auto max-md:max-w-[400px] md:ml-auto md:w-[44%] md:justify-between md:pb-12 md:pt-[180px] xl:w-[570px]">
          <div className="flex flex-col gap-4 md:text-right xl:gap-5">
            <AnimatedWrapper
              animation={fadeInAnimation({ x: 50 })}
              viewport={{ once: true, amount: 0 }}
            >
              <h1 className="font-micra text-[22px] uppercase xl:text-[44px]">
                {t("title")}
              </h1>
            </AnimatedWrapper>

            <AnimatedWrapper
              animation={fadeInAnimation({ x: 50, delay: 0.3 })}
              viewport={{ once: true, amount: 0 }}
            >
              <p className="font-micra text-[14px] uppercase max-xl:max-w-[231px] md:ml-auto xl:w-[302px] xl:text-[18px]">
                {t("subtitle")}
              </p>
            </AnimatedWrapper>
          </div>

          <AnimatedWrapper
            animation={fadeInAnimation({ y: 50, delay: 0.5 })}
            viewport={{ once: true, amount: 0 }}
          >
            <p className="max-w-[280px] text-[14px] font-light">{t("descr")}</p>
          </AnimatedWrapper>

          <div className="absolute right-0 top-0 h-[213px] w-[111px] max-md:rounded-2xl max-md:bg-[url('/images/announcementsPage/announcements-hero-decor-mob.webp')] md:hidden" />
        </div>
      </div>

      <div className="absolute left-0 top-0 -z-10 h-full w-full bg-[url('/images/announcementsPage/announcements-hero-person.webp')] bg-cover bg-no-repeat md:z-10 md:w-[50%] md:rounded-r-[20px] xl:w-[627px]" />

      <div className="absolute bottom-0 right-0 h-[307px] w-[567px] max-xl:hidden xl:bg-[url('/images/announcementsPage/announcements-hero-decor-desk.webp')]" />
    </section>
  );
};

export default AnnouncementsHero;
