import {
  ProgramNode,
  ProgramTreeBlock as Tree,
  pick,
} from "@/lib/sanity/types/courseBlocks";
import { cn } from "@/utils/cn";

import SectionHead from "../../homepage/SectionHead";
import { BlockCtx } from "./shared";

/*
 * + Hierarchical program: тиждень → модуль → секція → сегмент → нюанс.
 * Native <details> nesting: works without JavaScript, keyboard and screen
 * readers included. Top-level cards; deeper levels hang off a left rule.
 */

const Chevron = ({ className }: { className?: string }) => (
  <svg
    aria-hidden
    viewBox="0 0 20 20"
    className={cn(
      "size-4 shrink-0 transition-transform duration-300",
      className
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
);

const TITLE_SIZE = [
  "text-[17px] md:text-[20px] font-semibold",
  "text-[16px] md:text-[18px] font-semibold",
  "text-[15px] md:text-[16px] font-semibold",
  "text-[15px] md:text-[16px] font-medium",
  "text-[14px] md:text-[15px] font-medium",
];

const Node = ({
  node,
  level,
  locale,
}: {
  node: ProgramNode;
  level: number;
  locale: string;
}) => {
  const title = pick(node.title, locale);
  const description = pick(node.description, locale);
  const children = (node.children ?? []).filter(c => pick(c.title, locale));
  if (!title) return null;
  const size = TITLE_SIZE[Math.min(level, TITLE_SIZE.length) - 1];
  const heading = (
    <span
      className={cn(
        "min-w-0 text-pretty leading-[1.35] text-dark [overflow-wrap:anywhere]",
        size
      )}
    >
      {title}
    </span>
  );
  const text = description && (
    <p className="mt-2 max-w-[760px] text-pretty text-[14px] leading-[1.6] text-dark/65 md:text-[15px]">
      {description}
    </p>
  );

  // a leaf: just the title and its description
  if (!children.length) {
    return (
      <div className="py-2.5">
        {heading}
        {text}
      </div>
    );
  }

  return (
    // only this node's own summary turns its chevron (not nested ones)
    <details className="[&[open]>summary>span>svg]:rotate-180">
      <summary className="flex cursor-pointer list-none items-start justify-between gap-4 py-2.5 [&::-webkit-details-marker]:hidden">
        {heading}
        <span
          className={cn(
            "mt-0.5 grid shrink-0 place-items-center rounded-full bg-dark text-light",
            level === 1 ? "size-9" : "size-7"
          )}
        >
          <Chevron className={level === 1 ? undefined : "size-3.5"} />
        </span>
      </summary>
      {text}
      <div className="mt-2 border-l-2 border-accent/25 pl-4 md:pl-6">
        {children.map(child => (
          <Node
            key={child._key}
            node={child}
            level={level + 1}
            locale={locale}
          />
        ))}
      </div>
    </details>
  );
};

const ProgramTreeBlock = ({ block, ctx }: { block: Tree; ctx: BlockCtx }) => {
  const items = (block.program?.items ?? []).filter(n =>
    pick(n.title, ctx.locale)
  );
  if (!items.length) return null;
  const title =
    pick(block.title, ctx.locale) || pick(block.program?.title, ctx.locale);
  const tile = ctx.bg === "bg-light" ? "bg-[#f3f6fd]" : "bg-light";

  return (
    <section className={cn("py-14 md:py-20 xl:py-[100px]", ctx.bg)}>
      <div className="container max-w-[1280px]">
        {title && <SectionHead title={title} />}
        <ul className="flex flex-col gap-3 md:gap-4">
          {items.map(node => (
            <li
              key={node._key}
              className={cn("rounded-[24px] px-5 py-3 md:px-7 md:py-4", tile)}
            >
              <Node node={node} level={1} locale={ctx.locale} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ProgramTreeBlock;
