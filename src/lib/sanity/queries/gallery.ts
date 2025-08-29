import { client } from "@/lib/sanity";

import { GalleryItem } from "../types/galleryType";

export const getGallery = async (): Promise<GalleryItem[]> => {
  return await client.fetch<GalleryItem[]>(`
      *[_type == "gallery"] | order(order desc) {
        title,
        description,
        images[] {
          "url": asset->url,
          description
        }
      }
    `);
};
