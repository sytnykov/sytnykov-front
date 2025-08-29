import Image from "next/image";

import { fadeInAnimation } from "@/helpers/animation";

import AnimatedWrapper from "../shared/animated/AnimatedWrapper";

interface ICourseDefaultImagesProps {
  bgMobile: string | undefined;
  bgDesktop: string | undefined;
}

const CourseDefaultImages = ({
  bgDesktop,
  bgMobile,
}: ICourseDefaultImagesProps) => {
  return (
    <>
      {!bgDesktop && (
        <>
          <AnimatedWrapper
            animation={fadeInAnimation({ y: 50, scale: 0.8 })}
            className="absolute -top-[13px] z-[1] h-[590px] w-[517px] max-md:hidden md:left-[66px] xl:left-[124px]"
          >
            <Image
              src="/images/educationPage/education-hero-themis-desk.webp"
              alt="Феміда"
              fill
              sizes="590px"
              className="object-contain"
            />
          </AnimatedWrapper>

          <AnimatedWrapper
            animation={fadeInAnimation({ y: 50, scale: 0.8, delay: 0.5 })}
            className="absolute -bottom-[200px] -left-[150px] h-[562px] w-[562px] max-md:hidden"
          >
            <Image
              src="/images/educationPage/education-hero-decor-desk.svg"
              alt="Декоративне зображення"
              fill
              sizes="562px"
              className="object-contain"
            />
          </AnimatedWrapper>
        </>
      )}

      {!bgMobile && (
        <AnimatedWrapper
          animation={fadeInAnimation({ y: 50, scale: 0.8, delay: 0.5 })}
          viewport={{ once: true, amount: 0 }}
          className="absolute -bottom-[320px] -left-[250px] h-[562px] w-[562px] md:hidden"
        >
          <Image
            src="/images/educationPage/education-hero-decor-mob.svg"
            alt="Декоративне зображення"
            fill
            sizes="562px"
            className="object-contain"
          />
        </AnimatedWrapper>
      )}
    </>
  );
};

export default CourseDefaultImages;
