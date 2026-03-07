import type { CharactersPage } from "@/libs/types";

async function fetchPage(page: number, options?: RequestInit): Promise<CharactersPage> {
  const base = process.env.RICK_MORTY_API_BASE_URL;

  if (!base) throw new Error("Missing required env var: RICK_MORTY_API_BASE_URL");

  const res = await fetch(`${base}/character?page=${page}`, options);

  if (!res.ok) throw new Error(`Failed to fetch characters: ${res.status}`);

  const { info, results } = await res.json();

  return { info, results };
}

export const getCharactersPage = (page: number) =>
  fetchPage(page, { next: { revalidate: 86400 } } as RequestInit);

export async function fetchCharactersPage(page: number): Promise<CharactersPage> {
  const res = await fetch(`/api/characters?page=${page}`);

  if (!res.ok) throw new Error(`Failed to fetch characters: ${res.status}`);

  const { info, results } = await res.json();

  return { info, results };
}
