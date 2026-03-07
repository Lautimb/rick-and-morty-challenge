import type { Episode } from "@/libs/types";

function extractId(urlOrId: string): string {
  return urlOrId.split("/").pop()!;
}

export async function fetchEpisodes(urlsOrIds: string[], signal?: AbortSignal): Promise<Episode[]> {
  if (urlsOrIds.length === 0) return [];

  const ids = urlsOrIds.map(extractId);
  const res = await fetch(`/api/episodes?ids=${ids.join(",")}`, { signal });

  if (!res.ok) throw new Error(`Failed to fetch episodes: ${res.status}`);

  const data = await res.json();
  return Array.isArray(data) ? data : [data];
}
