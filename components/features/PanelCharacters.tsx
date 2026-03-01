"use client";

import { usePagination } from "@/hooks/usePagination";
import { Card } from "@/components/ui/Card";
import { Pagination } from "@/components/ui/Pagination/Pagination";
import type { CharactersPage } from "@/libs/types";

type PanelCharactersProps = {
  initialData: CharactersPage;
  title: string;
};

export function PanelCharacters({ initialData, title }: PanelCharactersProps) {
  const { characters, currentPage, totalPages, isLoading, error, goNext, goPrev, goTo, hasPrev, hasNext } =
    usePagination(initialData);

  return (
    <section className="w-full flex flex-col gap-4">
      <h2 className="text-2xl font-bold text-gray-100">{title}</h2>

      {error && (
        <p className="text-red-400 text-sm">{error}</p>
      )}

      <div className="grid grid-cols-2 gap-4">
        {characters.map((character, index) => (
          <Card key={character.id} className="cursor-pointer">
            <Card.Media
              src={character.image}
              alt={character.name}
              loading={index === 0 ? "eager" : "lazy"}
            />
            <Card.Overlay>
              <h3 className="mt-1 text-base font-bold text-white leading-tight truncate">
                {character.name}
              </h3>
              <Card.Badge status={character.status} species={character.species} />
            </Card.Overlay>
          </Card>
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
