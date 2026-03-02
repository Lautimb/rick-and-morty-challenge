"use client";

import { useComparisonStore } from "@/store/comparisonStore";
import { useEpisodeComparison } from "@/hooks/useEpisodeComparison";
import { EpisodeColumn } from "./EpisodeColumn";
import { SharedEpisodes } from "./SharedEpisodes";
import { ComparisonEmptyState } from "./ComparisonEmptyState";

export function EpisodeComparison() {
  const char1 = useComparisonStore((state) => state.char1);
  const char2 = useComparisonStore((state) => state.char2);

  const { char1Episodes, char2Episodes, shared, isPending, error } =
    useEpisodeComparison(char1, char2);

  return (
    <div id="episode-comparison" className="w-full flex flex-col gap-10">
      <div className="flex flex-col gap-1 text-center">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Comparación de episodios
        </h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          Episodios exclusivos de cada personaje y los que comparten en común.
        </p>
      </div>

      {char1 && char2 ? (
        <section className="w-full grid grid-cols-1 lg:grid-cols-3 gap-4">
          <EpisodeColumn
            title={char1.name}
            episodes={char1Episodes}
            isPending={isPending}
            error={error}
            resetKey={char1.id}
          />
          <SharedEpisodes
            episodes={shared}
            isPending={isPending}
            error={error}
          />
          <EpisodeColumn
            title={char2.name}
            episodes={char2Episodes}
            isPending={isPending}
            error={error}
            resetKey={char2.id}
          />
        </section>
      ) : (
        <ComparisonEmptyState char1={char1} char2={char2} />
      )}
    </div>
  );
}
