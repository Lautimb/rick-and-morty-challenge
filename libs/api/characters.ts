import type { CharactersPage, Character, CharacterStatus } from "@/libs/types";

const GRAPHQL_URL = "https://rickandmortyapi.com/graphql";

const GET_CHARACTERS_QUERY = `
  query GetCharacters($page: Int) {
    characters(page: $page) {
      info {
        count
        pages
        next
        prev
      }
      results {
        id
        name
        image
        status
        species
        episode {
          id
        }
      }
    }
  }
`;

type RawCharacter = {
  id: string;
  name: string;
  image: string;
  status: CharacterStatus;
  species: string;
  episode: { id: string }[];
};

type GraphQLResponse = {
  characters: {
    info: CharactersPage["info"];
    results: RawCharacter[];
  };
};

function normalizeCharacter(raw: RawCharacter): Character {
  return {
    id: parseInt(raw.id, 10),
    name: raw.name,
    image: raw.image,
    status: raw.status,
    species: raw.species,
    episode: raw.episode.map((ep) => ep.id),
  };
}

async function graphqlFetch(
  variables: { page: number },
  options?: RequestInit
): Promise<GraphQLResponse> {
  const res = await fetch(GRAPHQL_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: GET_CHARACTERS_QUERY, variables }),
    ...options,
  });

  if (!res.ok) throw new Error(`GraphQL request failed: ${res.status}`);

  const { data, errors } = await res.json();
  if (errors?.length) throw new Error(errors[0].message);

  return data;
}

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
