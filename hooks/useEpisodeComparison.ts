"use client";

import { useEffect, useState, useTransition } from "react";
import { fetchEpisodes } from "@/libs/api/episodes";
import { buildEpisodeSets } from "@/libs/api/utils";
import type { Character, Episode } from "@/libs/types";

type EpisodeComparisonState = {
  char1Episodes: Episode[];
  char2Episodes: Episode[];
  shared: Episode[];
  isPending: boolean;
  error: string | null;
};

export function useEpisodeComparison(
  char1: Character | null,
  char2: Character | null
): EpisodeComparisonState {
  const [char1Episodes, setChar1Episodes] = useState<Episode[]>([]);
  const [char2Episodes, setChar2Episodes] = useState<Episode[]>([]);
  const [shared, setShared] = useState<Episode[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (!char1 || !char2) {
      setChar1Episodes([]);
      setChar2Episodes([]);
      setShared([]);
      return;
    }

    const controller = new AbortController();

    startTransition(async () => {
      try {
        const [ep1, ep2] = await Promise.all([
          fetchEpisodes(char1.episode, controller.signal),
          fetchEpisodes(char2.episode, controller.signal),
        ]);
        setChar1Episodes(ep1);
        setChar2Episodes(ep2);
        setShared(buildEpisodeSets(ep1, ep2).shared);
        setError(null);
      } catch (err) {
        if ((err as DOMException).name === "AbortError") return;
        setError(err instanceof Error ? err.message : "Error loading episodes");
      }
    });

    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [char1?.id, char2?.id]);

  return { char1Episodes, char2Episodes, shared, isPending, error };
}
