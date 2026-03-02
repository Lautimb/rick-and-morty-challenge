import type { Episode } from "@/libs/types";
import { GRAPHQL_URL, GET_EPISODES_QUERY } from "./queries";

type RawEpisode = {
  id: string;
  name: string;
  air_date: string;
  episode: string;
};

type GraphQLResponse = {
  episodesByIds: RawEpisode[];
};

function normalizeEpisode(raw: RawEpisode): Episode {
  return {
    id: parseInt(raw.id, 10),
    name: raw.name,
    air_date: raw.air_date,
    episode: raw.episode,
  };
}

// Module-level cache: deduplicates concurrent requests for the same episode set
const episodeCache = new Map<string, Promise<Episode[]>>();

/** Clears the episode cache. Exposed for test isolation only. */
export function clearEpisodeCache() {
  episodeCache.clear();
}

async function doFetch(episodeIds: string[]): Promise<Episode[]> {
  const res = await fetch(GRAPHQL_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: GET_EPISODES_QUERY, variables: { ids: episodeIds } }),
  });

  if (!res.ok) throw new Error(`GraphQL request failed: ${res.status}`);

  const { data, errors } = await res.json();
  if (errors?.length) throw new Error(errors[0].message);

  return (data as GraphQLResponse).episodesByIds.map(normalizeEpisode);
}

export function fetchEpisodes(episodeIds: string[], signal?: AbortSignal): Promise<Episode[]> {
  if (episodeIds.length === 0) return Promise.resolve([]);

  const key = [...episodeIds].sort().join(",");

  if (!episodeCache.has(key)) {
    const p = doFetch(episodeIds).catch((err) => {
      episodeCache.delete(key); // allow retry on error (e.g. 429)
      throw err;
    });
    episodeCache.set(key, p);
  }

  const cached = episodeCache.get(key)!;

  // Race the shared promise against the caller's AbortSignal
  if (!signal) return cached;

  return new Promise<Episode[]>((resolve, reject) => {
    if (signal.aborted) {
      reject(new DOMException("Aborted", "AbortError"));
      return;
    }
    const onAbort = () => reject(new DOMException("Aborted", "AbortError"));
    signal.addEventListener("abort", onAbort, { once: true });
    cached
      .then((val) => { signal.removeEventListener("abort", onAbort); resolve(val); })
      .catch((err) => { signal.removeEventListener("abort", onAbort); reject(err); });
  });
}
