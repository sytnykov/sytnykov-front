import { client } from "@/lib/sanity";

import { LocalizedString } from "../types/shared";

export type ThanksLetter = {
  url: string;
  author?: string;
  caption?: Partial<LocalizedString>;
};

/** Letters of gratitude (admin: «Листи вдячності»), ordered, newest first. */
export const getThanksLetters = async (): Promise<ThanksLetter[]> =>
  client.fetch<ThanksLetter[]>(`
    *[_type == "thanksLetter" && defined(image.asset)]
      | order(coalesce(order, 1e9) asc, _createdAt desc) {
        "url": image.asset->url,
        author,
        caption
      }
  `);
