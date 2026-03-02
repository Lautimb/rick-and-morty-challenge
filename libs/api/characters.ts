import type { CharactersPage } from "@/libs/types";

const BASE = "https://rickandmortyapi.com/api";

async function fetchPage(page: number, options?: RequestInit): Promise<CharactersPage> {
  const res = await fetch(`${BASE}/character?page=${page}`, options);

  if (!res.ok) throw new Error(`Failed to fetch characters: ${res.status}`);

  const { info, results } = await res.json();

  return { info, results };
}

export const getCharactersPage = (page: number) =>
  fetchPage(page, { next: { revalidate: 3600 } } as RequestInit);

export const fetchCharactersPage = (page: number) => fetchPage(page);
