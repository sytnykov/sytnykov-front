import { client } from "@/lib/sanity";
import {
  AnnouncementItem,
  PublicationItem,
} from "@/lib/sanity/types/queryTypes";

export const getAllPublications = async (): Promise<PublicationItem[]> => {
  return await client.fetch<PublicationItem[]>(`
      *[_type == "post"] | order(_createdAt desc) {
        title,
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
        "slug": slug.current,
        description,
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
          },
        gallery[]{
          "url": asset->url,
          description
        }
      }
    `);
};

export const getPaginatedPublications = async (
  limit = 3
): Promise<PublicationItem[]> => {
  return await client.fetch<PublicationItem[]>(
    `
      *[_type == "post"] | order(_createdAt desc)[0...$limit] {
        title,
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
        "slug": slug.current,
        description,
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
          },
        gallery[]{
          "url": asset->url,
          description
        }
      }
    `,
    { limit }
  );
};

export const getPublicationBySlug = async (
  slug: string
): Promise<PublicationItem> => {
  return await client.fetch<PublicationItem>(
    `
      *[_type == "post" && slug.current == $slug][0] {
        title,
        previewImage{
         "url": asset->url
        },
        mainImage{
         "url": asset->url
        },
        mainImageMobile{
         "url": asset->url
        },
        "slug": slug.current,
        description,
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
          },
        gallery[]{
          "url": asset->url
        }
      }
    `,
    { slug }
  );
};

export const getAllPublicationSlugs = async (): Promise<{ slug: string }[]> => {
  return await client.fetch<{ slug: string }[]>(
    `*[_type == "post"] { "slug": slug.current }`
  );
};

export const getAllAnnouncements = async (): Promise<AnnouncementItem[]> => {
  return await client.fetch<AnnouncementItem[]>(`
    *[_type == "announcement"] | order(startDate desc) {
      title,
      description,
      startDate,
      previewImage{
         "url": asset->url
        },
    }`);
};
