import { getMessages, getTranslations } from "next-intl/server";
import Image from "next/image";

import { fadeInAnimation, listVariants } from "@/helpers/animation";

import InfoBox from "../shared/InfoBox";
import AnimatedList from "../shared/animated/AnimatedList";
import AnimatedListItem from "../shared/animated/AnimatedListItem";
import AnimatedWrapper from "../shared/animated/AnimatedWrapper";

type ExperienceItem = {
  title: string;
  descr: string;
};

const HomeExperience = async () => {
  const t = await getTranslations("homepage.experience");

  const messages = await getMessages();

  const experienceList = messages.homepage.experience
    .experienceList as ExperienceItem[];

  return (
    <section className="relative py-[120px]">
      <AnimatedWrapper
        animation={fadeInAnimation({ x: 50, scale: 0.8 })}
        className="absolute right-0 top-0 h-[221px] w-[225px] xl:hidden"
        aria-hidden="true"
      >
        <Image
          src="/images/homepage/home-experience-decor-1-mob.webp"
          alt="Декоративне зображення"
          fill
          sizes="225px"
          className="object-cover"
        />
      </AnimatedWrapper>

      <div className="container max-w-[1280px] max-md:max-w-[400px]">
        <div className="mb-20 xl:flex xl:gap-5">
          <div className="max-xl:mb-10">
            <AnimatedWrapper
              animation={fadeInAnimation({ y: -50 })}
              className="flex flex-col gap-5 xl:mb-8 xl:flex-col-reverse xl:gap-7"
            >
              <h2 className="font-micra text-2xl leading-[1.22] xl:text-[40px]">
                {t("title")}
              </h2>

              <p className="font-light leading-[1.22]">{t("descr-1")}</p>
            </AnimatedWrapper>

            <AnimatedWrapper
              animation={fadeInAnimation({ x: -50, delay: 0.6 })}
              className="relative hidden xl:block xl:h-[234px] xl:w-[480px]"
            >
              <Image
                src="/images/homepage/home-experience-small.webp"
                alt="картинка до публікації"
                fill
                sizes="400px"
                className="rounded-lg object-cover"
              />
            </AnimatedWrapper>
          </div>

          <div className="max-md:-mx-8">
            <AnimatedWrapper
              animation={fadeInAnimation({ x: 50, delay: 0.3 })}
              className="relative mb-16 h-[174px] max-md:mx-auto max-md:w-screen max-md:max-w-[400px] md:h-[328px] xl:mb-6 xl:w-[680px]"
            >
              <Image
                src="/images/homepage/home-experience-large.webp"
                alt="картинка до публікації"
                fill
                sizes="(max-width: 786px) 100vw, 60vw"
                className="z-[5] rounded-[4px] object-cover"
              />

              <div
                className="absolute -bottom-[80px] right-[50%] h-[174px] w-[176px] max-xl:translate-x-1/2 xl:-left-[115px] xl:top-0 xl:h-[266px] xl:w-[264px]"
                aria-hidden="true"
              >
                <Image
                  src="/images/homepage/home-experience-decor-2-mob.webp"
                  alt="Декоративне зображення"
                  fill
                  sizes="176px"
                  className="object-contain xl:hidden"
                />
                <Image
                  src="/images/homepage/home-experience-decor-4-desk.webp"
                  alt="Декоративне зображення"
                  fill
                  sizes="264px"
                  className="hidden object-contain xl:block"
                />
              </div>
            </AnimatedWrapper>

            <AnimatedWrapper animation={fadeInAnimation({ y: 50, delay: 0.9 })}>
              <p className="font-light leading-[1.22] max-md:mx-8">
                {t("descr-2")}
              </p>
            </AnimatedWrapper>
          </div>
        </div>

        <AnimatedList
          viewport={{ once: true, amount: 0.4 }}
          animation={listVariants({ staggerChildren: 0.5 })}
          className="grid gap-4 md:grid-cols-2 xl:md:grid-cols-3 xl:gap-5"
        >
          {experienceList.map(({ title, descr }, index) => (
            <AnimatedListItem key={title}>
              <InfoBox classname="relative overflow-hidden xl:bg-[linear-gradient(152.98deg,_#FFFFFF_16.89%,_#C0D4FF_274.64%)]">
                <h3 className="mb-4 font-micra text-[20px] xl:w-[230px] xl:text-[24px]">
                  {title}
                </h3>
                <p className="font-light max-xl:text-[14px]">{descr}</p>

                {index === 1 && (
                  <div
                    className="absolute right-0 top-1/2 z-[5] h-[196px] w-[84px] max-xl:-translate-y-1/2 xl:-right-[6px] xl:-top-[10px] xl:h-[202px] xl:w-[99px]"
                    aria-hidden="true"
                  >
                    <Image
                      src="/images/homepage/home-experience-decor-3-mob.webp"
                      alt="Декоративне зображення"
                      fill
                      sizes="84px"
                      className="object-contain xl:hidden"
                    />
                    <Image
                      src="/images/homepage/home-experience-decor-5-desk.webp"
                      alt="Декоративне зображення"
                      fill
                      sizes="99px"
                      className="hidden object-contain xl:block"
                    />
                  </div>
                )}
              </InfoBox>
            </AnimatedListItem>
          ))}
        </AnimatedList>
      </div>
    </section>
  );
};

export default HomeExperience;
