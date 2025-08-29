import { client } from "@/lib/sanity";

import { CourseCategoryItem, CourseItem } from "../types/courseTypes";

export const getAllCourses = async (): Promise<CourseItem[]> => {
  return await client.fetch<
    CourseItem[]
  >(`*[_type == "course"] | order(_createdAt desc) {
        title,
        description,
        "slug": slug.current,
        "courseType": {
          "slug": courseType->slug.current,
          "title": courseType->title
        },
        previewImage{
          "url": asset->url,
          description
        },
        mainImage{
          "url": asset->url,
          description
        },
        mainImageMobile{
          "url": asset->url,
          description
        },
        firstBlock{
          title,
          "content": {
            "uk": content.uk[]{
              "text": children[].text
            },
            "ru": content.ru[]{
              "text": children[].text
            }
          }
        },
        secondBlock{
          title,
          accordion
        }
      }`);
};

export const getCoursesByCategory = async (
  categorySlug: string
): Promise<CourseItem[]> => {
  return await client.fetch<CourseItem[]>(
    `
      *[_type == "course" && courseType->slug.current == $categorySlug] | order(_createdAt desc) {
        title,
        description,
        "slug": slug.current,
        "courseType": {
          "slug": courseType->slug.current,
          "title": courseType->title
        },
        previewImage{
          "url": asset->url,
          description
        },
        mainImage{
          "url": asset->url,
          description
        },
        mainImageMobile{
          "url": asset->url,
          description
        },
        firstBlock{
          title,
          "content": {
            "uk": content.uk[]{
              "text": children[].text
            },
            "ru": content.ru[]{
              "text": children[].text
            }
          }
        },
        secondBlock{
          title,
          accordion
        }
      }
    `,
    { categorySlug }
  );
};

export const getCourseBySlug = async (
  slug: string
): Promise<CourseItem | null> => {
  return await client.fetch<CourseItem>(
    `
      *[_type == "course" && slug.current == $slug][0] {
        title,
        description,
        "slug": slug.current,
        "courseType": {
          "slug": courseType->slug.current,
          "title": courseType->title
        },
        previewImage{
          "url": asset->url,
          description
        },
        mainImage{
          "url": asset->url,
          description
        },
        mainImageMobile{
          "url": asset->url,
          description
        },
        firstBlock{
          title,
          "content": {
            "uk": content.uk[]{
              "key": _key,
              style,
              listItem,
              level,
              "markDefs": markDefs[]{
                "key": _key,
                href
              },
              "children": children[]{
                "key": _key,
                text,
                marks
              }
            },
            "ru": content.ru[]{
              "key": _key,
              style,
              listItem,
              level,
              "markDefs": markDefs[]{
                "key": _key,
                href
              },
              "children": children[]{
                "key": _key,
                text,
                marks
              }
            }
          }
        },
        secondBlock{
          title,
          accordion
        }
      }
    `,
    { slug }
  );
};

export const getCourseCategories = async (): Promise<CourseCategoryItem[]> => {
  return await client.fetch<CourseCategoryItem[]>(`*[_type == "courseType"]{
      "slug": slug.current,
      title
      }`);
};
