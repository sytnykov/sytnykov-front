import { nanoid } from "nanoid";

import { GalleryItem } from "@/lib/sanity/types/galleryType";
import { cn } from "@/utils/cn";
import { Locale } from "@/types/locale";
import { fadeInAnimation } from "@/helpers/animation";

import AnimatedWrapper from "../shared/animated/AnimatedWrapper";
import GallerySlider from "../shared/gallerySlider/GallerySlider";

interface IGalleryPaginatedProps {
  data: GalleryItem;
  lang: Locale;
  index: number;
}

const GalleryPaginated = ({ data, lang, index }: IGalleryPaginatedProps) => {
  const { description, title, images } = data;
  const sliderId = nanoid();

  const isEven = index % 2 === 0;

  return (
    <section
      className={cn(
        "relative overflow-hidden pb-[128px] pt-[120px] xl:pb-[62px] xl:pt-[100px]",
        isEven ? "bg-light text-dark" : "bg-dark text-light"
      )}
    >
      {isEven && (
        <div className="absolute -top-[180px] left-0 h-[382px] w-[357px] max-xl:bg-[url('/images/galleryPage/gallery-paginated-decor-top-mob.webp')] xl:hidden" />
      )}

      <div className="container relative z-[5] max-w-[1280px]">
        <AnimatedWrapper animation={fadeInAnimation({ x: -50 })}>
          <h2 className="mb-4 font-micra text-[22px] xl:text-[40px] xl:leading-[1.4]">
            {title[lang]}
          </h2>
          <p className="mb-[52px] max-w-[467px] font-light xl:text-[20px]">
            {description[lang]}
          </p>
        </AnimatedWrapper>

        <AnimatedWrapper animation={fadeInAnimation({ y: 50, delay: 0.3 })}>
          <GallerySlider
            variant={isEven ? "light" : "dark"}
            imgAlt={title[lang]}
            gallery={images}
            sliderId={sliderId}
          />
        </AnimatedWrapper>
      </div>

      {isEven && (
        <div className="absolute -bottom-[240px] left-0 h-[411px] w-[360px] max-xl:bg-[url('/images/galleryPage/gallery-paginated-decor-bot-mob.webp')] xl:hidden" />
      )}
    </section>
  );
};

export default GalleryPaginated;
