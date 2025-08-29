import { SanityImage } from "@/lib/sanity/types/shared";
import { fadeInAnimation } from "@/helpers/animation";

import AnimatedWrapper from "../shared/animated/AnimatedWrapper";
import { ClockIcon } from "../shared/icons";

interface IPublicationHeroProps {
  title: string;
  description: string;
  mainImage?: SanityImage;
  mainImageMobile?: SanityImage;
  readingTime: string;
}

const PublicationHero = ({
  title,
  description,
  mainImage,
  mainImageMobile,
  readingTime,
}: IPublicationHeroProps) => {
  const defaultMobileImage =
    "/images/publicationPage/publication-hero-default-bg-mob.webp";
  const defaultDesktopImage =
    "/images/publicationPage/publication-hero-default-bg-desk.webp";
  const bgMobile = mainImageMobile?.url || defaultMobileImage;
  const bgDesktop = mainImage?.url || defaultDesktopImage;

  return (
    <section className="relative h-[602px] pb-11 pt-[108px] md:h-[528px] md:pt-[144px]">
      <div
        className="absolute inset-0 z-[-1] block bg-cover bg-center bg-no-repeat md:hidden"
        style={{ backgroundImage: `url('${bgMobile}')` }}
      />

      <div
        className="absolute inset-0 z-[-1] hidden bg-cover bg-center bg-no-repeat md:block"
        style={{ backgroundImage: `url('${bgDesktop}')` }}
      />

      <div className="container flex h-full max-w-[1280px] flex-col justify-between">
        <AnimatedWrapper
          initial="hidden"
          animate="visible"
          viewport={{ once: false, amount: 0 }}
          animation={fadeInAnimation({ y: -50 })}
        >
          <h1 className="mb-10 max-w-[340px] font-micra uppercase md:max-w-[822px] md:text-[32px] xl:text-[48px]">
            {title}
          </h1>
          <p className="mr-[119px] max-w-[240px] text-[14px] font-light md:max-w-[411px]">
            {description}
          </p>
        </AnimatedWrapper>

        <AnimatedWrapper
          initial="hidden"
          animate="visible"
          viewport={{ once: false, amount: 0 }}
          animation={fadeInAnimation({ x: -50 })}
          className="ml-[21px]"
        >
          <div
            className="relative inline-block border-y border-transparent bg-none py-[6px] text-[14px] font-medium leading-[20px] text-dark before:absolute before:left-[-21px] before:top-[-1px] before:h-[calc(100%+2px)] before:w-[21px] before:rounded-l-full before:border-b before:border-l before:border-r-0 before:border-t before:border-[#304F94] after:absolute after:right-[-21px] after:top-[-1px] after:h-[calc(100%+2px)] after:w-[21px] after:rounded-r-full after:border-b after:border-l-0 after:border-r after:border-t after:border-[#6582C2]"
            style={{
              borderImageSource:
                "linear-gradient(90deg, #304F94 0%, #6582C2 100%)",
              borderImageSlice: 1,
            }}
          >
            <ClockIcon className="mr-2 inline h-5 w-5" /> {readingTime}
          </div>
        </AnimatedWrapper>
      </div>
    </section>
  );
};

export default PublicationHero;
