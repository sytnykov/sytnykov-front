"use client";

import { useState } from "react";

import { track } from "@/lib/analytics/track";
import { APPLICATION } from "@/constants/application";
import { cn } from "@/utils/cn";

import LineIcon from "../../homepage/LineIcon";
import ModalTrigger from "../../module/modal/ModalTrigger";

export type PackageView = {
  key: string;
  name: string;
  note: string;
  price: string;
  priceValue: number;
  oldPrice?: string;
  highlighted: boolean;
  features: { text: string; included: boolean }[];
  paymentUrl?: string;
};

const MOBILE_VISIBLE = 3;

type Labels = {
  showAll: string;
  pay: string;
  nextFlow: string;
  included: string;
  hide: string;
  recommended: string;
  uah: string;
};

/** One participation package: price at once, contents open on click. */
const PackageCard = ({
  pkg,
  course,
  salesClosed,
  labels,
}: {
  pkg: PackageView;
  course: string;
  salesClosed: boolean;
  labels: Labels;
}) => {
  const [open, setOpen] = useState(false);
  const hi = pkg.highlighted;

  const buttonBase =
    "flex h-[50px] w-full items-center justify-center rounded-full px-6 text-[15px] font-semibold transition-colors duration-300";

  return (
    <article
      className={cn(
        "relative flex h-full flex-col rounded-[28px] p-6 md:p-7",
        hi
          ? "bg-light text-dark shadow-[0_40px_80px_-40px_rgba(81,136,255,0.7)] ring-2 ring-accent"
          : "bg-white/[0.05] text-light shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12)]"
      )}
    >
      {hi && (
        <span className="absolute -top-3.5 left-6 inline-flex items-center gap-1.5 rounded-full bg-accent-strong px-3 py-1.5 text-[12px] font-semibold text-light shadow-[0_10px_24px_-10px_rgba(81,136,255,0.9)]">
          <LineIcon name="target" className="size-3.5" />
          {labels.recommended}
        </span>
      )}
      <h3 className="text-[20px] font-semibold leading-[1.25]">{pkg.name}</h3>
      {pkg.note && (
        <p
          className={cn(
            "mt-2 text-[14px] leading-[1.5]",
            hi ? "text-dark/60" : "text-white/60"
          )}
        >
          {pkg.note}
        </p>
      )}

      <div className="mt-6 flex flex-wrap items-end gap-x-3 gap-y-1">
        <span className="whitespace-nowrap font-micra text-[34px] leading-none lg:text-[30px] xl:text-[38px]">
          {pkg.price}
        </span>
        <span
          className={cn(
            "pb-1 text-[15px] font-semibold",
            hi ? "text-dark/70" : "text-white/70"
          )}
        >
          {labels.uah}
        </span>
        {pkg.oldPrice && (
          <span
            className={cn(
              "pb-1 text-[15px] line-through",
              hi ? "text-dark/60" : "text-white/60"
            )}
          >
            {pkg.oldPrice}
          </span>
        )}
      </div>

      <p
        className={cn(
          "mt-6 border-t pt-5 text-[13px] font-semibold uppercase tracking-[0.06em]",
          hi ? "border-dark/10 text-dark/60" : "border-white/10 text-white/50"
        )}
      >
        {labels.included}
      </p>
      <ul className="mt-1">
        {pkg.features.map((f, idx) => (
          <li
            key={f.text}
            className={cn(
              "flex items-start gap-3 pt-3.5 text-[14px] leading-[1.45] md:text-[15px]",
              // phones: first items at once, the rest opens on tap
              idx >= MOBILE_VISIBLE && !open && "max-md:hidden"
            )}
          >
            {f.included ? (
              <span className="mt-[1px] grid size-5 shrink-0 place-items-center rounded-full bg-[#22b573] text-light">
                <LineIcon name="check" className="size-3" />
              </span>
            ) : (
              <span
                className={cn(
                  "mt-[1px] grid size-5 shrink-0 place-items-center rounded-full",
                  hi ? "bg-dark/10 text-dark/60" : "bg-white/10 text-white/60"
                )}
              >
                <LineIcon name="close" className="size-3" />
              </span>
            )}
            <span
              className={cn(
                !f.included && "line-through decoration-1",
                !f.included && (hi ? "text-dark/60" : "text-white/60")
              )}
            >
              {f.text}
            </span>
          </li>
        ))}
      </ul>
      {pkg.features.length > MOBILE_VISIBLE && (
        <button
          type="button"
          aria-expanded={open}
          onClick={() => setOpen(v => !v)}
          className={cn(
            "mt-4 flex w-full items-center justify-center gap-2 rounded-[14px] py-2.5 text-[14px] font-semibold md:hidden",
            hi ? "bg-[#f3f6fd]" : "bg-white/[0.06]"
          )}
        >
          {open ? labels.hide : labels.showAll}
          <svg
            aria-hidden
            viewBox="0 0 20 20"
            className={cn(
              "size-4 transition-transform duration-300",
              open && "rotate-180"
            )}
          >
            <path
              d="m5 8 5 5 5-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}

      <div className="mt-auto pt-6">
        {!salesClosed && pkg.paymentUrl ? (
          <a
            href={pkg.paymentUrl}
            rel="nofollow noopener noreferrer"
            onClick={() =>
              track("begin_checkout", {
                course,
                package: pkg.name,
                value: pkg.priceValue,
                currency: "UAH",
              })
            }
            className={cn(
              buttonBase,
              hi
                ? "bg-accent text-light hover:bg-[#6a99ff]"
                : "bg-light text-dark hover:bg-[#dfe8ff]"
            )}
          >
            {labels.pay}
          </a>
        ) : (
          <ModalTrigger
            variant="course"
            course={`${course} — ${pkg.name}`}
            buttonVariant={hi ? "accent" : "light"}
            label={salesClosed ? labels.nextFlow : labels.pay}
            buttonClassName="h-[50px] py-0 text-[15px] font-semibold"
            messageFrom={APPLICATION.COURSE}
          />
        )}
      </div>
    </article>
  );
};

export default PackageCard;
