"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { fetchCharactersPage } from "@/libs/api/characters";
import type { CharactersPage, Character } from "@/libs/types";

const UI_PAGE_SIZE = 6;
const API_PAGE_SIZE = 20;

function neededApiPages(uiPage: number, totalApiPages: number) {
  const startIdx = (uiPage - 1) * UI_PAGE_SIZE;
  const endIdx = uiPage * UI_PAGE_SIZE - 1;
  const first = Math.floor(startIdx / API_PAGE_SIZE) + 1;
  const last = Math.min(Math.floor(endIdx / API_PAGE_SIZE) + 1, totalApiPages);
  return { first, last };
}

function sliceCharacters(
  cache: Map<number, Character[]>,
  uiPage: number,
  totalApiPages: number,
): Character[] {
  const startIdx = (uiPage - 1) * UI_PAGE_SIZE;
  const { first, last } = neededApiPages(uiPage, totalApiPages);
  const result: Character[] = [];

  for (let api = first; api <= last && result.length < UI_PAGE_SIZE; api++) {
    const apiChars = cache.get(api) ?? [];
    const apiStartIdx = (api - 1) * API_PAGE_SIZE;
    const from = Math.max(0, startIdx - apiStartIdx);
    const take = Math.min(UI_PAGE_SIZE - result.length, apiChars.length - from);
    if (take > 0) result.push(...apiChars.slice(from, from + take));
  }

  return result;
}

export function usePagination(initialData: CharactersPage) {
  const totalUiPages = Math.ceil(initialData.info.count / UI_PAGE_SIZE);
  const totalApiPages = initialData.info.pages;

  const cache = useRef<Map<number, Character[]>>(
    new Map([[1, initialData.results]]),
  );

  const currentPageRef = useRef(1);
  const isLoadingRef = useRef(false);

  const [uiPage, setUiPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [characters, setCharacters] = useState<Character[]>(() =>
    initialData.results.slice(0, UI_PAGE_SIZE),
  );

  useEffect(() => {
    currentPageRef.current = uiPage;
    isLoadingRef.current = isLoading;
  });

  const goTo = useCallback(
    async (targetPage: number) => {
      if (
        isLoadingRef.current ||
        targetPage === currentPageRef.current ||
        targetPage < 1 ||
        targetPage > totalUiPages
      )
        return;

      const { first, last } = neededApiPages(targetPage, totalApiPages);

      const missing: number[] = [];
      for (let p = first; p <= last; p++) {
        if (!cache.current.has(p)) missing.push(p);
      }

      if (missing.length > 0) {
        isLoadingRef.current = true;
        setIsLoading(true);
        setError(null);

        try {
          const pages = await Promise.all(missing.map(fetchCharactersPage));
          missing.forEach((apiPage, i) => {
            cache.current.set(apiPage, pages[i].results);
          });
        } catch (err) {
          isLoadingRef.current = false;
          setIsLoading(false);
          setError(
            err instanceof Error ? err.message : "Error loading characters",
          );
          return;
        }
      }

      isLoadingRef.current = false;
      currentPageRef.current = targetPage;
      setIsLoading(false);
      setCharacters(sliceCharacters(cache.current, targetPage, totalApiPages));
      setUiPage(targetPage);
    },
    [totalUiPages, totalApiPages],
  );

  const goNext = useCallback(() => goTo(currentPageRef.current + 1), [goTo]);
  const goPrev = useCallback(() => goTo(currentPageRef.current - 1), [goTo]);

  return {
    characters,
    currentPage: uiPage,
    totalPages: totalUiPages,
    isLoading,
    error,
    hasPrev: uiPage > 1,
    hasNext: uiPage < totalUiPages,
    goTo,
    goNext,
    goPrev,
  };
}
