import { getTranslations } from "next-intl/server";
import Image from "next/image";

import { APPLICATION } from "@/constants/application";
import { ROUTES } from "@/constants/routes";
import { fadeInAnimation } from "@/helpers/animation";

import ModalTrigger from "../module/modal/ModalTrigger";
import AnimatedWrapper from "../shared/animated/AnimatedWrapper";
import ButtonOrLink from "../shared/button/ButtonOrLink ";

const HomeBottomCTA = async () => {
  const t = await getTranslations("homepage.bottomCTA");

  return (
    <section className="relative mb-[120px] pb-[26px] pt-16 text-light xl:mb-[200px] xl:h-[623px] xl:pt-[88px]">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/homepage/home-bottomCTA-bg-mob.webp"
          alt="Фонове зображення"
          fill
          sizes="100vw"
          className="object-cover md:hidden"
        />
        <Image
          src="/images/homepage/home-bottomCTA-bg-desk.webp"
          alt="Фонове зображення"
          fill
          sizes="100vw"
          className="hidden object-cover md:block"
        />
      </div>

      <div className="container relative z-20 max-w-[1280px]">
        <AnimatedWrapper
          animation={fadeInAnimation({ y: -50 })}
          className="relative mb-[91px] flex flex-col gap-6 xl:mb-16 xl:flex-col-reverse xl:gap-7"
        >
          <h2 className="font-micra text-[24px] max-xl:max-w-[374px] xl:w-[610px] xl:text-[40px]">
            {t("title")}
          </h2>
          <p className="w-[171px] font-light xl:w-[480px]">{t("descr")}</p>
        </AnimatedWrapper>

        <AnimatedWrapper
          animation={fadeInAnimation({ y: 50, delay: 0.3 })}
          className="flex max-w-[374px] flex-col gap-4"
        >
          <ModalTrigger
            variant="consultation"
            buttonVariant="light"
            messageFrom={APPLICATION.CONSULTATION}
          />
          <ButtonOrLink href={ROUTES.EDUCATION} variant="transparent">
            {t("buttonCourse")}
          </ButtonOrLink>
        </AnimatedWrapper>
      </div>

      <AnimatedWrapper
        animation={fadeInAnimation({ x: 150, delay: 0.5, scale: 0.8 })}
        className="absolute bottom-0 right-0 h-full w-full"
      >
        <div className="absolute bottom-0 right-0 h-[591px] w-[360px] xl:-right-[52px] xl:h-[861px] xl:w-[690px]">
          <Image
            src="/images/homepage/home-bottomCTA-person-mob.webp"
            alt="Олександр Ситник"
            fill
            sizes="360px"
            className="object-contain xl:hidden"
          />
          <Image
            src="/images/homepage/home-bottomCTA-person-desk.webp"
            alt="Олександр Ситник"
            fill
            sizes="690px"
            className="z-10 hidden object-contain xl:block"
          />
        </div>

        <div className="absolute bottom-0 right-0 z-[8] hidden h-[581px] w-[744px] xl:right-[70px] xl:block">
          <Image
            src="/images/homepage/home-bottomCTA-decor-desk.webp"
            alt="Декоративне зображення"
            fill
            sizes="744px"
            className="object-contain"
          />
        </div>
      </AnimatedWrapper>
    </section>
  );
};

export default HomeBottomCTA;
