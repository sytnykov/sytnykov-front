"use client";

import { useEffect, useRef, useState } from "react";

import { AccordionContent } from "@/lib/sanity/types/shared";
import { cn } from "@/utils/cn";
import { extractVideoId } from "@/utils/extractVideoId";
import { Locale } from "@/types/locale";

import AnimatedListItem from "../animated/AnimatedListItem";
import { ArrowInCircleIcon } from "../icons";

interface IAccordionCourseRowProps {
  data: AccordionContent;
  isOpen: boolean;
  onClick: () => void;
  lang?: Locale;
}

const AccordionCourseRow = ({
  data,
  isOpen,
  onClick,
  lang = "uk",
}: IAccordionCourseRowProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState("0px");

  const { title, tags, videoUrl } = data;

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? `${contentRef.current.scrollHeight}px` : "0px");
    }
  }, [isOpen]);

  return (
    <AnimatedListItem>
      <div className="relative rounded-md p-5 text-light before:absolute before:inset-0 before:z-[-1] before:rounded-md before:bg-[linear-gradient(90deg,_#304F94_0%,_#6582C2_100%)] before:p-[1px] before:content-[''] after:absolute after:inset-[1px] after:z-[-1] after:rounded-md after:bg-[linear-gradient(94.05deg,_#091129_-15.57%,_#001C58_140.61%)] after:content-[''] xl:p-6">
        <button
          type="button"
          onClick={onClick}
          className="flex w-full items-center justify-between gap-6 text-left text-[14px] font-medium transition-transform xl:text-[20px]"
        >
          {title[lang]}

          <div
            className={cn(
              "flex size-12 shrink-0 items-center justify-center rounded-lg bg-light text-dark xl:size-[70px]"
            )}
          >
            <ArrowInCircleIcon
              className={cn(
                "h-[31px] w-[31px] transition-transform",
                isOpen ? "-rotate-90" : "rotate-0"
              )}
            />
          </div>
        </button>

        <div
          ref={contentRef}
          style={{
            maxHeight: height,
            overflow: "hidden",
            transition: "max-height 0.3s ease",
          }}
        >
          <ul className="mt-8 flex flex-col items-center justify-center gap-4 transition-transform md:flex-row md:flex-wrap md:justify-start xl:mb-4">
            {tags?.map((item, index) => (
              <li
                key={index}
                className="rounded-md bg-light px-5 py-3 text-[12px] font-medium leading-[1.4] text-dark max-md:w-full max-md:max-w-[400px] xl:text-[14px]"
              >
                <p>{item[lang]}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {videoUrl && (
        <div
          className={cn(
            "aspect-video w-full overflow-hidden transition-all duration-300 ease-in-out",
            isOpen ? "mt-6 max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <iframe
            src={`https://www.youtube.com/embed/${extractVideoId(videoUrl)}`}
            title="YouTube video"
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
            allowFullScreen
            className="h-full w-full rounded-lg"
          />
        </div>
      )}
    </AnimatedListItem>
  );
};

export default AccordionCourseRow;
