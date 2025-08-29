"use client";

import { Fragment } from "react";
import { useTranslations } from "next-intl";

import { cn } from "@/utils/cn";

import IconButtonOrLink from "../button/IconButtonOrLink";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  variant?: "light" | "dark";
  className?: string;
};

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  variant = "light",
  className,
}: PaginationProps) => {
  const t = useTranslations("paginator");

  if (totalPages <= 1) return null;

  const visiblePages = Array.from(
    { length: totalPages },
    (_, i) => i + 1
  ).filter(
    page =>
      page === 1 ||
      page === totalPages ||
      (page >= currentPage - 1 && page <= currentPage + 1)
  );

  const isEllipsis = (index: number) => {
    const current = visiblePages[index];
    const prev = visiblePages[index - 1];
    return current - prev > 1;
  };

  return (
    <div
      className={cn("mt-10 flex items-center justify-center gap-6", className)}
    >
      <IconButtonOrLink
        iconClassName="rotate-180"
        variant={variant}
        aria-label={t("prev")}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      />

      <div className="flex items-center gap-2">
        {visiblePages.map((page, idx) => (
          <Fragment key={page}>
            {idx > 0 && isEllipsis(idx) && (
              <span className="select-none px-2">…</span>
            )}
            <button
              onClick={() => onPageChange(page)}
              aria-current={page === currentPage ? "page" : undefined}
              className={cn(
                "h-[20px] w-[20px] rounded-full font-medium",
                page === currentPage
                  ? variant === "light"
                    ? "bg-light text-dark"
                    : "bg-dark text-light"
                  : "opacity-60 transition-opacity duration-300 hover:opacity-100"
              )}
            >
              {page}
            </button>
          </Fragment>
        ))}
      </div>

      <IconButtonOrLink
        variant={variant}
        aria-label={t("next")}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      />
    </div>
  );
};

export default Pagination;
