import { CoursePageData, pick } from "@/lib/sanity/types/courseBlocks";
import { normalizeTitle } from "@/utils/courseImage";

import AboutBlock from "./AboutBlock";
import AudienceBlock from "./AudienceBlock";
import FaqBlock from "./FaqBlock";
import FinalCta from "./FinalCta";
import FormatBlock from "./FormatBlock";
import HeroBlock from "./HeroBlock";
import { GalleryBlock, TextImageBlock, VideoBlock } from "./MediaBlocks";
import PackagesBlock from "./PackagesBlock";
import ProgramBlock from "./ProgramBlock";
import ResultsBlock from "./ResultsBlock";
import ReviewsBlock from "./ReviewsBlock";
import TrainerBlock from "./TrainerBlock";
import WhyBlock from "./WhyBlock";
import { BlockCtx } from "./shared";

/** Dark blocks keep their own background; light blocks alternate white / soft blue. */
const DARK = new Set([
  "courseHeroBlock",
  "courseTrainerBlock",
  "coursePackagesBlock",
]);

/** Renders a course page from the blocks chosen in the admin, in their order. */
const CourseBuilder = ({
  data,
  locale,
}: {
  data: CoursePageData;
  locale: string;
}) => {
  const salesClosed = data.flowStart
    ? new Date(`${data.flowStart}T23:59:59`).getTime() < Date.now()
    : false;
  const courseTitle = normalizeTitle(pick(data.title, locale));
  const base = { locale, courseTitle, salesClosed, data };

  const sections = data.sections;
  const hero = sections.find(s => s._type === "courseHeroBlock");
  let light = 0;

  return (
    <>
      {/* the first screen always exists: from the block or from the course itself */}
      <HeroBlock
        block={hero && hero._type === "courseHeroBlock" ? hero : undefined}
        ctx={{ ...base, bg: "bg-light" }}
      />
      {sections.map(block => {
        if (block._type === "courseHeroBlock") return null;
        const bg: BlockCtx["bg"] = DARK.has(block._type)
          ? "bg-light"
          : light++ % 2 === 0
            ? "bg-[#f3f6fd]"
            : "bg-light";
        const ctx: BlockCtx = { ...base, bg };

        switch (block._type) {
          case "courseAboutBlock":
            return <AboutBlock key={block._key} block={block} ctx={ctx} />;
          case "courseResultsBlock":
            return <ResultsBlock key={block._key} block={block} ctx={ctx} />;
          case "courseAudienceBlock":
            return <AudienceBlock key={block._key} block={block} ctx={ctx} />;
          case "courseWhyBlock":
            return <WhyBlock key={block._key} block={block} ctx={ctx} />;
          case "courseTrainerBlock":
            return <TrainerBlock key={block._key} block={block} ctx={ctx} />;
          case "courseProgramBlock":
            return <ProgramBlock key={block._key} block={block} ctx={ctx} />;
          case "courseFormatBlock":
            return <FormatBlock key={block._key} block={block} ctx={ctx} />;
          case "coursePackagesBlock":
            return <PackagesBlock key={block._key} block={block} ctx={ctx} />;
          case "courseReviewsBlock":
            return <ReviewsBlock key={block._key} block={block} ctx={ctx} />;
          case "courseFaqBlock":
            return <FaqBlock key={block._key} block={block} ctx={ctx} />;
          case "courseVideoBlock":
            return <VideoBlock key={block._key} block={block} ctx={ctx} />;
          case "courseTextImageBlock":
            return <TextImageBlock key={block._key} block={block} ctx={ctx} />;
          case "courseGalleryBlock":
            return <GalleryBlock key={block._key} block={block} ctx={ctx} />;
          default:
            return null;
        }
      })}
      <FinalCta
        course={courseTitle}
        afterDark={DARK.has(sections[sections.length - 1]?._type ?? "")}
      />
    </>
  );
};

export default CourseBuilder;
