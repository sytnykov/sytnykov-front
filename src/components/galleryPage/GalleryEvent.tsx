"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

import { SanityImage } from "@/lib/sanity/types/shared";
import { cn } from "@/utils/cn";

type Labels = {
  allPhotos: string;
  photo: string;
  prev: string;
  next: string;
  close: string;
};

// bento: one hero photo + four tiles; on phones the hero + two tiles
const TILE = [
  "col-span-2 aspect-[4/3] md:aspect-[16/9] lg:row-span-2 lg:aspect-auto",
  "aspect-square lg:aspect-auto",
  "aspect-square lg:aspect-auto",
  "max-lg:hidden",
  "max-lg:hidden",
];

/** One event: bento of photos + a full-screen viewer for the whole set. */
const GalleryEvent = ({
  id,
  title,
  description,
  images,
  labels,
  tone,
}: {
  id: string;
  title: string;
  description: string;
  images: SanityImage[];
  labels: Labels;
  tone: "white" | "soft";
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(0);
  const touchX = useRef<number | null>(null);
  const total = images.length;
  const preview = images.slice(0, 5);

  const open = (i: number) => {
    setIndex(i);
    dialogRef.current?.showModal();
  };
  const go = useCallback(
    (step: number) => setIndex(i => (i + step + total) % total),
    [total]
  );

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    dialog.addEventListener("keydown", onKey);
    return () => dialog.removeEventListener("keydown", onKey);
  }, [go]);

  const alt = (i: number) => `${title} — ${labels.photo} ${i + 1}`;

  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-24 py-14 md:py-20 xl:py-[100px]",
        tone === "white" ? "bg-white" : "bg-[#f3f6fd]"
      )}
    >
      <div className="container max-w-[1280px]">
        <div className="mb-7 flex flex-col gap-5 md:mb-10 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
          <div className="max-w-[820px]">
            <h2 className="text-balance text-[24px] font-semibold leading-[1.2] text-dark md:text-[30px] xl:text-[36px]">
              {title}
            </h2>
            <p className="mt-4 max-w-[640px] text-pretty text-[15px] leading-[1.55] text-dark/65 md:text-[17px]">
              {description}
            </p>
          </div>
          <button
            type="button"
            onClick={() => open(0)}
            className="flex h-[50px] shrink-0 items-center justify-center gap-2.5 rounded-full bg-dark px-6 text-[15px] font-semibold text-light transition-colors duration-300 hover:bg-accent-strong md:w-[250px] md:self-start lg:self-auto"
          >
            <svg
              aria-hidden
              viewBox="0 0 20 20"
              className="size-[18px] text-accent"
            >
              <path
                d="M3 6.5A1.5 1.5 0 0 1 4.5 5h11A1.5 1.5 0 0 1 17 6.5v8a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 3 14.5v-8Zm0 6 3.5-3.5 3 3 2-2L17 15"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
            </svg>
            {labels.allPhotos} · {total}
          </button>
        </div>

        <ul className="grid grid-cols-2 gap-2.5 md:gap-3 lg:h-[520px] lg:grid-cols-4 lg:grid-rows-2 xl:h-[600px]">
          {preview.map((img, i) => {
            const rest = total - preview.length;
            const isLast = i === preview.length - 1 && rest > 0;
            return (
              <li key={img.url} className={cn("relative", TILE[i])}>
                <button
                  type="button"
                  onClick={() => open(i)}
                  aria-label={alt(i)}
                  className="group relative block size-full overflow-hidden rounded-[20px] bg-dark/10 md:rounded-[24px]"
                >
                  <Image
                    src={img.url}
                    alt={alt(i)}
                    fill
                    sizes={
                      i === 0
                        ? "(min-width: 1024px) 620px, 92vw"
                        : "(min-width: 1024px) 310px, 46vw"
                    }
                    className="object-cover object-[50%_30%] transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  {isLast && (
                    <span className="absolute inset-0 grid place-items-center bg-dark/60 text-[22px] font-semibold text-light backdrop-blur-[2px] max-lg:hidden">
                      +{rest}
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <dialog
        ref={dialogRef}
        aria-label={title}
        className="m-0 h-dvh max-h-none w-screen max-w-none bg-[#050a19]/95 p-0 text-light backdrop:bg-black/70"
        onClick={e =>
          e.target === e.currentTarget && dialogRef.current?.close()
        }
      >
        <div
          className="relative flex h-full flex-col"
          onTouchStart={e => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={e => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
            touchX.current = null;
          }}
        >
          <div className="flex items-center justify-between gap-4 px-4 py-3 md:px-8 md:py-5">
            <p className="min-w-0 truncate text-[14px] font-medium text-white/70">
              <span className="tabular-nums text-light">
                {index + 1} / {total}
              </span>
              <span className="mx-2 text-white/30">·</span>
              {title}
            </p>
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              aria-label={labels.close}
              className="grid size-11 shrink-0 place-items-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
            >
              <svg aria-hidden viewBox="0 0 20 20" className="size-5">
                <path
                  d="m5 5 10 10M15 5 5 15"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
          <div className="relative mb-0 min-h-0 flex-1 md:mb-8">
            {total > 0 && (
              <Image
                key={images[index].url}
                src={images[index].url}
                alt={alt(index)}
                fill
                sizes="100vw"
                className="object-contain px-2 md:px-24"
              />
            )}
          </div>
          <div className="flex items-center justify-center gap-3 px-4 py-4 md:absolute md:inset-x-0 md:top-1/2 md:-translate-y-1/2 md:justify-between md:px-6 md:py-0">
            {[
              { step: -1, label: labels.prev, d: "M12 4 6 10l6 6" },
              { step: 1, label: labels.next, d: "m8 4 6 6-6 6" },
            ].map(b => (
              <button
                key={b.step}
                type="button"
                onClick={() => go(b.step)}
                aria-label={b.label}
                className="grid size-12 place-items-center rounded-full bg-white/10 transition-colors hover:bg-accent-strong md:size-14"
              >
                <svg aria-hidden viewBox="0 0 20 20" className="size-5">
                  <path
                    d={b.d}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            ))}
          </div>
        </div>
      </dialog>
    </section>
  );
};

export default GalleryEvent;
