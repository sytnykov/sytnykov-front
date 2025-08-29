"use client";

import { useRef, useState } from "react";
import Image from "next/image";

import { Navigation, Pagination as SwiperPagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper/types";

import { SanityImage } from "@/lib/sanity/types/shared";
import { cn } from "@/utils/cn";
import { fadeInAnimation } from "@/helpers/animation";

import AnimatedWrapper from "../animated/AnimatedWrapper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Pagination from "../pagination/Pagination";

interface IGallerySliderProps {
  gallery: SanityImage[];
  variant?: "light" | "dark";
  imgAlt: string;
  sliderId: string;
  wrapperClassName?: string;
  isDecor?: boolean;
}

const GallerySlider = ({
  gallery,
  variant = "light",
  imgAlt,
  sliderId,
  wrapperClassName,
  isDecor = true,
}: IGallerySliderProps) => {
  const prefix = `slider-${sliderId}`;

  const swiperRef = useRef<SwiperType | null>(null);

  const [group, setGroup] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = Math.max(1, Math.ceil(gallery.length / group));

  const goToPage = (page: number) => {
    const clamped = Math.max(1, Math.min(page, totalPages));
    const targetIndex = (clamped - 1) * group;
    const sw = swiperRef.current;
    if (!sw) return;

    if (sw.params.loop) {
      sw.slideToLoop(targetIndex);
    } else {
      sw.slideTo(targetIndex);
    }
  };

  return (
    <div
      className={cn(
        "relative mx-auto max-w-[400px] pb-[74px] md:max-w-[700px] xl:max-w-[1280px]",
        wrapperClassName
      )}
    >
      <Swiper
        modules={[Navigation, SwiperPagination]}
        onSlideChange={swiper => {
          swiper.pagination.render();
          swiper.pagination.update();
        }}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 12,
          },
          767.98: {
            slidesPerView: 2,
            spaceBetween: 16,
          },
          1279.98: {
            slidesPerView: 3,
            spaceBetween: 24,
          },
        }}
        navigation={{
          prevEl: `.${prefix}-prev`,
          nextEl: `.${prefix}-next`,
        }}
        onSwiper={sw => {
          swiperRef.current = sw;
          const g = (sw.params.slidesPerGroup as number) || 1;
          setGroup(g);
          setCurrentPage(Math.floor(sw.realIndex / g) + 1);

          sw.on("breakpoint", s => {
            const g2 = (s.params.slidesPerGroup as number) || 1;
            setGroup(g2);
            setCurrentPage(Math.floor(s.realIndex / g2) + 1);
          });

          sw.on("slideChange", s => {
            const g3 = (s.params.slidesPerGroup as number) || 1;
            setCurrentPage(Math.floor(s.realIndex / g3) + 1);
          });
        }}
        className={`mySwiper${prefix}`}
      >
        {gallery.map(({ url, description }) => (
          <SwiperSlide key={url} className="relative">
            <div className="relative h-[296px] md:h-[330px] xl:h-[380px]">
              <Image
                src={url}
                alt={description || imgAlt}
                fill
                sizes="(min-width: 768px) 40vw, (min-width: 1280px) 33vw, 100vw"
                className="rounded-xl object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <AnimatedWrapper animation={fadeInAnimation({ y: 50, delay: 0.6 })}>
        <div className="absolute -bottom-[74px] left-1/2 z-10 -translate-x-1/2">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={goToPage}
            variant={variant}
            className="gap-6"
          />
        </div>
      </AnimatedWrapper>

      {variant === "light" && isDecor && (
        <div className="absolute -right-[25px] -top-[220px] h-[417px] w-[399px] max-xl:hidden xl:bg-[url('/images/galleryPage/gallery-paginated-decor-desk.webp')]" />
      )}
    </div>
  );
};

export default GallerySlider;
