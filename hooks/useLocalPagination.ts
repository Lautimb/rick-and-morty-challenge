"use client";

import { useState } from "react";

const PAGE_SIZE = 5;

export function useLocalPagination<T>(items: T[], resetKey?: unknown) {
  const [currentPage, setCurrentPage] = useState(1);
  const [prevKey, setPrevKey] = useState(resetKey);

  if (prevKey !== resetKey) {
    setPrevKey(resetKey);
    setCurrentPage(1);
  }

  const totalPages = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
  const start = (currentPage - 1) * PAGE_SIZE;
  const currentItems = items.slice(start, start + PAGE_SIZE);

  function goTo(page: number) {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  }

  return {
    currentItems,
    currentPage,
    totalPages,
    isLoading: false,
    hasPrev: currentPage > 1,
    hasNext: currentPage < totalPages,
    goTo,
    goNext: () => goTo(currentPage + 1),
    goPrev: () => goTo(currentPage - 1),
  };
}
