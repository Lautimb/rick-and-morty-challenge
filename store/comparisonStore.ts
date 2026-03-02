import { create } from "zustand";
import type { Character, PanelId } from "@/libs/types";

type ComparisonState = {
  char1: Character | null;
  char2: Character | null;
  selectCharacter: (panelId: PanelId, character: Character) => void;
  clearCharacter: (panelId: PanelId) => void;
};

export const useComparisonStore = create<ComparisonState>((set) => ({
  char1: null,
  char2: null,
  selectCharacter: (panelId, character) => set({ [panelId]: character }),
  clearCharacter: (panelId) => set({ [panelId]: null }),
}));
