import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

import { COURSE_PROTOTYPE } from "@/data/coursePrototype";

import CourseBuilder from "@/components/coursePage/builder/CourseBuilder";
import PrototypeNote from "@/components/coursePage/builder/PrototypeNote";
import { Locale } from "@/types/locale";

export const metadata: Metadata = {
  title: "Прототип сторінки курсу",
  robots: { index: false, follow: false },
};

/** Course constructor prototype for the PM — exists only on the preview copy. */
const CoursePrototypePage = async ({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) => {
  if (process.env.NEXT_PUBLIC_NOINDEX !== "1") notFound();
  const { locale } = await params;
  const t = await getTranslations("courseBuilder");

  return (
    <>
      <CourseBuilder data={COURSE_PROTOTYPE} locale={locale} />
      <PrototypeNote text={t("prototype")} />
    </>
  );
};

export default CoursePrototypePage;
