"use client";

import { usePaginationPage } from "@/hooks/usePaginationPage";

import { PUBLICATIONS_PER_PAGE } from "@/constants/pagination";

import Pagination from "../shared/pagination/Pagination";
import PublicationTile from "./PublicationTile";

export type TileData = {
  href: string;
  title: string;
  description: string;
  info: string;
};

/** Paginated article grid; data is mapped on the server (no article bodies sent). */
const PublicationsGrid = ({
  items,
  label,
}: {
  items: TileData[];
  label: string;
}) => {
  const totalPages = Math.ceil(items.length / PUBLICATIONS_PER_PAGE);
  const { currentPage, changePage } = usePaginationPage(totalPages);
  const start = (currentPage - 1) * PUBLICATIONS_PER_PAGE;

  return (
    <>
      <ul className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-5 xl:grid-cols-3">
        {items.slice(start, start + PUBLICATIONS_PER_PAGE).map(item => (
          <li key={item.href}>
            <PublicationTile {...item} label={label} />
          </li>
        ))}
      </ul>
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={changePage}
        />
      )}
    </>
  );
};

export default PublicationsGrid;
