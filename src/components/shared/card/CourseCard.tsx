import Image from "next/image";

import { ROUTES } from "@/constants/routes";
import { cn } from "@/utils/cn";
import { Locale } from "@/types/locale";

import ButtonOrLink from "../button/ButtonOrLink ";
import { ArrowInCircleIcon } from "../icons";

interface ICourseCardProps {
  title: string;
  descr: string;
  variant: "light" | "accent" | "dark";
  href: string;
  className?: string;
  ariaLabel: string;
  lang: Locale;
}

const CourseCard = ({
  variant,
  descr,
  title,
  href,
  className,
  ariaLabel,
  lang,
}: ICourseCardProps) => {
  const wrapperStyles = cn(
    "relative w-full flex flex-col rounded overflow-hidden",
    variant === "light" &&
      "h-[308px] bg-light text-dark p-6 text-right xl:w-[380px] xl:h-[308px]",
    variant === "accent" &&
      "h-[242px] bg-accent text-light p-6 pt-7 xl:w-[380px] xl:h-[242px]",
    variant === "dark" &&
      "h-[424px] bg-dark text-light p-6 pt-7 border border-solid border-[1px] border-light xl:w-[280px] xl:h-[570px]",
    className
  );

  const titleStyles = cn(
    "z-[3] font-micra mb-6",
    variant === "light" && "text-[20px]",
    variant === "accent" && "text-[16px] max-w-[246px]",
    variant === "dark" && "text-[18px] max-w-[265px]"
  );

  const descrStyles = cn(
    "z-[3] font-light mb-auto xl:w-[167px] max-xl:text-[14px] ",
    variant === "light" && "ml-auto w-[141px] xl:w-[194px]",
    variant === "accent" && "w-[167px]",
    variant === "dark" && "max-xl:text-right max-xl:ml-auto max-w-[240px]"
  );

  const linkStyles = cn(
    "flex h-12 w-12 shrink-0 items-center justify-center rounded-[8px] bg-light p-0 xl:h-[70px] xl:w-[70px]",
    variant === "light" && "ml-auto",
    variant === "accent" && "max-xl:bottom-6 right-6 absolute xl:top-7",
    variant === "dark" && "ml-auto"
  );

  return (
    <article>
      <div className={wrapperStyles}>
        <h3 className={titleStyles}>{title}</h3>
        <p className={descrStyles}>{descr}</p>

        <div className="z-[3]">
          <ButtonOrLink
            href={`/${lang}${ROUTES.EDUCATION}/${href}`}
            className={linkStyles}
            ariaLabel={ariaLabel}
          >
            <ArrowInCircleIcon className="h-[31px] w-[31px] text-dark" />
          </ButtonOrLink>
        </div>

        {variant === "light" && (
          <div className="absolute bottom-0 left-0 h-[308px] w-[400px]">
            <Image
              src="/images/homepage/home-courses-person-1-1.webp"
              alt="Фото Олександра Ситника"
              // fill
              // sizes="400px"
              width={172}
              height={273}
              loading="lazy"
              fetchPriority="low"
              className="absolute bottom-0 left-0 z-[1] object-cover"
            />

            <Image
              src="/images/homepage/home-courses-person-1-gradient.svg"
              alt="Декоративне зображення"
              width={568}
              height={686}
              loading="lazy"
              fetchPriority="low"
              className="absolute -bottom-[150px] -left-[130px] object-cover"
            />

            <Image
              src="/images/homepage/home-courses-person-1-gradient.svg"
              alt="Декоративне зображення"
              width={568}
              height={686}
              loading="lazy"
              fetchPriority="low"
              className="absolute -bottom-[240px] -left-[70px] rotate-90 object-cover"
            />
          </div>
        )}

        {variant === "dark" && (
          <>
            <div className="absolute bottom-0 left-0 z-[1] hidden h-[482px] w-[280px] xl:block">
              <Image
                src="/images/homepage/home-courses-person-2-desk.webp"
                alt="Фото Олександра Ситника"
                width={280}
                height={482}
                className="object-contain max-xl:hidden"
              />
            </div>

            <div className="absolute bottom-0 left-0 z-[1] h-[370px] w-[400px] xl:hidden">
              <Image
                src="/images/homepage/home-courses-person-2-mob.webp"
                alt="Фото Олександра Ситника"
                width={224}
                height={302}
                className="absolute bottom-0 left-0 z-[1] object-contain"
              />

              <Image
                src="/images/homepage/home-courses-person-2-gradient.svg"
                alt="Декоративне зображення"
                width={664}
                height={686}
                // fill
                // sizes="664px"
                className="absolute -bottom-[120px] -left-[90px] object-contain"
              />
            </div>
          </>
        )}

        {variant === "accent" && (
          <>
            <div className="absolute bottom-0 right-0 hidden h-[133px] w-[189px] xl:block">
              <Image
                src="/images/homepage/home-courses-publ-decor-desk.webp"
                alt="Декоративне зображення"
                width={189}
                height={133}
                className="object-contain"
              />
            </div>
            <div className="absolute bottom-0 right-0 h-[121px] w-[150px] xl:hidden">
              <Image
                src="/images/homepage/home-courses-publ-decor-mob.webp"
                alt="Декоративне зображення"
                width={150}
                height={121}
                className="object-contain"
              />
            </div>
          </>
        )}
      </div>
    </article>
  );
};

export default CourseCard;
