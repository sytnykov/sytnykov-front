import { getTranslations } from "next-intl/server";
import Image from "next/image";

import { getPaginatedPublications } from "@/lib/sanity/queries/queries";
import { HOME_PUBLICATIONS_PER_PAGE } from "@/constants/pagination";
import { ROUTES } from "@/constants/routes";
import { Locale } from "@/types/locale";
import { fadeInAnimation } from "@/helpers/animation";

import AnimatedWrapper from "../shared/animated/AnimatedWrapper";
import ButtonOrLink from "../shared/button/ButtonOrLink ";
import PublicationList from "../shared/publicationList/PublicationList";

const HomePublications = async ({ lang }: { lang: Locale }) => {
  const t = await getTranslations("homepage.publications");

  const publicationList = await getPaginatedPublications(
    HOME_PUBLICATIONS_PER_PAGE
  );

  return (
    <section className="relative py-[120px] xl:pb-[158px] xl:pt-[200px]">
      <div className="container max-w-[1280px]">
        <div className="mx-auto mb-[52px] flex flex-col max-xl:max-w-[374px] xl:flex-row-reverse xl:items-center xl:justify-between">
          <AnimatedWrapper animation={fadeInAnimation({ x: 50 })}>
            <h2 className="font-micra text-[24px] max-xl:mb-[20px] xl:max-w-[500px] xl:text-right xl:text-[48px]">
              {t("title")}
            </h2>
          </AnimatedWrapper>

          <AnimatedWrapper
            animation={fadeInAnimation({ x: -50 })}
            className="xl:max-w-[380px]"
          >
            <p className="mb-8 font-light">{t("descr")}</p>
            <ButtonOrLink href={ROUTES.PUBLICATIONS} variant="light">
              {t("button")}
            </ButtonOrLink>
          </AnimatedWrapper>
        </div>

        <PublicationList data={publicationList} lang={lang} />
      </div>

      <AnimatedWrapper
        animation={fadeInAnimation({ scale: 0.8, delay: 0.4 })}
        className="absolute left-0 top-0 -z-[5] h-[218px] w-[232px] xl:hidden"
      >
        <Image
          src="/images/homepage/home-publications-decor-mob.webp"
          alt="Декоративне зображення"
          fill
          sizes="232px"
          className="object-contain"
        />
      </AnimatedWrapper>
      <div className="absolute -left-[254px] top-[31px] -z-[1] h-[233px] w-[1146px] rotate-[11.31deg] rounded-full bg-[#ffffff] blur-[223px] xl:-left-[45%] xl:hidden" />
    </section>
  );
};

export default HomePublications;
