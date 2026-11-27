import type { MetadataRoute } from "next";

import { client } from "@/lib/sanity";
import { ROUTES } from "@/constants/routes";
import { SITE_URL } from "@/utils/getBaseUrl";

export const revalidate = 86400;

const LOCALES = ["uk", "ru"] as const;

type Entry = MetadataRoute.Sitemap[number];

/** One URL per page with uk/ru alternates. */
const page = (
  path: string,
  priority: number,
  lastModified?: string
): Entry[] => {
  const clean = path === "/" ? "" : path;
  const languages = Object.fromEntries(
    LOCALES.map(loc => [loc, `${SITE_URL}/${loc}${clean}`])
  );
  return LOCALES.map(loc => ({
    url: `${SITE_URL}/${loc}${clean}`,
    lastModified: lastModified ? new Date(lastModified) : new Date(),
    changeFrequency: "weekly",
    priority,
    alternates: { languages },
  }));
};

type CmsData = {
  posts: { slug: string; updatedAt: string }[];
  courses: { slug: string; category: string; updatedAt: string }[];
  categories: { slug: string }[];
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let cms: CmsData = { posts: [], courses: [], categories: [] };
  try {
    cms = await client.fetch<CmsData>(`{
      "posts": *[_type == "post" && defined(slug.current)]{ "slug": slug.current, "updatedAt": _updatedAt },
      "courses": *[_type == "course" && defined(slug.current) && defined(courseType->slug.current)]{
        "slug": slug.current, "category": courseType->slug.current, "updatedAt": _updatedAt
      },
      "categories": *[_type == "courseType" && defined(slug.current)]{ "slug": slug.current }
    }`);
  } catch {
    /* CMS unavailable: still return static pages */
  }

  return [
    ...page(ROUTES.HOME, 1),
    ...page(ROUTES.EDUCATION, 0.9),
    ...page(ROUTES.SERVICES, 0.9),
    ...page(ROUTES.EXPERIENCE, 0.7),
    ...page(ROUTES.PUBLICATIONS, 0.7),
    ...page(ROUTES.ANNOUNCEMENTS, 0.6),
    ...page(ROUTES.GALLERY, 0.5),
    ...page(ROUTES.CONTACTS, 0.6),
    ...cms.categories.flatMap(c => page(`${ROUTES.EDUCATION}/${c.slug}`, 0.7)),
    ...cms.courses.flatMap(c =>
      page(`${ROUTES.EDUCATION}/${c.category}/${c.slug}`, 0.8, c.updatedAt)
    ),
    ...cms.posts.flatMap(p =>
      page(`${ROUTES.PUBLICATIONS}/${p.slug}`, 0.6, p.updatedAt)
    ),
    // legal documents are noindex, so they stay out of the sitemap
  ].filter(Boolean) as MetadataRoute.Sitemap;
}
