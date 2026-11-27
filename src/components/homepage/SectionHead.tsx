import { ReactNode } from "react";

import { cn } from "@/utils/cn";

interface SectionHeadProps {
  title: string;
  descr?: string;
  tone?: "light" | "dark";
  action?: ReactNode;
  className?: string;
}

/** One heading system for every home section: Micra title, Montserrat lead. */
const SectionHead = ({
  title,
  descr,
  tone = "light",
  action,
  className,
}: SectionHeadProps) => (
  <div
    className={cn(
      "mb-7 flex flex-col gap-5 md:mb-10 md:flex-row md:items-end md:justify-between md:gap-10",
      className
    )}
  >
    <div className="max-w-[720px]">
      <h2
        className={cn(
          "text-balance font-micra text-[26px] leading-[1.12] [word-spacing:-0.18em] md:text-[34px] xl:text-[44px]",
          tone === "dark" ? "text-light" : "text-dark"
        )}
      >
        {title}
      </h2>
      {descr && (
        <p
          className={cn(
            "mt-4 max-w-[560px] text-pretty text-[15px] leading-[1.55] md:mt-5 md:text-[17px]",
            tone === "dark" ? "text-white/70" : "text-dark/65"
          )}
        >
          {descr}
        </p>
      )}
    </div>
    {action && <div className="shrink-0">{action}</div>}
  </div>
);

export default SectionHead;

export const ArrowIcon = ({ className = "size-4" }: { className?: string }) => (
  <svg aria-hidden viewBox="0 0 20 20" className={className}>
    <path
      d="M4 10h11m-4-4 4 4-4 4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ArrowUpRightIcon = ({
  className = "size-4",
}: {
  className?: string;
}) => (
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

/** Pill link in the header style: label + round accent arrow. */
export const PillLink = ({
  children,
  tone = "light",
}: {
  children: ReactNode;
  tone?: "light" | "dark";
}) => (
  <span
    className={cn(
      // phones: full container width, label centred, arrow pinned right
      "group relative flex h-[50px] w-full items-center justify-center rounded-full px-14 text-[15px] font-semibold transition-colors duration-300 md:inline-flex md:h-[50px] md:w-auto md:justify-start md:gap-3 md:pl-6 md:pr-[7px]",
      tone === "dark"
        ? "bg-light text-dark hover:bg-[#dfe8ff]"
        : "bg-dark text-light hover:bg-[#13245a]"
    )}
  >
    {children}
    <span className="absolute right-[7px] grid size-9 place-items-center rounded-full bg-accent text-light transition-transform duration-300 group-hover:translate-x-0.5 md:static">
      <ArrowIcon />
    </span>
  </span>
);
