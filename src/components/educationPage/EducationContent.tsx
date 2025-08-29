"use client";

import { useParams, useRouter } from "next/navigation";

import { usePaginationPage } from "@/hooks/usePaginationPage";

import { CourseCategoryItem, CourseItem } from "@/lib/sanity/types/courseTypes";
import { COURSES_PER_PAGE } from "@/constants/pagination";
import { Locale } from "@/types/locale";

import Pagination from "../shared/pagination/Pagination";
import EducationFilter from "./EducationFilter";
import EducationList from "./EducationList";

const EducationContent = ({
  courseCategories,
  allCourses,
  lang,
}: {
  courseCategories: CourseCategoryItem[];
  allCourses: CourseItem[];
  lang: Locale;
}) => {
  const router = useRouter();
  const params = useParams();
  const selectedCategory = params.category as string | undefined;

  const totalPages = Math.ceil(allCourses.length / COURSES_PER_PAGE);
  const { currentPage, changePage } = usePaginationPage(totalPages);

  const startIdx = (currentPage - 1) * COURSES_PER_PAGE;
  const paginatedData = allCourses.slice(startIdx, startIdx + COURSES_PER_PAGE);

  const handleCategoryChange = (categoryValue: string) => {
    router.push(`/${lang}/education/${categoryValue}`);
  };

  return (
    <section className="pb-[120px] pt-[50px] xl:pb-[200px] xl:pt-[100px]">
      <div className="container max-w-[1280px]">
        <EducationFilter
          courseCategories={courseCategories}
          onClick={handleCategoryChange}
          currentCourseCategory={selectedCategory}
          lang={lang}
        />

        <EducationList courses={paginatedData} lang={lang} />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={changePage}
        />
      </div>
    </section>
  );
};

export default EducationContent;
