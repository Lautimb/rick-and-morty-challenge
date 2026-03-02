import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CharacterCard } from "@/components/features/CharacterCard";
import { useComparisonStore } from "@/store/comparisonStore";
import type { Character } from "@/libs/types";

const RICK: Character = {
  id: 1,
  name: "Rick Sanchez",
  image: "https://example.com/rick.jpg",
  status: "Alive",
  species: "Human",
  episode: ["1", "2"],
};

const MORTY: Character = {
  id: 2,
  name: "Morty Smith",
  image: "https://example.com/morty.jpg",
  status: "Alive",
  species: "Human",
  episode: ["1"],
};

beforeEach(() => {
  useComparisonStore.setState({ char1: null, char2: null });
});

describe("CharacterCard", () => {
  it("renders the character name", () => {
    render(<CharacterCard character={RICK} panelId="char1" />);
    expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();
  });

  it("renders the character image", () => {
    render(<CharacterCard character={RICK} panelId="char1" />);
    expect(screen.getByAltText("Rick Sanchez")).toBeInTheDocument();
  });

  it("shows species in the overlay when not disabled", () => {
    render(<CharacterCard character={RICK} panelId="char1" />);
    expect(screen.getByText("Human")).toBeInTheDocument();
  });

  it("selecting a character calls selectCharacter in the store", async () => {
    render(<CharacterCard character={RICK} panelId="char1" />);
    await userEvent.click(screen.getByRole("article"));
    expect(useComparisonStore.getState().char1).toEqual(RICK);
  });

  it("shows 'Seleccionado' badge when character is selected", async () => {
    render(<CharacterCard character={RICK} panelId="char1" />);
    await userEvent.click(screen.getByRole("article"));
    expect(screen.getByText("Seleccionado")).toBeInTheDocument();
  });

  it("clicking a selected character deselects it (toggle)", async () => {
    useComparisonStore.setState({ char1: RICK, char2: null });
    render(<CharacterCard character={RICK} panelId="char1" />);
    await userEvent.click(screen.getByRole("article"));
    expect(useComparisonStore.getState().char1).toBeNull();
  });

  it("shows disabled overlay when character is selected in the other panel", () => {
    useComparisonStore.setState({ char1: null, char2: RICK });
    render(<CharacterCard character={RICK} panelId="char1" />);
    expect(screen.getByText(/seleccionado en el otro panel/i)).toBeInTheDocument();
  });

  it("clicking a disabled card does nothing", async () => {
    useComparisonStore.setState({ char1: null, char2: RICK });
    render(<CharacterCard character={RICK} panelId="char1" />);
    await userEvent.click(screen.getByRole("article"));
    expect(useComparisonStore.getState().char1).toBeNull();
  });

  it("hides the normal overlay when disabled", () => {
    useComparisonStore.setState({ char1: null, char2: RICK });
    render(<CharacterCard character={RICK} panelId="char1" />);
    expect(screen.queryByText("Human")).not.toBeInTheDocument();
  });

  it("two different characters in the same panel are independent", async () => {
    const { rerender } = render(
      <CharacterCard character={RICK} panelId="char1" />
    );
    await userEvent.click(screen.getByRole("article"));
    expect(useComparisonStore.getState().char1).toEqual(RICK);

    rerender(<CharacterCard character={MORTY} panelId="char2" />);
    await userEvent.click(screen.getByRole("article"));
    expect(useComparisonStore.getState().char2).toEqual(MORTY);
  });
});
