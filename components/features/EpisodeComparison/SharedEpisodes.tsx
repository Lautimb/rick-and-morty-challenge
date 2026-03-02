"use client";

import { EpisodeColumnShell } from "./EpisodeColumnShell";
import type { Episode } from "@/libs/types";

type SharedEpisodesProps = {
  episodes: Episode[];
  isPending: boolean;
  error: string | null;
};

export function SharedEpisodes({ episodes, isPending, error }: SharedEpisodesProps) {
  return (
    <EpisodeColumnShell
      title="Episodios compartidos"
      episodes={episodes}
      isPending={isPending}
      error={error}
      emptyMessage="No comparten episodios"
      resetKey="shared"
      centerTitle
    />
  );
}
