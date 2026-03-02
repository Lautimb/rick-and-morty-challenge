"use client";

import Image from "next/image";
import { useComparisonStore } from "@/store/comparisonStore";
import { EpisodeColumn } from "./EpisodeColumn";
import { SharedEpisodes } from "./SharedEpisodes";
import type { Character } from "@/libs/types";

function CharacterSlot({ character, label }: { character: Character | null; label: string }) {
  if (character) {
    return (
      <div className="flex flex-col items-center gap-2">
        <Image
          src={character.image}
          alt={character.name}
          width={64}
          height={64}
          className="rounded-full border-2 border-purple-500 object-cover"
        />
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 max-w-28 truncate">
          {character.name}
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="w-16 h-16 rounded-full border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center">
        <span className="text-2xl text-gray-300 dark:text-gray-600">?</span>
      </div>
      <span className="text-sm text-gray-400 dark:text-gray-600">{label}</span>
    </div>
  );
}

function EmptyState({ char1, char2 }: { char1: Character | null; char2: Character | null }) {
  const missing = !char1 && !char2
    ? "Seleccioná un personaje en cada panel para comenzar"
    : "Seleccioná el personaje faltante para ver la comparación";

  return (
    <div className="flex flex-col items-center gap-8 py-14">
      <div className="flex items-center gap-6">
        <CharacterSlot character={char1} label="Personaje #1" />
        <span className="text-xl font-bold text-gray-300 dark:text-gray-600 select-none">VS</span>
        <CharacterSlot character={char2} label="Personaje #2" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400 text-center max-w-xs">
        {missing}
      </p>
    </div>
  );
}

export function EpisodeComparison() {
  const char1 = useComparisonStore((state) => state.char1);
  const char2 = useComparisonStore((state) => state.char2);
  const bothSelected = !!char1 && !!char2;

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

      {bothSelected ? (
        <section className="w-full grid grid-cols-1 lg:grid-cols-3 gap-4">
          <EpisodeColumn panelId="char1" />
          <SharedEpisodes />
          <EpisodeColumn panelId="char2" />
        </section>
      ) : (
        <EmptyState char1={char1} char2={char2} />
      )}
    </div>
  );
}
