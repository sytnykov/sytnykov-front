import Image from "next/image";

import { Link } from "@/i18n/navigation";
import { CourseItem } from "@/lib/sanity/types/courseTypes";
import { ROUTES } from "@/constants/routes";
import { courseImage, normalizeTitle } from "@/utils/courseImage";
import { Locale } from "@/types/locale";

import { PillLink } from "../homepage/SectionHead";

/** Course card: themed photo, type chip, title, short promise, one action. */
const EducationCard = ({
  course,
  lang,
  moreLabel,
}: {
  course: CourseItem;
  lang: Locale;
  moreLabel: string;
}) => {
  const { courseType, description, title, slug, previewImage } = course;
  const name = normalizeTitle(title[lang] || title.uk);

  return (
    <Link
      href={`${ROUTES.EDUCATION}/${courseType.slug}/${slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-[26px] bg-light shadow-[0_1px_2px_rgba(9,17,41,0.05)] outline-none ring-accent ring-offset-2 transition-[transform,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(9,17,41,0.45)] focus-visible:ring-2"
    >
      <div className="relative h-[200px] shrink-0 overflow-hidden md:h-[220px]">
        <Image
          src={courseImage(title.uk ?? "", previewImage?.url)}
          alt={name}
          fill
          sizes="(min-width: 1280px) 400px, (min-width: 768px) 50vw, 92vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
        />
        <span
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(0deg,rgba(9,17,41,0.55),rgba(9,17,41,0)_55%)]"
        />
        <span className="absolute left-4 top-4 rounded-full bg-dark/70 px-3 py-1.5 text-[12px] font-medium text-light shadow-[inset_0_0_0_1px_rgba(255,255,255,0.18)] backdrop-blur-md">
          {courseType.title?.[lang] || courseType.title?.uk}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5 md:p-6">
        <h3 className="text-balance text-[18px] font-semibold leading-[1.3] text-dark md:text-[19px]">
          {name}
        </h3>
        <p className="mt-2.5 line-clamp-3 text-pretty text-[14px] leading-[1.55] text-dark/60 md:text-[15px]">
          {description?.[lang] || description?.uk}
        </p>
        <div className="mt-auto pt-6">
          <PillLink>{moreLabel}</PillLink>
        </div>
      </div>
    </Link>
  );
};

export default EducationCard;
