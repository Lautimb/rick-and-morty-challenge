import type { CharactersPage } from "@/libs/types";
import { graphqlFetch, normalizeCharacter } from "./utils";

export async function getCharactersPage(page: number): Promise<CharactersPage> {
  const data = await graphqlFetch({ page }, { next: { revalidate: 3600 } } as RequestInit);

  return {
    info: data.characters.info,
    results: data.characters.results.map(normalizeCharacter),
  };
}

const pageCache = new Map<number, Promise<CharactersPage>>();

export function fetchCharactersPage(page: number): Promise<CharactersPage> {
  if (!pageCache.has(page)) {
    const promise = graphqlFetch({ page })
      .then((data) => ({
        info: data.characters.info,
        results: data.characters.results.map(normalizeCharacter),
      }))
      .catch((err) => {
        pageCache.delete(page);
        throw err;
      });
    pageCache.set(page, promise);
  }
  return pageCache.get(page)!;
}
