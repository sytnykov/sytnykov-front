"use client";

import { useState } from "react";

/** Dismissible note that the page is a prototype with example content. */
const PrototypeNote = ({ text }: { text: string }) => {
  const [open, setOpen] = useState(true);
  if (!open) return null;

  return (
    <div className="fixed bottom-3 right-3 z-[110] flex max-w-[320px] items-start gap-3 rounded-[16px] bg-accent-strong py-3 pl-4 pr-2 text-[12px] font-medium leading-[1.4] text-light shadow-[0_20px_40px_-16px_rgba(9,17,41,0.6)] max-md:left-3 max-md:max-w-none">
      <span className="flex-1">{text}</span>
      <button
        type="button"
        aria-label="OK"
        onClick={() => setOpen(false)}
        className="grid size-7 shrink-0 place-items-center rounded-full bg-white/20 hover:bg-white/30"
      >
        <svg aria-hidden viewBox="0 0 20 20" className="size-3.5">
          <path
            d="M5 5l10 10M15 5 5 15"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </div>
  );
};

export default PrototypeNote;
