"use client";

import { useEffect, useState, useTransition } from "react";
import { useComparisonStore } from "@/store/comparisonStore";
import { fetchEpisodes } from "@/libs/api/episodes";
import { EpisodeColumnShell } from "./EpisodeColumnShell";
import type { Episode, PanelId } from "@/libs/types";

type EpisodeColumnProps = {
  panelId: PanelId;
};

export function EpisodeColumn({ panelId }: EpisodeColumnProps) {
  const character = useComparisonStore((state) => state[panelId]);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const displayedEpisodes = character ? episodes : [];

  useEffect(() => {
    if (!character) return;

    const controller = new AbortController();

    startTransition(async () => {
      try {
        const data = await fetchEpisodes(character.episode, controller.signal);
        setEpisodes(data);
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
  }, [character?.id]);

  if (!character) {
    return (
      <div className="w-full min-h-96 flex flex-col border-2 border-purple-500 rounded-xl items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400 text-sm">Selecciona un personaje</p>
      </div>
    );
  }

  return (
    <EpisodeColumnShell
      title={character.name}
      episodes={displayedEpisodes}
      isPending={isPending}
      error={error}
      emptyMessage="No hay episodios"
      resetKey={character.id}
    />
  );
}
