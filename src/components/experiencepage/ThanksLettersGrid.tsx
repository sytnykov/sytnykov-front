"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

export type LetterView = { url: string; alt: string; caption?: string };

type Labels = { open: string; prev: string; next: string; close: string };

/** Letters as paper cards; a click opens the full-screen viewer (as in the gallery). */
const ThanksLettersGrid = ({
  letters,
  labels,
}: {
  letters: LetterView[];
  labels: Labels;
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(0);
  const touchX = useRef<number | null>(null);
  const total = letters.length;

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

  const current = letters[index];

  return (
    <>
      <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 xl:grid-cols-4">
        {letters.map((letter, i) => (
          <li key={letter.url}>
            <button
              type="button"
              onClick={() => open(i)}
              aria-label={`${labels.open}: ${letter.alt}`}
              className="group flex w-full flex-col text-left"
            >
              <span className="relative block aspect-[3/4] w-full overflow-hidden rounded-[18px] bg-white shadow-[0_1px_2px_rgba(9,17,41,0.06),0_18px_40px_-28px_rgba(9,17,41,0.45)] transition-[transform,box-shadow] duration-500 group-hover:-translate-y-1 group-hover:shadow-[0_30px_60px_-30px_rgba(9,17,41,0.5)]">
                <Image
                  src={letter.url}
                  alt={letter.alt}
                  fill
                  sizes="(min-width: 1280px) 290px, (min-width: 768px) 30vw, 46vw"
                  className="object-contain p-2"
                />
              </span>
              {letter.caption && (
                <span className="mt-3 text-pretty text-[14px] leading-[1.4] text-dark/70">
                  {letter.caption}
                </span>
              )}
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        aria-label={current?.alt}
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
              {current?.caption && (
                <>
                  <span className="mx-2 text-white/30">·</span>
                  {current.caption}
                </>
              )}
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
            {current && (
              <Image
                key={current.url}
                src={current.url}
                alt={current.alt}
                fill
                sizes="100vw"
                className="object-contain px-2 md:px-24"
              />
            )}
          </div>
          {total > 1 && (
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
          )}
        </div>
      </dialog>
    </>
  );
};

export default ThanksLettersGrid;
