import { render, screen } from "@testing-library/react";
import { PanelCharacters } from "@/components/features/PanelCharacters";
import { useComparisonStore } from "@/store/comparisonStore";
import type { CharactersPage, Character } from "@/libs/types";
import { usePagination } from "@/hooks/usePagination";

jest.mock("../../../hooks/usePagination");
jest.mock("../../../components/features/CharacterCard", () => ({
  CharacterCard: ({ character }: { character: Character }) => (
    <div data-testid={`card-${character.id}`}>{character.name}</div>
  ),
}));


const makeChar = (id: number): Character => ({
  id,
  name: `Character ${id}`,
  image: `https://example.com/${id}.jpg`,
  status: "Alive",
  species: "Human",
  episode: [],
});

const INITIAL_DATA: CharactersPage = {
  info: { count: 826, pages: 42, next: 2, prev: null },
  results: Array.from({ length: 6 }, (_, i) => makeChar(i + 1)),
};

const DEFAULT_PAGINATION = {
  characters: INITIAL_DATA.results,
  currentPage: 1,
  totalPages: 138,
  isLoading: false,
  error: null,
  hasPrev: false,
  hasNext: true,
  goNext: jest.fn(),
  goPrev: jest.fn(),
  goTo: jest.fn(),
};

beforeEach(() => {
  useComparisonStore.setState({ char1: null, char2: null });
  (usePagination as jest.Mock).mockReturnValue(DEFAULT_PAGINATION);
});

describe("PanelCharacters", () => {
  it("renders the panel title", () => {
    render(
      <PanelCharacters initialData={INITIAL_DATA} title="Personaje #1" panelId="char1" />
    );
    expect(screen.getByRole("heading", { name: "Personaje #1" })).toBeInTheDocument();
  });

  it("renders a card for each character returned by usePagination", () => {
    render(
      <PanelCharacters initialData={INITIAL_DATA} title="Personaje #1" panelId="char1" />
    );
    expect(screen.getAllByTestId(/^card-/)).toHaveLength(6);
  });

  it("shows error message when usePagination returns an error", () => {
    (usePagination as jest.Mock).mockReturnValue({
      ...DEFAULT_PAGINATION,
      error: "Network error",
    });
    render(
      <PanelCharacters initialData={INITIAL_DATA} title="Personaje #1" panelId="char1" />
    );
    expect(screen.getByText("Network error")).toBeInTheDocument();
  });

  it("shows the selected character name when store has a selection for this panel", () => {
    useComparisonStore.setState({
      char1: { id: 1, name: "Rick Sanchez", image: "", status: "Alive", species: "Human", episode: [] },
      char2: null,
    });
    render(
      <PanelCharacters initialData={INITIAL_DATA} title="Personaje #1" panelId="char1" />
    );
    expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();
  });

  it("does NOT show selected name when nothing is selected", () => {
    render(
      <PanelCharacters initialData={INITIAL_DATA} title="Personaje #1" panelId="char1" />
    );
    const selectionIndicator = screen.queryByRole("paragraph");
    expect(selectionIndicator).not.toBeInTheDocument();
  });

  it("passes initialData to usePagination", () => {
    render(
      <PanelCharacters initialData={INITIAL_DATA} title="Personaje #1" panelId="char1" />
    );
    expect(usePagination).toHaveBeenCalledWith(INITIAL_DATA);
  });

  it("renders Pagination component", () => {
    render(
      <PanelCharacters initialData={INITIAL_DATA} title="Personaje #1" panelId="char1" />
    );
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });
});
