import type { Episode, EpisodeSets } from "@/libs/types";

export function buildEpisodeSets(char1Episodes: Episode[], char2Episodes: Episode[]): EpisodeSets {
  const char1Ids = new Set(char1Episodes.map((ep) => ep.id));
  const char2Ids = new Set(char2Episodes.map((ep) => ep.id));

  return {
    char1Only: char1Episodes.filter((ep) => !char2Ids.has(ep.id)),
    shared: char1Episodes.filter((ep) => char2Ids.has(ep.id)),
    char2Only: char2Episodes.filter((ep) => !char1Ids.has(ep.id)),
  };
}
