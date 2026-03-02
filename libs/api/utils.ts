import type { Character, Episode, EpisodeSets, RawCharacter, GraphQLResponse } from "@/libs/types";
import { GRAPHQL_URL, GET_CHARACTERS_QUERY } from "./queries";

export function normalizeCharacter(raw: RawCharacter): Character {
  return {
    id: parseInt(raw.id, 10),
    name: raw.name,
    image: raw.image,
    status: raw.status,
    species: raw.species,
    episode: raw.episode.map((ep) => ep.id),
  };
}

export async function graphqlFetch(
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



export function buildEpisodeSets(char1Episodes: Episode[], char2Episodes: Episode[]): EpisodeSets {
  const char1Ids = new Set(char1Episodes.map((ep) => ep.id));
  const char2Ids = new Set(char2Episodes.map((ep) => ep.id));

  return {
    char1Only: char1Episodes.filter((ep) => !char2Ids.has(ep.id)),
    shared: char1Episodes.filter((ep) => char2Ids.has(ep.id)),
    char2Only: char2Episodes.filter((ep) => !char1Ids.has(ep.id)),
  };
}