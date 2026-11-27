import { getTranslations } from "next-intl/server";
import { notFound, permanentRedirect } from "next/navigation";

import CourseBuilder from "@/components/coursePage/builder/CourseBuilder";
import JsonLd from "@/components/seo/JsonLd";
import { ORG_ID, PERSON_ID } from "@/components/seo/siteSchema";
import { getCourseBySlug, getCoursePage } from "@/lib/sanity/queries/courses";
import { ROUTES } from "@/constants/routes";
import { normalizeTitle } from "@/utils/courseImage";
import { SITE_URL } from "@/utils/getBaseUrl";
import { legacyToSections } from "@/utils/legacyCourse";
import { Locale } from "@/types/locale";

type Params = Promise<{ locale: Locale; category: string; slug: string }>;

const coursePath = (category: string, slug: string) =>
  `${ROUTES.EDUCATION}/${category}/${slug}`;

export async function generateMetadata({ params }: { params: Params }) {
  const { locale, slug } = await params;

  const post = await getCourseBySlug(slug);

  if (!post) return {};

  const { title, description, previewImage } = post;
  const path = coursePath(post.courseType.slug, post.slug);

  const name = normalizeTitle(title[locale] || title.uk);
  const seoTitle = `${name} — ${locale === "ru" ? "курс Александра Сытникова" : "курс Олександра Ситникова"}`;

  return {
    title: seoTitle,
    description: description[locale],
    alternates: {
      canonical: `${SITE_URL}/${locale}${path}`,
      languages: {
        uk: `${SITE_URL}/uk${path}`,
        ru: `${SITE_URL}/ru${path}`,
        "x-default": `${SITE_URL}/uk${path}`,
      },
    },
    openGraph: {
      title: seoTitle,
      description: description[locale],
      url: `${SITE_URL}/${locale}${path}`,
      images: previewImage?.url ? [previewImage.url] : [],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: title[locale],
      description: description[locale],
      images: previewImage?.url ? [previewImage?.url] : [],
    },
  };
}

const CoursePage = async ({ params }: { params: Params }) => {
  const { locale, category, slug } = await params;

  const [course, page] = await Promise.all([
    getCourseBySlug(slug),
    getCoursePage(slug).catch(() => null),
  ]);

  if (!course) notFound();

  // one address per course: a wrong category in the URL redirects to the real one
  if (course.courseType?.slug && course.courseType.slug !== category) {
    permanentRedirect(`/${locale}${coursePath(course.courseType.slug, slug)}`);
  }

  const { title, description, mainImage, previewImage } = course;

  const courseLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: title[locale],
    description: description[locale],
    url: `${SITE_URL}/${locale}${coursePath(category, slug)}`,
    inLanguage: locale,
    image: previewImage?.url || mainImage?.url,
    provider: { "@id": ORG_ID },
    instructor: { "@id": PERSON_ID },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "online",
      instructor: { "@id": PERSON_ID },
    },
  };

  // Courses built in the constructor use their blocks; older courses get the
  // same design from their existing content (description, program, videos).
  const t = await getTranslations({ locale, namespace: "courseBuilder" });
  const sections = page?.course?.sections?.length
    ? page.course.sections
    : legacyToSections(course, {
        lessons: count => t("lessonsCount", { count }),
        online: t("factOnline"),
        videos: t("factVideos"),
      });

  return (
    <>
      <JsonLd data={courseLd} />
      <CourseBuilder
        locale={locale}
        data={{
          title,
          description,
          slug,
          category: course.courseType,
          mainImage,
          flowStart: page?.course?.flowStart,
          priceValidUntil: page?.course?.priceValidUntil,
          sections,
          trainer: page?.trainer,
        }}
      />
    </>
  );
};

export default CoursePage;
