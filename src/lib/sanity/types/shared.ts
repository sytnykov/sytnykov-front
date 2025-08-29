export type SanityImage = {
  url: string;
  description?: string | null;
};

export type LocalizedString = {
  uk: string;
  ru: string;
};

export type Block = {
  _key: string;
  _type: "block";
  style?: string;
  markDefs: {
    _key: string;
    _type: "link";
    href: string;
  }[];
  children: {
    _key: string;
    _type: "span";
    text: string;
    marks?: string[];
  }[];
};

export type LocalizedBlockContent = {
  uk: (Block | SanityImage)[];
  ru: (Block | SanityImage)[];
};

export type ContentChild = {
  key: string;
  text: string;
  marks: string[];
};

export type ContentMarkDef = {
  key: string;
  href: string;
};

export type FullContentBlock = {
  key: string;
  style: string;
  listItem?: string;
  children: ContentChild[];
  markDefs: ContentMarkDef[];
};

export type LocalizedFullContent = {
  uk: FullContentBlock[];
  ru: FullContentBlock[];
};

export type AccordionContent = {
  tags?: LocalizedString[];
  title: LocalizedString;
  videoUrl?: string;
};
