"use client";

import { Children, ReactNode, useState } from "react";

import { cn } from "@/utils/cn";

/** Grid that shows only the first `limit` items on phones until expanded. */
const MobileMoreList = ({
  children,
  limit = 6,
  moreLabel,
}: {
  children: ReactNode;
  limit?: number;
  moreLabel: string;
}) => {
  const [open, setOpen] = useState(false);
  const items = Children.toArray(children);

  return (
    <>
      <ul className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-5 xl:grid-cols-3">
        {items.map((child, i) => (
          <li key={i} className={cn(!open && i >= limit && "max-md:hidden")}>
            {child}
          </li>
        ))}
      </ul>
      {!open && items.length > limit && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="mt-5 flex h-[50px] w-full items-center justify-center rounded-full bg-dark text-[15px] font-semibold text-light md:hidden"
        >
          {moreLabel}
        </button>
      )}
    </>
  );
};

export default MobileMoreList;
