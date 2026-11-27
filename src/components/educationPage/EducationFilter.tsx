import { Link } from "@/i18n/navigation";
import { CourseCategoryItem } from "@/lib/sanity/types/courseTypes";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/utils/cn";
import { Locale } from "@/types/locale";

/** Category chips: real links, so every category has its own address. */
const EducationFilter = ({
  lang,
  currentCourseCategory,
  courseCategories,
  allLabel,
}: {
  lang: Locale;
  currentCourseCategory: string | undefined;
  courseCategories: CourseCategoryItem[];
  allLabel: string;
}) => {
  const chips = [
    { slug: undefined, label: allLabel },
    ...courseCategories.map(c => ({
      slug: c.slug,
      label: c.title[lang] || c.title.uk,
    })),
  ];

  return (
    <nav className="-mx-8 mb-6 overflow-x-auto px-8 [scrollbar-width:none] md:mx-0 md:mb-8 md:px-0 [&::-webkit-scrollbar]:hidden">
      <ul className="flex w-max gap-2.5 md:w-auto md:flex-wrap">
        {chips.map(({ slug, label }) => {
          const active = slug === currentCourseCategory;
          return (
            <li key={slug ?? "all"}>
              <Link
                href={
                  slug
                    ? `${ROUTES.EDUCATION}/${slug}#courses`
                    : `${ROUTES.EDUCATION}#courses`
                }
                scroll={false}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex h-[46px] items-center whitespace-nowrap rounded-full px-5 text-[14px] font-semibold transition-colors duration-300 md:h-[50px] md:px-6 md:text-[15px]",
                  active
                    ? "bg-dark text-light"
                    : "bg-light text-dark shadow-[inset_0_0_0_1px_rgba(9,17,41,0.1)] hover:bg-[#e6ecfa]"
                )}
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default EducationFilter;
