import React from "react";
import Link from "next/link";

import { FullContentBlock } from "@/lib/sanity/types/shared";

interface Props {
  content: FullContentBlock[];
}

const RenderContent = ({ content }: Props) => {
  const rendered: React.ReactNode[] = [];

  let listBuffer: React.ReactNode[] = [];

  const flushList = () => {
    if (listBuffer.length > 0) {
      rendered.push(
        <ul key={`ul-${rendered.length}`} className="ml-6 list-disc">
          {listBuffer}
        </ul>
      );
      listBuffer = [];
    }
  };

  content.forEach((block, blockIndex) => {
    const children = block.children.map((child, childIndex) => {
      let textNode: React.ReactNode = child.text;

      const fontWeight = child.marks.includes("strong")
        ? "font-bold"
        : "font-normal";

      child.marks.forEach(mark => {
        if (mark !== "strong") {
          const linkDef = block.markDefs?.find(def => def.key === mark);

          if (linkDef) {
            textNode = (
              <Link
                key={`${blockIndex}-${childIndex}-link`}
                href={linkDef.href}
                className={`${fontWeight} text-blue-500 underline`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {textNode}
              </Link>
            );
          }
        }
      });

      return (
        <span key={`${blockIndex}-${childIndex}`} className={fontWeight}>
          {textNode}
        </span>
      );
    });

    if (block.listItem === "bullet") {
      listBuffer.push(<li key={block.key}>{children}</li>);
    } else {
      flushList();

      switch (block.style) {
        case "h1":
          rendered.push(
            <h2 key={block.key} className="text-4xl font-bold">
              {children}
            </h2>
          );
          break;
        case "h2":
          rendered.push(
            <h3 key={block.key} className="text-3xl font-bold">
              {children}
            </h3>
          );
          break;
        case "h3":
          rendered.push(
            <h4 key={block.key} className="text-2xl font-semibold">
              {children}
            </h4>
          );
          break;
        case "h4":
          rendered.push(
            <h5 key={block.key} className="text-xl font-semibold">
              {children}
            </h5>
          );
          break;
        default:
          rendered.push(
            <p key={block.key} className="text-base leading-6">
              {children}
            </p>
          );
      }
    }
  });

  flushList();

  return <>{rendered}</>;
};

export default RenderContent;
