import { getTranslations } from "next-intl/server";

import { fadeInAnimation } from "@/helpers/animation";

import AnimatedWrapper from "../shared/animated/AnimatedWrapper";

const GalleryHero = async () => {
  const t = await getTranslations("galleryPage.hero");

  return (
    <section className="relative max-md:rounded-b-2xl max-md:pt-[507px]">
      <div className="flex h-[207px] w-full max-w-[1280px] flex-col justify-center bg-dark px-8 text-light max-md:mx-auto max-md:rounded-2xl md:ml-auto md:flex md:h-[440px] md:w-[58%] md:flex-col-reverse md:justify-between md:rounded-l-2xl md:px-[50px] md:pb-12 md:pl-[154px] md:pt-[125px] xl:h-[520px]">
        <AnimatedWrapper animation={fadeInAnimation({ x: 50 })}>
          <div className="max-w-[400px] max-md:mx-auto md:ml-auto md:text-right xl:max-w-[465px]">
            <h1 className="mb-4 font-micra text-[22px] uppercase xl:text-[44px]">
              {t("title")}
            </h1>
            <p className="-top-[426px] left-0 font-micra uppercase leading-[1.3] max-md:absolute max-md:max-w-[400px] xl:text-[18px]">
              {t("subtitle")}
            </p>
          </div>
        </AnimatedWrapper>

        <AnimatedWrapper animation={fadeInAnimation({ x: -50, delay: 0.4 })}>
          <p className="text-[14px] font-light max-md:mx-auto max-md:max-w-[400px] md:w-[310px]">
            {t("descr")}
          </p>
        </AnimatedWrapper>
      </div>

      <AnimatedWrapper animation={fadeInAnimation({ delay: 0.6, scale: 0.8 })}>
        <div className="absolute bottom-[207px] right-[30%] h-[269px] w-[360px] bg-[url('/images/galleryPage/gallery-hero-person-mob.webp')] bg-contain max-xl:translate-x-1/4 md:bottom-0 md:right-1/2 xl:-bottom-[50px] xl:h-[446px] xl:w-[713px] xl:translate-x-[15%] xl:bg-[url('/images/galleryPage/gallery-hero-person-desk.webp')]" />
      </AnimatedWrapper>

      <div className="absolute left-0 top-0 -z-[5] h-full w-full bg-[url('/images/galleryPage/gallery-hero-bg-mob.webp')] bg-cover bg-no-repeat md:w-[45%] md:bg-[url('/images/galleryPage/gallery-hero-bg-desk.webp')]" />
    </section>
  );
};

export default GalleryHero;
