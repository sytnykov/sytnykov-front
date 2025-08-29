import { getMessages, getTranslations } from "next-intl/server";
import Image from "next/image";

import { ROUTES } from "@/constants/routes";
import { Locale } from "@/types/locale";
import { fadeInAnimation, listVariants } from "@/helpers/animation";

import AnimatedList from "../shared/animated/AnimatedList";
import AnimatedListItem from "../shared/animated/AnimatedListItem";
import AnimatedWrapper from "../shared/animated/AnimatedWrapper";
import ButtonOrLink from "../shared/button/ButtonOrLink ";
import CourseCard from "../shared/card/CourseCard";
import StatCard from "../shared/card/StatCard";

type StatItem = {
  title: string;
  number: string;
  decorPosition?: "bottom-right" | "top-right";
};

type CourseItem = {
  title: string;
  descr: string;
  href: string;
  variant: "light" | "accent" | "dark";
};

const HomeCourses = async ({ lang }: { lang: Locale }) => {
  const t = await getTranslations("homepage.courses");

  const messages = await getMessages();

  const statList = messages.homepage.courses.stats as StatItem[];
  const courseList = messages.homepage.courses.courseList as CourseItem[];

  return (
    <section className="bg-dark pb-[110px] pt-20">
      <div className="container max-w-[1280px]">
        <AnimatedList
          viewport={{ once: true, amount: 0.4 }}
          animation={listVariants({ staggerChildren: 0.5 })}
          className="mb-[120px] flex flex-col gap-5 md:flex-row xl:mb-[200px]"
        >
          {statList.map((card, index) => (
            <AnimatedListItem
              key={index}
              className="mx-auto h-[147px] w-full max-w-[400px] list-none rounded-lg bg-[linear-gradient(188.33deg,_#FFFFFF_32.98%,_#677BB6_181.07%)] xl:h-[188px]"
            >
              <StatCard {...card} />
            </AnimatedListItem>
          ))}
        </AnimatedList>

        <div className="flex flex-col gap-5 max-xl:mx-auto max-xl:max-w-[400px] xl:mb-8 xl:flex-row">
          <AnimatedWrapper animation={fadeInAnimation({ x: -50 })}>
            <div className="relative h-[424px] rounded-[4px] p-[1px] before:absolute before:inset-0 before:z-0 before:rounded-[4px] before:bg-[linear-gradient(326.45deg,_#071434_-11.97%,_#9CBBFF_99.8%)] before:content-[''] xl:h-[570px] xl:w-[480px]">
              <div className="relative h-full rounded-[4px] px-6 pt-16 text-light xl:h-[570px] xl:w-[480px] xl:px-11">
                <Image
                  src="/images/homepage/home-courses-main.webp"
                  alt="Фонове зображення"
                  fill
                  sizes="480px"
                  className="rounded-[4px] object-cover"
                />
                <div className="relative z-[1]">
                  <h2 className="mb-6 font-micra text-[24px] xl:w-[291px] xl:text-[36px]">
                    {t("title")}
                  </h2>
                  <p className="w-[130px] text-[14px] font-light xl:w-[291px] xl:text-[20px]">
                    {t("descr")}
                  </p>
                </div>

                <div className="absolute bottom-0 left-0 z-10">
                  <Image
                    src="/images/homepage/home-courses-main-decor-mob.webp"
                    alt="Декоративне зображення"
                    width={238}
                    height={186}
                    className="block xl:hidden"
                  />
                  <Image
                    src="/images/homepage/home-courses-main-decor-desk.webp"
                    alt="Декоративне зображення"
                    width={294}
                    height={265}
                    className="hidden xl:block"
                  />
                </div>
              </div>
            </div>
          </AnimatedWrapper>

          <AnimatedList
            viewport={{ once: true, amount: 0.4 }}
            animation={listVariants()}
            className="flex flex-col gap-5 max-xl:mb-4 xl:flex-row"
          >
            <AnimatedListItem
              direction="left"
              className="flex flex-col gap-5 xl:flex-col-reverse"
            >
              <CourseCard
                {...courseList[0]}
                ariaLabel={t("a11yLink")}
                lang={lang}
              />
              <CourseCard
                {...courseList[1]}
                ariaLabel={t("a11yLink")}
                lang={lang}
              />
            </AnimatedListItem>
            <AnimatedListItem direction="left">
              <CourseCard
                {...courseList[2]}
                ariaLabel={t("a11yLink")}
                lang={lang}
              />
            </AnimatedListItem>
          </AnimatedList>
        </div>

        <AnimatedWrapper
          animation={fadeInAnimation({ y: 50 })}
          className="flex flex-col gap-10 max-xl:mx-auto max-xl:max-w-[400px] xl:flex-row xl:justify-between"
        >
          <p className="text-[12px] font-light text-light max-xl:mx-auto max-xl:max-w-[400px] xl:mr-auto xl:w-[480px] xl:text-[20px]">
            {t("tagline")}
          </p>

          <ButtonOrLink
            href={ROUTES.EDUCATION}
            variant="light"
            className="bg-light xl:w-[318px]"
          >
            {t("button")}
          </ButtonOrLink>
        </AnimatedWrapper>
      </div>
    </section>
  );
};

export default HomeCourses;
