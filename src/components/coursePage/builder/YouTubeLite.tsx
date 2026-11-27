"use client";

import { useState } from "react";

import LineIcon from "../../homepage/LineIcon";

/** Thumbnail first, the heavy YouTube player loads only after a click. */
const YouTubeLite = ({ id, title }: { id: string; title: string }) => {
  const [play, setPlay] = useState(false);

  return (
    <div className="relative aspect-video overflow-hidden rounded-[28px] bg-dark shadow-[0_40px_80px_-40px_rgba(9,17,41,0.6)]">
      {play ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 size-full"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlay(true)}
          aria-label={title}
          className="group absolute inset-0"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
            alt=""
            loading="lazy"
            className="size-full object-cover opacity-80 transition-opacity duration-300 group-hover:opacity-95"
          />
          <span className="absolute inset-0 bg-[linear-gradient(0deg,rgba(9,17,41,0.6),rgba(9,17,41,0.1))]" />
          <span className="absolute left-1/2 top-1/2 grid size-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-accent text-light shadow-[0_20px_50px_-10px_rgba(81,136,255,0.9)] transition-transform duration-300 group-hover:scale-105 md:size-24">
            <LineIcon name="play" className="ml-1 size-8 md:size-9" />
          </span>
        </button>
      )}
    </div>
  );
};

export default YouTubeLite;
