import CourseContent from "@/components/coursePage/CourseContent";
import CourseHero from "@/components/coursePage/CourseHero";
import { getCourseBySlug } from "@/lib/sanity/queries/courses";
import { Locale } from "@/types/locale";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;

  const post = await getCourseBySlug(slug);

  if (!post) return {};

  const { title, description, previewImage } = post;

  return {
    title: title[locale],
    description: description[locale],
    openGraph: {
      title: title[locale],
      description: description[locale],
      images: previewImage?.url ? [previewImage.url] : [],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: title[locale],
      description: description[locale],
      images: previewImage?.url ? [previewImage?.url] : [],
    },
  };
}

const CoursePage = async ({
  params,
}: {
  params: Promise<{ locale: Locale; category: string; slug: string }>;
}) => {
  const { locale, slug } = await params;

  const course = await getCourseBySlug(slug);

  if (!course) return null;

  const { title, description, mainImage, mainImageMobile } = course;

  return (
    <>
      <CourseHero
        title={title[locale]}
        descr={description[locale]}
        mainImage={mainImage}
        mainImageMobile={mainImageMobile}
      />
      <CourseContent course={course} lang={locale} />
    </>
  );
};

export default CoursePage;
