import { CoursePageData } from "@/lib/sanity/types/courseBlocks";

/** What every block knows about the page it is on. */
export type BlockCtx = {
  locale: string;
  courseTitle: string;
  salesClosed: boolean;
  data: CoursePageData;
  /** background for light blocks, alternated automatically */
  bg: "bg-light" | "bg-[#f3f6fd]";
};

export const formatPrice = (value: number) =>
  new Intl.NumberFormat("uk-UA").format(value).replace(/ /g, " ");

export const paragraphs = (text: string) =>
  text
    .split(/\n+/)
    .map(p => p.trim())
    .filter(Boolean);
