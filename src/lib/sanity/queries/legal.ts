import { client } from "@/lib/sanity";
import { FullContentBlock, LocalizedString } from "@/lib/sanity/types/shared";

export type LegalPageItem = {
  title?: LocalizedString;
  updatedAt?: string;
  content?: { uk?: FullContentBlock[]; ru?: FullContentBlock[] };
};

const blocks = (lang: string) => `${lang}: content.${lang}[_type == "block"]{
  "key": _key,
  style,
  listItem,
  level,
  "markDefs": markDefs[]{ "key": _key, href },
  "children": children[]{ "key": _key, text, "marks": coalesce(marks, []) }
}`;

/** Legal document edited in the admin; null until it is created there. */
export const getLegalPage = async (
  slug: string
): Promise<LegalPageItem | null> => {
  try {
    return await client.fetch<LegalPageItem | null>(
      `*[_type == "legalPage" && docType == $slug] | order(_updatedAt desc)[0]{
        title,
        "updatedAt": coalesce(updatedAt, _updatedAt),
        "content": { ${blocks("uk")}, ${blocks("ru")} }
      }`,
      { slug }
    );
  } catch {
    return null;
  }
};
