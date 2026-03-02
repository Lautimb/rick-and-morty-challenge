"use client";

import { Check } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { useComparisonStore } from "@/store/comparisonStore";
import type { Character, PanelId } from "@/libs/types";
import { cx } from "class-variance-authority";

type CharacterCardProps = {
  character: Character;
  panelId: PanelId;
  eager?: boolean;
};

export function CharacterCard({ character, panelId, eager = false }: CharacterCardProps) {

  const otherPanelId: PanelId = panelId === "char1" ? "char2" : "char1";

  const isSelected = useComparisonStore((state) => state[panelId]?.id === character.id);
  const isDisabled = useComparisonStore((state) => state[otherPanelId]?.id === character.id);
  const selectCharacter = useComparisonStore((state) => state.selectCharacter);
  const clearCharacter = useComparisonStore((state) => state.clearCharacter);

  function handleClick() {
    if (isDisabled) return;
    if (isSelected) {
      clearCharacter(panelId);
    } else {
      selectCharacter(panelId, character);
    }
  }

  return (
    <Card
      className={cx(
        "transition-all duration-200",
        isDisabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer",
        isSelected && "scale-[1.03]",
      )}
      onClick={handleClick}
    >
      <Card.Media
        src={character.image}
        alt={character.name}
        sizes="(max-width: 767px) 50vw, 25vw"
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : "auto"}
      />
      {isSelected && (
        <div className="absolute top-2 right-2">
          <Card.Badge icon={<Check size={11} strokeWidth={2.5} />}>Seleccionado</Card.Badge>
        </div>
      )}
      {isDisabled && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80 p-3 text-center rounded-xl">
          <p className="text-sm font-semibold text-white leading-snug drop-shadow">
            ¡Personaje seleccionado en el otro panel!
          </p>
        </div>
      )}
      {!isDisabled && (
        <Card.Overlay>
          <Card.Descripcion className="flex flex-col gap-0.5">
            <h3 className="font-bold leading-tight truncate">{character.name}</h3>
            <div className="flex items-center justify-between gap-2">
              <p className="text-xs font-medium text-white/75">{character.species}</p>
              <Card.Badge status={character.status} />
            </div>
          </Card.Descripcion>
        </Card.Overlay>
      )}
    </Card>
  );
}
