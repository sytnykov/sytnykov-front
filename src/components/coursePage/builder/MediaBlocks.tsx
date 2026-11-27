import { getTranslations } from "next-intl/server";
import Image from "next/image";

import {
  GalleryBlock as Gallery,
  TextImageBlock as TextImage,
  VideoBlock as Video,
  pick,
} from "@/lib/sanity/types/courseBlocks";
import { cn } from "@/utils/cn";
import { extractVideoId } from "@/utils/extractVideoId";

import SectionHead from "../../homepage/SectionHead";
import JsonLd from "../../seo/JsonLd";
import YouTubeLite from "./YouTubeLite";
import { BlockCtx, paragraphs } from "./shared";

/** + YouTube video (e.g. 30–60 s invitation from the lecturer). */
export const VideoBlock = ({ block, ctx }: { block: Video; ctx: BlockCtx }) => {
  const id = extractVideoId(block.videoUrl ?? "");
  if (!id) return null;
  const title = pick(block.title, ctx.locale);
  const caption = pick(block.caption, ctx.locale);
  // Google rejects VideoObject without uploadDate, so skip the markup then
  const videoLd = block.uploadDate && {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: title || ctx.courseTitle,
    description: caption || ctx.courseTitle,
    thumbnailUrl: [
      `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`,
      `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
    ],
    uploadDate: block.uploadDate,
    embedUrl: `https://www.youtube.com/embed/${id}`,
    url: `https://www.youtube.com/watch?v=${id}`,
    inLanguage: ctx.locale === "ru" ? "ru" : "uk",
  };

  return (
    <section className={cn("py-14 md:py-20 xl:py-[100px]", ctx.bg)}>
      {videoLd && <JsonLd data={videoLd} />}
      <div className="container grid max-w-[1280px] grid-cols-1 items-center gap-6 lg:grid-cols-12 lg:gap-10">
        {(title || caption) && (
          <div className="lg:col-span-4">
            <SectionHead
              title={title}
              descr={caption}
              className="mb-0 md:mb-0"
            />
          </div>
        )}
        <div className={title || caption ? "lg:col-span-8" : "lg:col-span-12"}>
          <YouTubeLite id={id} title={title || ctx.courseTitle} />
        </div>
      </div>
    </section>
  );
};

/** + Text with a photo. */
export const TextImageBlock = ({
  block,
  ctx,
}: {
  block: TextImage;
  ctx: BlockCtx;
}) => {
  if (!block.image?.url) return null;
  const title = pick(block.title, ctx.locale);

  return (
    <section className={cn("py-14 md:py-20 xl:py-[100px]", ctx.bg)}>
      <div className="container grid max-w-[1280px] grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-14">
        <div className={cn(block.imageLeft && "lg:order-last")}>
          {title && <SectionHead title={title} className="md:mb-6" />}
          <div className="flex flex-col gap-4 text-[15px] leading-[1.65] text-dark/75 md:text-[17px]">
            {paragraphs(pick(block.text, ctx.locale)).map(p => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
        <div className="relative h-[320px] overflow-hidden rounded-[28px] md:h-[440px]">
          <Image
            src={block.image.url}
            alt={title}
            fill
            sizes="(min-width: 1024px) 600px, 92vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
};

/** + Photo gallery of previous streams. */
export const GalleryBlock = async ({
  block,
  ctx,
}: {
  block: Gallery;
  ctx: BlockCtx;
}) => {
  const t = await getTranslations("courseBuilder");
  const images = (block.images ?? [])
    .map(i => i?.url)
    .filter(Boolean) as string[];
  if (images.length < 2) return null;

  return (
    <section className={cn("py-14 md:py-20 xl:py-[100px]", ctx.bg)}>
      <div className="container max-w-[1280px]">
        <SectionHead
          title={
            pick(block.title, ctx.locale) || t("defaults.courseGalleryBlock")
          }
        />
        <ul className="grid auto-rows-[160px] grid-cols-2 gap-3 md:auto-rows-[200px] md:grid-cols-4 md:gap-4">
          {images.slice(0, 8).map((src, idx) => (
            <li
              key={src}
              className={cn(
                "relative overflow-hidden rounded-[20px]",
                idx === 0 && "col-span-2 row-span-2"
              )}
            >
              <Image
                src={src}
                alt=""
                fill
                sizes={
                  idx === 0
                    ? "(min-width: 768px) 50vw, 92vw"
                    : "(min-width: 768px) 25vw, 46vw"
                }
                className="object-cover transition-transform duration-700 hover:scale-[1.04]"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
