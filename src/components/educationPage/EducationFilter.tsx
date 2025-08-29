import { CourseCategoryItem } from "@/lib/sanity/types/courseTypes";
import { Locale } from "@/types/locale";

import ButtonOrLink from "../shared/button/ButtonOrLink ";

interface IEducationFilterProps {
  onClick: (val: string) => void;
  lang: Locale;
  currentCourseCategory: string | undefined;
  courseCategories: CourseCategoryItem[];
}

const EducationFilter = ({
  onClick,
  lang,
  currentCourseCategory,
  courseCategories,
}: IEducationFilterProps) => {
  return (
    <div className="mb-4 overflow-x-auto xl:mb-[54px]">
      <ul className="flex w-[928px] flex-row gap-4">
        {courseCategories.map(({ slug, title }) => (
          <li key={slug}>
            <ButtonOrLink
              onClick={() => onClick(slug)}
              variant={
                currentCourseCategory === slug ? "dark" : "light-gradient"
              }
              className="whitespace-nowrap rounded-lg px-6 py-4 text-[16px] before:rounded-lg after:rounded-lg"
            >
              {title[lang]}
            </ButtonOrLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EducationFilter;
