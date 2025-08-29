import { Metadata } from "next";

import EducationContent from "@/components/educationPage/EducationContent";
import EducationHero from "@/components/educationPage/EducationHero";
import {
  getAllCourses,
  getCourseCategories,
} from "@/lib/sanity/queries/courses";
import { ROUTES } from "@/constants/routes";
import { generatePageMetadata } from "@/utils/generatePageMetaData";
import { Locale } from "@/types/locale";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return generatePageMetadata({
    locale,
    namespace: "educationPage",
    path: ROUTES.EDUCATION,
  });
}

const EducationPage = async ({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) => {
  const { locale } = await params;

  const courseCategories = await getCourseCategories();
  const allCourses = await getAllCourses();

  return (
    <>
      <EducationHero />
      <EducationContent
        courseCategories={courseCategories}
        allCourses={allCourses}
        lang={locale}
      />
    </>
  );
};

export default EducationPage;
