import Image from "next/image";

import { CourseItem } from "@/lib/sanity/types/courseTypes";
import { ROUTES } from "@/constants/routes";
import { Locale } from "@/types/locale";

import InfoBox from "../shared/InfoBox";
import ButtonOrLink from "../shared/button/ButtonOrLink ";

interface IEducationCardProps {
  course: CourseItem;
  lang: Locale;
}

const EducationCard = ({ course, lang }: IEducationCardProps) => {
  const { courseType, description, title, slug, previewImage } = course;

  const defaultCardImage =
    "/images/publications/publication-card-default-image.webp";

  return (
    <article className="h-full">
      <InfoBox variant="withImage" classname="relative h-full flex flex-col">
        <div className="relative -mx-6 -mt-6 h-[165px] shrink-0">
          <Image
            src={previewImage?.url || defaultCardImage}
            alt="картинка до публікації"
            fill
            sizes="400px"
            className="rounded-lg object-cover"
          />
        </div>

        <div className="flex flex-col justify-between gap-4 pt-[30px] xl:gap-6">
          <h3 className="line-clamp-4 font-micra uppercase tracking-normal xl:text-[20px]">
            {title[lang]}
          </h3>

          <p className="mt-auto line-clamp-4 gap-[18px] tracking-normal">
            {description[lang]}
          </p>
        </div>

        <ButtonOrLink
          variant="dark"
          className="relative z-[1] mt-auto"
          href={`/${lang}${ROUTES.EDUCATION}/${courseType.slug}/${slug}`}
        >
          Переглянути курс
        </ButtonOrLink>
      </InfoBox>
    </article>
  );
};

export default EducationCard;
