"use client";

import { useState } from "react";
import Image from "next/image";

import { Link } from "@/i18n/navigation";
import { cn } from "@/utils/cn";

export type AccordionCourse = {
  href: string;
  title: string;
  description: string;
  type: string;
  image: string;
};

const ArrowUpRight = ({ className = "size-4" }: { className?: string }) => (
  <svg aria-hidden viewBox="0 0 20 20" className={className}>
    <path
      d="M6 14 14 6m-6.5 0H14v6.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * Tall graphic cards. On desktop the hovered/focused card widens and reveals
 * its description; on phones/tablets it is a swipeable row of open cards.
 */
const CoursesAccordion = ({
  items,
  moreLabel,
}: {
  items: AccordionCourse[];
  moreLabel: string;
}) => {
  const [active, setActive] = useState(0);

  return (
    <ul className="-mx-8 flex snap-x snap-mandatory scroll-px-8 gap-3 overflow-x-auto px-8 pb-2 [scrollbar-width:none] lg:mx-0 lg:h-[520px] lg:snap-none lg:overflow-visible lg:px-0 lg:pb-0 [&::-webkit-scrollbar]:hidden">
      {items.map((item, idx) => {
        const isOpen = idx === active;
        return (
          <li
            key={item.href}
            onMouseEnter={() => setActive(idx)}
            onFocus={() => setActive(idx)}
            className={cn(
              "relative h-[440px] w-[88%] shrink-0 snap-start md:h-[480px] md:w-[46%] lg:h-full lg:w-auto lg:min-w-0 lg:transition-[flex-grow] lg:duration-[650ms] lg:ease-[cubic-bezier(0.22,1,0.36,1)]",
              isOpen ? "lg:flex-[2.5]" : "lg:flex-1"
            )}
          >
            <Link
              href={item.href}
              className={cn(
                "group relative isolate flex h-full flex-col justify-between overflow-hidden rounded-[26px] p-5 text-light outline-none ring-accent ring-offset-2 transition-shadow duration-500 focus-visible:ring-2 md:p-6",
                "bg-dark",
                isOpen && "lg:shadow-[0_34px_70px_-34px_rgba(81,136,255,0.75)]"
              )}
            >
              {/* enhanced event photo + brand tint + reading gradient */}
              <Image
                src={item.image}
                alt=""
                fill
                sizes="(min-width: 1024px) 560px, (min-width: 768px) 46vw, 88vw"
                className="-z-20 object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
              <span
                aria-hidden
                className="absolute inset-0 -z-10 bg-[#0b1a44] opacity-25 mix-blend-multiply"
              />
              <span
                aria-hidden
                className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(9,17,41,0.45)_0%,rgba(9,17,41,0)_24%,rgba(9,17,41,0)_42%,rgba(9,17,41,0.92)_90%)]"
              />
              {/* hairline inner border */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-[26px] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)]"
              />

              <div className="flex items-start justify-between gap-2">
                <span
                  className={cn(
                    "truncate rounded-full bg-white/10 px-3 py-1.5 text-[12px] font-medium shadow-[inset_0_0_0_1px_rgba(255,255,255,0.14)] backdrop-blur-md transition-opacity duration-300",
                    !isOpen && "lg:opacity-0"
                  )}
                >
                  {item.type}
                </span>
                <span
                  className={cn(
                    "grid size-10 shrink-0 place-items-center rounded-full transition-colors duration-300",
                    isOpen
                      ? "bg-accent text-light"
                      : "bg-light text-dark lg:bg-white/10 lg:text-light lg:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.14)]"
                  )}
                >
                  <ArrowUpRight />
                </span>
              </div>

              <div>
                <h3
                  className={cn(
                    "text-balance font-semibold leading-[1.18] tracking-[-0.015em] transition-[font-size] duration-500",
                    "text-[21px] md:text-[24px]",
                    isOpen ? "lg:text-[30px]" : "lg:text-[18px]"
                  )}
                >
                  {item.title}
                </h3>
                <div
                  className={cn(
                    "grid transition-[grid-template-rows,opacity] duration-500",
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[1fr] opacity-100 lg:grid-rows-[0fr] lg:opacity-0"
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="mt-3 line-clamp-3 max-w-[430px] text-[14px] leading-[1.55] text-white/75 md:text-[15px]">
                      {item.description}
                    </p>
                    <span className="mt-5 inline-flex h-11 items-center gap-3 rounded-full bg-light pl-5 pr-[5px] text-[14px] font-semibold text-dark transition-colors duration-300 group-hover:bg-[#dfe8ff]">
                      {moreLabel}
                      <span className="grid size-[34px] place-items-center rounded-full bg-accent text-light">
                        <ArrowUpRight className="size-3.5" />
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default CoursesAccordion;
