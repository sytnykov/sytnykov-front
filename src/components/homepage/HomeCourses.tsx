import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { client } from "@/lib/sanity";
import { getAllCourses } from "@/lib/sanity/queries/courses";
import { ROUTES } from "@/constants/routes";
import { Locale } from "@/types/locale";

import CoursesAccordion, { AccordionCourse } from "./CoursesAccordion";
import SectionHead, { PillLink } from "./SectionHead";

/** Some titles in the CMS are typed in caps — show them in sentence case. */
const normalizeTitle = (title: string) =>
  title === title.toUpperCase()
    ? title.charAt(0) + title.slice(1).toLowerCase()
    : title;

/** Flagship courses first, each with its own event photo. */
const FEATURED: { match: RegExp; image: string }[] = [
  { match: /податк|налог/i, image: "/images/homepage/courses/tax.webp" },
  { match: /касац|кассац/i, image: "/images/homepage/courses/cassation.webp" },
  { match: /промов|речи|речь/i, image: "/images/homepage/courses/speech.webp" },
  { match: /оскарж|обжал/i, image: "/images/homepage/courses/appeal.webp" },
];

type Category = {
  slug: string;
  title: { uk: string; ru: string };
  count: number;
};

const getCategories = async (): Promise<Category[]> =>
  client.fetch<Category[]>(
    `*[_type == "courseType"]{ "slug": slug.current, title, "count": count(*[_type == "course" && references(^._id)]) } | order(count desc)`
  );

const HomeCourses = async ({ lang }: { lang: Locale }) => {
  const t = await getTranslations("homepage.coursesV2");

  const [all, categories] = await Promise.all([
    getAllCourses().catch(() => []),
    getCategories().catch(() => [] as Category[]),
  ]);

  const used = new Set<string>();
  const items: AccordionCourse[] = [];
  for (const { match, image } of FEATURED) {
    const course = all.find(
      c => !used.has(c.slug) && match.test(c.title?.uk ?? "")
    );
    if (!course) continue;
    used.add(course.slug);
    items.push({
      href: `${ROUTES.EDUCATION}/${course.courseType.slug}/${course.slug}`,
      title: normalizeTitle(course.title[lang]),
      description: course.description?.[lang] ?? "",
      type: course.courseType?.title?.[lang] ?? t("fallbackType"),
      image,
    });
  }

  return (
    <section className="relative isolate overflow-hidden bg-light py-14 md:py-20 xl:py-[100px]">
      {/* decor: soft light + rings behind the school badge */}
      <div
        aria-hidden
        className="absolute -right-[180px] -top-[220px] -z-10 size-[640px] rounded-full bg-[radial-gradient(closest-side,rgba(81,136,255,0.16),rgba(81,136,255,0))]"
      />
      <svg
        aria-hidden
        viewBox="0 0 600 600"
        className="absolute -right-[170px] -top-[200px] -z-10 w-[620px] max-md:hidden"
      >
        {[290, 230, 170, 110].map((r, i) => (
          <circle
            key={r}
            cx="300"
            cy="300"
            r={r}
            fill="none"
            stroke="#5188ff"
            strokeOpacity={0.1 + i * 0.04}
            strokeDasharray={i === 0 ? "2 7" : undefined}
          />
        ))}
      </svg>

      <div className="container max-w-[1280px]">
        <div className="mb-7 md:mb-10">
          <SectionHead
            title={t("title")}
            descr={t("descr")}
            className="mb-0 md:mb-0"
          />
        </div>

        {items.length === 0 ? (
          <p className="text-dark/60">{t("empty")}</p>
        ) : (
          <CoursesAccordion items={items} moreLabel={t("more")} />
        )}

        {/* formats as real, clickable chips */}
        <div className="mt-4 flex flex-col gap-3 md:mt-5 lg:flex-row lg:items-center lg:justify-between">
          {categories.length > 0 && (
            <div className="flex min-w-0 flex-col gap-3">
              <ul className="-mx-8 flex gap-2 overflow-x-auto px-8 [scrollbar-width:none] md:mx-0 md:flex-wrap md:overflow-visible md:px-0 [&::-webkit-scrollbar]:hidden">
                {categories.map(cat => (
                  <li key={cat.slug}>
                    <Link
                      href={`${ROUTES.EDUCATION}/${cat.slug}`}
                      className="group inline-flex h-[50px] shrink-0 items-center gap-2.5 whitespace-nowrap rounded-full bg-[#eef2fc] pl-5 pr-[7px] text-[15px] font-semibold text-dark transition-colors duration-300 hover:bg-dark hover:text-light"
                    >
                      {cat.title[lang]}
                      <span className="grid size-9 place-items-center rounded-full bg-white text-[13px] font-semibold tabular-nums text-dark transition-colors duration-300 group-hover:bg-accent-strong group-hover:text-light">
                        {cat.count}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <Link
            href={ROUTES.EDUCATION}
            className="block w-full shrink-0 md:w-auto md:self-start lg:self-auto"
          >
            <PillLink>{t("button")}</PillLink>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomeCourses;
