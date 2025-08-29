import { getTranslations } from "next-intl/server";
import Image from "next/image";

import { fadeInAnimation } from "@/helpers/animation";

import AnimatedWrapper from "../shared/animated/AnimatedWrapper";

const ContactsHero = async () => {
  const t = await getTranslations("contactsPage.hero");

  return (
    <section className="relative h-[770px] bg-[linear-gradient(256.12deg,_#FFFFFF_40.11%,_#C0D4FF_129.35%)] pb-[10px] pt-[124px] md:h-[528px] md:pb-0">
      <div className="container h-full max-w-[1280px]">
        <div className="mx-auto flex h-full flex-col justify-between max-md:max-w-[400px] md:flex-row">
          <AnimatedWrapper
            animation={fadeInAnimation({ y: -50 })}
            className="xl:flex xl:justify-end"
          >
            <p className="font-micra md:mb-[30px] md:mt-auto md:max-w-[340px] xl:max-w-[479px] xl:text-[18px] xl:leading-[1.4]">
              {t("descr")}
            </p>
          </AnimatedWrapper>

          <div className="relative z-[5] flex flex-col max-md:-mx-[22px] md:-mr-[32px] md:mt-auto xl:-mr-[50px] xl:mt-0">
            <AnimatedWrapper animation={fadeInAnimation({ x: 50, delay: 0.3 })}>
              <h1 className="mb-5 text-right font-micra text-[24px] max-md:mx-[22px] md:mr-[32px] xl:mb-7 xl:mr-[50px] xl:text-[48px]">
                {t("title")}
              </h1>
            </AnimatedWrapper>

            <AnimatedWrapper
              animation={fadeInAnimation({ y: 50, delay: 0.6 })}
              className="relative h-[334px] w-full md:w-[480px] xl:w-[680px]"
            >
              <Image
                src="/images/contactsPage/contacts-hero-photo.webp"
                fill
                sizes="(max-width: 768px) 400px, (max-width: 1280px) 480px, 680px"
                alt={t("imgAlt")}
                className="object-cover max-md:rounded-2xl md:rounded-l-lg xl:rounded-lg"
              />
            </AnimatedWrapper>
          </div>
        </div>
      </div>

      <div className="absolute left-0 top-[146px] z-[3] h-[373px] w-[147px] bg-[url('/images/contactsPage/contacts-hero-decor-left.webp')] md:-left-[24px] md:top-[100px] md:-rotate-12" />
      <div className="absolute right-0 top-[146px] z-[3] h-[306px] w-[139px] max-md:bg-[url('/images/contactsPage/contacts-hero-decor-right-mob.webp')] md:hidden" />
      <div className="absolute left-[33%] top-0 z-[3] h-[237px] w-[421px] max-md:hidden md:bg-[url('/images/contactsPage/contacts-hero-decor-top-desk.webp')]" />
    </section>
  );
};

export default ContactsHero;
