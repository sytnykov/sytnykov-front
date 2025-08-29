"use client";

import { SanityImage } from "@/lib/sanity/types/shared";
import { APPLICATION } from "@/constants/application";
import { fadeInAnimation } from "@/helpers/animation";

import ModalTrigger from "../module/modal/ModalTrigger";
import AnimatedWrapper from "../shared/animated/AnimatedWrapper";
import CourseDefaultImages from "./CourseDefaultImages";

interface ICourseHeroProps {
  title: string;
  descr: string;
  mainImage?: SanityImage;
  mainImageMobile?: SanityImage;
}

const CourseHero = ({
  title,
  descr,
  mainImage,
  mainImageMobile,
}: ICourseHeroProps) => {
  const bgMobile = mainImageMobile?.url;
  const bgDesktop = mainImage?.url;

  return (
    <section className="relative h-[771px] overflow-hidden rounded-b-2xl bg-dark pt-[136px] text-light md:h-[520px] md:pb-10">
      {bgMobile && (
        <div
          className="absolute inset-0 block bg-cover bg-center bg-no-repeat md:hidden"
          style={{ backgroundImage: `url('${bgMobile}')` }}
        />
      )}

      {bgDesktop && (
        <div
          className="absolute inset-0 hidden bg-cover bg-center bg-no-repeat md:block"
          style={{ backgroundImage: `url('${bgDesktop}')` }}
        />
      )}

      <CourseDefaultImages bgMobile={bgMobile} bgDesktop={bgDesktop} />

      <div className="container max-w-[1280px] md:h-full">
        <div className="relative z-10 flex flex-col justify-between max-md:max-w-[300px] md:ml-auto md:h-full md:w-[564px] md:text-right xl:w-[694px]">
          <div>
            <AnimatedWrapper animation={fadeInAnimation({ y: -50 })}>
              <h1 className="mb-6 font-micra text-[22px] uppercase md:mb-[21px] md:text-[32px] xl:text-[40px]">
                {title}
              </h1>
            </AnimatedWrapper>

            <AnimatedWrapper animation={fadeInAnimation({ x: 50, delay: 0.3 })}>
              <p className="mb-8 max-w-[236px] text-[14px] font-light md:ml-auto xl:max-w-[400px]">
                {descr}
              </p>
            </AnimatedWrapper>
          </div>

          <AnimatedWrapper animation={fadeInAnimation({ y: 50, delay: 0.5 })}>
            <ModalTrigger
              variant="course"
              buttonVariant="light"
              buttonClassName="bg-light text-dark max-md:h-11 md:w-[294px] md:ml-auto md:h-[50px]"
              course={title}
              messageFrom={APPLICATION.COURSE}
            />
          </AnimatedWrapper>
        </div>
      </div>

      {/* <div className="absolute -bottom-[350px] -left-[250px] h-[562px] w-[562px] bg-[url('/images/coursePage/course-hero-decor-mob.webp')] md:-bottom-[205px] md:-left-[130px] md:bg-[url('/images/coursePage/course-hero-decor-desk.webp')]" /> */}

      {/* <AnimatedWrapper
        animation={fadeInAnimation({ y: 50, delay: 0.7, scale: 0.8 })}
        className="absolute bottom-0 h-[411px] w-[309px] bg-[url('/images/coursePage/course-hero-themis-mob.webp')] bg-cover max-md:right-0 md:left-[10%] md:h-[410px] md:w-[407px] md:bg-[url('/images/coursePage/course-hero-themis-desk.webp')] xl:h-[520px] xl:w-[517px]"
      /> */}
    </section>
  );
};

export default CourseHero;
