import { Metadata } from "next";
import { notFound } from "next/navigation";

import FinalCta from "@/components/coursePage/builder/FinalCta";
import EducationContent from "@/components/educationPage/EducationContent";
import EducationHero from "@/components/educationPage/EducationHero";
import {
  getCourseCategories,
  getCoursesByCategory,
} from "@/lib/sanity/queries/courses";
import { ROUTES } from "@/constants/routes";
import { generatePageMetadata } from "@/utils/generatePageMetaData";
import { Locale } from "@/types/locale";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; category: string }>;
}): Promise<Metadata> {
  const { locale, category } = await params;

  return generatePageMetadata({
    locale,
    namespace: "educationPage",
    path: `${ROUTES.EDUCATION}/${category}`,
  });
}

const EducationCategoryPage = async ({
  params,
}: {
  params: Promise<{ locale: Locale; category: string }>;
}) => {
  const { locale, category } = await params;

  const courseCategories = await getCourseCategories();
  if (!courseCategories.some(c => c.slug === category)) notFound();
  const allCourses = await getCoursesByCategory(category);

  return (
    <>
      <EducationHero />
      <EducationContent
        courseCategories={courseCategories}
        allCourses={allCourses}
        lang={locale}
      />
      <FinalCta course={locale === "ru" ? "Подбор курса" : "Підбір курсу"} />
    </>
  );
};

export default EducationCategoryPage;
