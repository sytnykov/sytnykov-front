"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/utils/cn";

import AnimatedListItem from "../animated/AnimatedListItem";
import { MinusIcon, PlusIcon } from "../icons";
import { AccordionItem } from "./type";

interface AccordionRowProps {
  data: AccordionItem;
  isOpen: boolean;
  onClick: () => void;
}

const AccordionRow = ({ data, isOpen, onClick }: AccordionRowProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState("0px");

  const { descr, title } = data;

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? `${contentRef.current.scrollHeight}px` : "0px");
    }
  }, [isOpen]);

  const buttonStyles = "absolute inset-0 transition-opacity duration-300";

  return (
    <AnimatedListItem>
      <button
        type="button"
        onClick={onClick}
        className="flex w-full items-center justify-between text-left font-micra text-[20px] uppercase leading-[24px] xl:text-[24px] xl:tracking-[1px]"
      >
        {title}

        <div className="relative h-7 w-7">
          <PlusIcon
            className={cn(buttonStyles, isOpen ? "opacity-0" : "opacity-100")}
          />
          <MinusIcon
            className={cn(buttonStyles, isOpen ? "opacity-100" : "opacity-0")}
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
        {descr && descr.length > 0 && (
          <ul className="flex flex-col gap-3 pt-6">
            {descr.map((item, index) => (
              <p key={index} className="text-[13px] font-light xl:text-[14px]">
                {item}
              </p>
            ))}
          </ul>
        )}
      </div>
    </AnimatedListItem>
  );
};

export default AccordionRow;
