import { render, screen, waitFor } from "@testing-library/react";
import { EpisodeComparison } from "@/components/features/EpisodeComparison/EpisodeComparison";
import { useComparisonStore } from "@/store/comparisonStore";

jest.mock("../../../../libs/api/episodes", () => ({
  fetchEpisodes: jest.fn().mockResolvedValue([]),
}));

// Mock sub-components to isolate EpisodeComparison logic
jest.mock(
  "../../../../components/features/EpisodeComparison/EpisodeColumn",
  () => ({
    EpisodeColumn: ({ resetKey }: { resetKey: number }) => (
      <div data-testid={`episode-column-${resetKey}`} />
    ),
  })
);

jest.mock(
  "../../../../components/features/EpisodeComparison/SharedEpisodes",
  () => ({
    SharedEpisodes: () => <div data-testid="shared-episodes" />,
  })
);

const RICK = { id: 1, name: "Rick Sanchez", image: "https://example.com/rick.jpg", status: "Alive" as const, species: "Human", episode: [] };
const MORTY = { id: 2, name: "Morty Smith", image: "https://example.com/morty.jpg", status: "Alive" as const, species: "Human", episode: [] };

beforeEach(() => {
  useComparisonStore.setState({ char1: null, char2: null });
});

describe("EpisodeComparison", () => {
  it("renders the section title", () => {
    render(<EpisodeComparison />);
    expect(screen.getByRole("heading", { name: /comparación de episodios/i })).toBeInTheDocument();
  });

  it("shows 'select both characters' message when no characters are selected", () => {
    render(<EpisodeComparison />);
    expect(
      screen.getByText(/seleccioná un personaje en cada panel para comenzar/i)
    ).toBeInTheDocument();
  });

  it("shows 'select missing character' message when only char1 is selected", () => {
    useComparisonStore.setState({ char1: RICK, char2: null });
    render(<EpisodeComparison />);
    expect(
      screen.getByText(/seleccioná el personaje faltante para ver la comparación/i)
    ).toBeInTheDocument();
  });

  it("shows 'select missing character' message when only char2 is selected", () => {
    useComparisonStore.setState({ char1: null, char2: MORTY });
    render(<EpisodeComparison />);
    expect(
      screen.getByText(/seleccioná el personaje faltante para ver la comparación/i)
    ).toBeInTheDocument();
  });

  it("shows VS placeholder when no characters are selected", () => {
    render(<EpisodeComparison />);
    expect(screen.getByText("VS")).toBeInTheDocument();
  });

  it("shows character avatar when char1 is selected", () => {
    useComparisonStore.setState({ char1: RICK, char2: null });
    render(<EpisodeComparison />);
    expect(screen.getByAltText("Rick Sanchez")).toBeInTheDocument();
  });

  it("renders EpisodeColumn and SharedEpisodes when both characters are selected", async () => {
    useComparisonStore.setState({ char1: RICK, char2: MORTY });
    render(<EpisodeComparison />);
    await waitFor(() => {
      expect(screen.getByTestId(`episode-column-${RICK.id}`)).toBeInTheDocument();
      expect(screen.getByTestId(`episode-column-${MORTY.id}`)).toBeInTheDocument();
      expect(screen.getByTestId("shared-episodes")).toBeInTheDocument();
    });
  });

  it("does NOT show the empty state when both characters are selected", () => {
    useComparisonStore.setState({ char1: RICK, char2: MORTY });
    render(<EpisodeComparison />);
    expect(screen.queryByText(/seleccioná/i)).not.toBeInTheDocument();
  });

  it("the section has id='episode-comparison' for ScrollFAB targeting", () => {
    const { container } = render(<EpisodeComparison />);
    expect(container.querySelector("#episode-comparison")).toBeInTheDocument();
  });
});
