"use client";

import { useEffect, useState, useTransition } from "react";
import { useComparisonStore } from "@/store/comparisonStore";
import { fetchEpisodes } from "@/libs/api/episodes";
import { buildEpisodeSets } from "@/libs/api/utils";
import { EpisodeColumnShell } from "./EpisodeColumnShell";
import type { Episode } from "@/libs/types";

export function SharedEpisodes() {
  const char1 = useComparisonStore((state) => state.char1);
  const char2 = useComparisonStore((state) => state.char2);

  const [shared, setShared] = useState<Episode[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const displayedShared = char1 && char2 ? shared : [];

  useEffect(() => {
    if (!char1 || !char2) return;

    const controller = new AbortController();

    startTransition(async () => {
      try {
        const [char1Episodes, char2Episodes] = await Promise.all([
          fetchEpisodes(char1.episode, controller.signal),
          fetchEpisodes(char2.episode, controller.signal),
        ]);
        setShared(buildEpisodeSets(char1Episodes, char2Episodes).shared);
        setError(null);
      } catch (err) {
        if ((err as DOMException).name === "AbortError") return;
        setError(err instanceof Error ? err.message : "Error loading episodes");
      }
    });

    return () => {
      controller.abort();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [char1?.id, char2?.id]);

  if (!char1 || !char2) {
    return (
      <div className="w-full min-h-96 flex flex-col border-2 border-purple-500 rounded-xl items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400 text-sm text-center px-4">
          Selecciona un personaje en cada panel
        </p>
      </div>
    );
  }

  return (
    <EpisodeColumnShell
      title="Episodios compartidos"
      episodes={displayedShared}
      isPending={isPending}
      error={error}
      emptyMessage="No comparten episodios"
      resetKey={`${char1.id}-${char2.id}`}
      centerTitle
    />
  );
}
