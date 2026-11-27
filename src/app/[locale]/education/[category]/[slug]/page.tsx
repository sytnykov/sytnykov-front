import { getTranslations } from "next-intl/server";
import { notFound, permanentRedirect } from "next/navigation";

import CourseBuilder from "@/components/coursePage/builder/CourseBuilder";
import JsonLd from "@/components/seo/JsonLd";
import { ORG_ID, PERSON_ID } from "@/components/seo/siteSchema";
import { getCourseBySlug, getCoursePage } from "@/lib/sanity/queries/courses";
import { PackagesBlock, pick } from "@/lib/sanity/types/courseBlocks";
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
  const url = `${SITE_URL}/${locale}${coursePath(category, slug)}`;
  const flowStart = page?.course?.flowStart;
  const priceValidUntil = page?.course?.priceValidUntil;
  const salesClosed = flowStart
    ? new Date(`${flowStart}T23:59:59`).getTime() < Date.now()
    : false;

  // one Offer per package with a price (constructor courses only)
  const offers = (page?.course?.sections ?? [])
    .filter((s): s is PackagesBlock => s._type === "coursePackagesBlock")
    .flatMap(s => s.packages ?? [])
    .filter(p => (p.price ?? 0) > 0)
    .map(p => ({
      "@type": "Offer",
      ...(pick(p.name, locale) && { name: pick(p.name, locale) }),
      category: "Paid",
      price: p.price,
      priceCurrency: "UAH",
      url: `${url}#packages`,
      availability: salesClosed
        ? "https://schema.org/SoldOut"
        : "https://schema.org/InStock",
      ...(priceValidUntil && { priceValidUntil }),
    }));

  const courseLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: title[locale],
    description: description[locale],
    url,
    inLanguage: locale,
    image: previewImage?.url || mainImage?.url,
    provider: { "@id": ORG_ID },
    instructor: { "@id": PERSON_ID },
    ...(offers.length && { offers }),
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "online",
      instructor: { "@id": PERSON_ID },
      ...(flowStart && { startDate: flowStart }),
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
          flowStart,
          priceValidUntil,
          sections,
          trainer: page?.trainer,
        }}
      />
    </>
  );
};

export default CoursePage;
