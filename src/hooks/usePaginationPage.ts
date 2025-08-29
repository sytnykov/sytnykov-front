"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export const usePaginationPage = (totalPages: number) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const raw = searchParams.get("page");
  const currentPageFromURL = parseInt(raw || "1", 10);
  const validatedPage =
    currentPageFromURL >= 1 && currentPageFromURL <= totalPages
      ? currentPageFromURL
      : 1;

  const [currentPage, setCurrentPage] = useState(validatedPage);

  useEffect(() => {
    setCurrentPage(validatedPage);
  }, [validatedPage]);

  const changePage = (page: number) => {
    router.push(`?page=${page}`);
  };

  return { currentPage, changePage };
};
