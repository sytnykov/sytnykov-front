import { getTranslations } from "next-intl/server";
import Image from "next/image";

import { ROUTES } from "@/constants/routes";
import { fadeInAnimation } from "@/helpers/animation";

import AnimatedWrapper from "../shared/animated/AnimatedWrapper";
import ButtonOrLink from "../shared/button/ButtonOrLink ";

const HomeKnowledge = async () => {
  const t = await getTranslations("homepage.knowledge");

  return (
    <section className="relative h-[598px] overflow-hidden pb-[41px] pt-16 text-light xl:h-[623px] xl:py-[104px]">
      <div aria-hidden="true" className="absolute inset-0 z-0">
        <Image
          src="/images/homepage/home-knowledge-bg-mob.webp"
          alt="Фонове зображення"
          fill
          sizes="100vw"
          className="object-cover md:hidden"
        />
        <Image
          src="/images/homepage/home-knowledge-bg-desk.webp"
          alt="Фонове зображення"
          fill
          sizes="100vw"
          className="hidden object-cover md:block"
        />
      </div>
      <div className="container relative z-20 h-full max-w-[1280px]">
        <div className="flex h-full flex-col justify-between max-xl:max-w-[400px] xl:ml-[489px] xl:w-[609px]">
          <AnimatedWrapper
            animation={fadeInAnimation({ y: -50 })}
            className="flex flex-col gap-5 xl:mb-16 xl:flex-col-reverse"
          >
            <h2 className="font-micra text-2xl leading-[1.22] tracking-normal xl:text-[40px] xl:leading-[1.22]">
              {t("title")}
            </h2>
            <p className="font-light leading-[1.22] tracking-normal xl:w-[409px] xl:text-base xl:leading-[1.22]">
              {t("descr")}
            </p>
          </AnimatedWrapper>

          <AnimatedWrapper animation={fadeInAnimation({ y: 50, delay: 0.4 })}>
            <ButtonOrLink
              href={ROUTES.EDUCATION}
              variant="light"
              className="max-w-[374px]"
            >
              {t("button")}
            </ButtonOrLink>
          </AnimatedWrapper>
        </div>
      </div>

      <AnimatedWrapper
        viewport={{ once: true, amount: 0.2 }}
        animation={fadeInAnimation({ x: 50, y: 50, delay: 0.7, scale: 0.8 })}
        className="absolute -bottom-[10px] -right-[30px] z-10 xl:-bottom-[84px] xl:left-0"
      >
        <div
          aria-hidden="true"
          className="relative h-[394px] w-[598px] xl:hidden"
        >
          <Image
            src="/images/homepage/home-knowledge-femida-mob.webp"
            alt="Феміда"
            fill
            className="object-contain"
            sizes="(max-width: 1280px) 598px"
          />
        </div>
        <div
          aria-hidden="true"
          className="relative hidden h-[759px] w-[682px] xl:block"
        >
          <Image
            src="/images/homepage/home-knowledge-femida-desk.webp"
            alt="Феміда"
            fill
            className="object-contain"
            sizes="(min-width: 1280px) 682px"
          />
        </div>
      </AnimatedWrapper>
    </section>
  );
};

export default HomeKnowledge;
