"use client";

import { Check } from "lucide-react";
import { usePagination } from "@/hooks/usePagination";
import { CharacterCard } from "@/components/features/CharacterCard";
import { Pagination } from "@/components/ui/Pagination/Pagination";
import { useComparisonStore } from "@/store/comparisonStore";
import type { CharactersPage, PanelId } from "@/libs/types";

type PanelCharactersProps = {
  initialData: CharactersPage;
  title: string;
  panelId: PanelId;
};

export function PanelCharacters({ initialData, title, panelId }: PanelCharactersProps) {
  const { characters, currentPage, totalPages, isLoading, error, goNext, goPrev, goTo, hasPrev, hasNext } =
    usePagination(initialData);

  const selectedName = useComparisonStore((state) => state[panelId]?.name);

  return (
    <section className="w-full flex flex-col gap-4">
      <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between md:gap-2">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 shrink-0">{title}</h2>
        {selectedName && (
          <div className="flex items-center gap-1.5 text-sm text-green-600 dark:text-green-400 min-w-0">
            <Check size={13} strokeWidth={2.5} className="shrink-0" />
            <span className="truncate">{selectedName}</span>
          </div>
        )}
      </div>

      {error && (
        <p className="text-red-400 text-sm">{error}</p>
      )}

      <div className="grid grid-cols-2 gap-4 mb-auto">
        {characters.map((character, index) => (
          <CharacterCard
            key={character.id}
            character={character}
            panelId={panelId}
            eager={index === 0 && currentPage === 1}
          />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        isLoading={isLoading}
        hasPrev={hasPrev}
        hasNext={hasNext}
        onPrev={goPrev}
        onNext={goNext}
        onGoTo={goTo}
      />
    </section>
  );
}
