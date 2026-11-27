import { client } from "@/lib/sanity";
import { L10n } from "@/lib/sanity/types/courseBlocks";

export type SchemeItem = {
  title?: L10n;
  note?: L10n;
  course?: { slug?: string; category?: string } | null;
};

export type ProgramSchemeData = {
  title?: L10n;
  descr?: L10n;
  chain?: SchemeItem[];
  extrasTitle?: L10n;
  extras?: SchemeItem[];
};

const item = `{ title, note, "course": course->{ "slug": slug.current, "category": courseType->slug.current } }`;

/** The «Правовий конструктор» scheme from the admin, plus all course slugs for matching. */
export const getProgramScheme = async () =>
  client
    .fetch<{
      scheme: ProgramSchemeData | null;
      courses: { title?: string; slug?: string; category?: string }[];
    }>(
      `{
        "scheme": *[_type == "programScheme"][0]{ title, descr, extrasTitle, "chain": chain[]${item}, "extras": extras[]${item} },
        "courses": *[_type == "course"]{ "title": title.uk, "slug": slug.current, "category": courseType->slug.current }
      }`
    )
    .catch(() => ({ scheme: null, courses: [] }));
