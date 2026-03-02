"use client";

import { EpisodeColumnShell } from "./EpisodeColumnShell";
import type { Episode } from "@/libs/types";

type EpisodeColumnProps = {
  title: string;
  episodes: Episode[];
  isPending: boolean;
  error: string | null;
  resetKey: number;
};

export function EpisodeColumn({ title, episodes, isPending, error, resetKey }: EpisodeColumnProps) {
  return (
    <EpisodeColumnShell
      title={title}
      episodes={episodes}
      isPending={isPending}
      error={error}
      emptyMessage="No hay episodios"
      resetKey={resetKey}
    />
  );
}
