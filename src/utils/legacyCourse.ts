import { CourseBlock } from "@/lib/sanity/types/courseBlocks";
import { CourseItem } from "@/lib/sanity/types/courseTypes";

import { courseImage } from "./courseImage";

type Labels = {
  lessons: (count: number) => string;
  online: string;
  videos: string;
};

/**
 * Courses created before the constructor keep their content in the old fields
 * («Про що курс?» + «Структура курсу»). This turns that content into constructor
 * blocks so every course gets the new design — nothing is invented, only re-laid out.
 */
export const legacyToSections = (
  course: CourseItem,
  labels: Labels
): CourseBlock[] => {
  const modules = (course.secondBlock?.accordion ?? []).map((item, idx) => ({
    _key: `m${idx}`,
    title: item.title,
    lessons: (item.tags ?? []).map((tag, li) => ({
      _key: `m${idx}l${li}`,
      title: tag,
    })),
    videoUrl: item.videoUrl,
  }));
  const hasVideos = modules.some(m => m.videoUrl);
  const same = (text: string) => ({ uk: text, ru: text });

  const facts = [
    modules.length
      ? { icon: "layers", label: same(labels.lessons(modules.length)) }
      : null,
    { icon: "monitor", label: same(labels.online) },
    hasVideos ? { icon: "play", label: same(labels.videos) } : null,
  ].filter(Boolean) as { icon: string; label: { uk: string; ru: string } }[];

  const sections: CourseBlock[] = [
    {
      _type: "courseHeroBlock",
      _key: "hero",
      subtitle: course.description,
      image: {
        url:
          course.mainImage?.url ||
          courseImage(course.title?.uk ?? "", course.previewImage?.url),
      },
    },
  ];
  if (course.firstBlock?.content?.uk?.length) {
    sections.push({
      _type: "courseAboutBlock",
      _key: "about",
      title: course.firstBlock.title,
      content: course.firstBlock.content,
      facts,
    });
  }
  // KP order: … trainer (4) → program (5); keeps a light block before the final CTA
  sections.push({ _type: "courseTrainerBlock", _key: "trainer" });
  if (modules.length) {
    sections.push({
      _type: "courseProgramBlock",
      _key: "program",
      title: course.secondBlock?.title,
      modules,
    });
  }
  return sections;
};
