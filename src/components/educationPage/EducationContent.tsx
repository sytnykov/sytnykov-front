"use client";

import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

import { usePaginationPage } from "@/hooks/usePaginationPage";

import { CourseCategoryItem, CourseItem } from "@/lib/sanity/types/courseTypes";
import { COURSES_PER_PAGE } from "@/constants/pagination";
import { Locale } from "@/types/locale";

import SectionHead from "../homepage/SectionHead";
import Pagination from "../shared/pagination/Pagination";
import EducationCard from "./EducationCard";
import EducationFilter from "./EducationFilter";

const EducationContent = ({
  courseCategories,
  allCourses,
  lang,
}: {
  courseCategories: CourseCategoryItem[];
  allCourses: CourseItem[];
  lang: Locale;
}) => {
  const t = useTranslations("educationPage.list");
  const params = useParams();
  const selectedCategory = params.category as string | undefined;

  const totalPages = Math.ceil(allCourses.length / COURSES_PER_PAGE);
  const { currentPage, changePage } = usePaginationPage(totalPages);

  const startIdx = (currentPage - 1) * COURSES_PER_PAGE;
  const paginatedData = allCourses.slice(startIdx, startIdx + COURSES_PER_PAGE);

  return (
    <section
      id="courses"
      className="scroll-mt-20 bg-[#f3f6fd] py-14 md:py-20 xl:py-[100px]"
    >
      <div className="container max-w-[1280px]">
        <SectionHead title={t("title")} descr={t("descr")} />
        <EducationFilter
          courseCategories={courseCategories}
          currentCourseCategory={selectedCategory}
          lang={lang}
          allLabel={t("all")}
        />

        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-5 xl:grid-cols-3">
          {paginatedData.map(course => (
            <li key={course.slug}>
              <EducationCard
                course={course}
                lang={lang}
                moreLabel={t("more")}
              />
            </li>
          ))}
        </ul>

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={changePage}
          />
        )}
      </div>
    </section>
  );
};

export default EducationContent;
