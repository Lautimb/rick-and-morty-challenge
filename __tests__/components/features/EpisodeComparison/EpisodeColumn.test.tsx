import { render, screen, waitFor } from "@testing-library/react";
import { EpisodeColumn } from "@/components/features/EpisodeComparison/EpisodeColumn";
import { useComparisonStore } from "@/store/comparisonStore";
import type { Episode } from "@/libs/types";

jest.mock("../../../../libs/api/episodes");

import { fetchEpisodes } from "@/libs/api/episodes";

const ep = (id: number): Episode => ({
  id,
  name: `Episode ${id}`,
  air_date: "December 2, 2013",
  episode: `S01E0${id}`,
});

const RICK = {
  id: 1,
  name: "Rick Sanchez",
  image: "https://example.com/rick.jpg",
  status: "Alive" as const,
  species: "Human",
  episode: ["1", "2"],
};

beforeEach(() => {
  useComparisonStore.setState({ char1: null, char2: null });
  jest.clearAllMocks();
});

describe("EpisodeColumn", () => {
  it("shows placeholder when no character is selected", () => {
    render(<EpisodeColumn panelId="char1" />);
    expect(screen.getByText(/selecciona un personaje/i)).toBeInTheDocument();
    expect(fetchEpisodes).not.toHaveBeenCalled();
  });

  it("fetches and displays episodes when a character is selected", async () => {
    (fetchEpisodes as jest.Mock).mockResolvedValue([ep(1), ep(2)]);
    useComparisonStore.setState({ char1: RICK, char2: null });

    render(<EpisodeColumn panelId="char1" />);

    await waitFor(() => {
      expect(screen.getByText("Episode 1")).toBeInTheDocument();
      expect(screen.getByText("Episode 2")).toBeInTheDocument();
    });
  });

  it("calls fetchEpisodes with the character's episode ids", async () => {
    (fetchEpisodes as jest.Mock).mockResolvedValue([ep(1), ep(2)]);
    useComparisonStore.setState({ char1: RICK, char2: null });

    render(<EpisodeColumn panelId="char1" />);

    await waitFor(() => {
      expect(fetchEpisodes).toHaveBeenCalledWith(RICK.episode, expect.any(AbortSignal));
    });
  });

  it("renders the character name as the column title", async () => {
    (fetchEpisodes as jest.Mock).mockResolvedValue([]);
    useComparisonStore.setState({ char1: RICK, char2: null });

    render(<EpisodeColumn panelId="char1" />);

    await waitFor(() => {
      expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();
    });
  });

  it("shows error message when fetchEpisodes throws an Error", async () => {
    (fetchEpisodes as jest.Mock).mockRejectedValue(new Error("Server down"));
    useComparisonStore.setState({ char1: RICK, char2: null });

    render(<EpisodeColumn panelId="char1" />);

    await waitFor(() => {
      expect(screen.getByText("Server down")).toBeInTheDocument();
    });
  });

  it("shows fallback error for non-Error throws", async () => {
    (fetchEpisodes as jest.Mock).mockRejectedValue("plain string");
    useComparisonStore.setState({ char1: RICK, char2: null });

    render(<EpisodeColumn panelId="char1" />);

    await waitFor(() => {
      expect(screen.getByText("Error loading episodes")).toBeInTheDocument();
    });
  });

  it("uses panelId='char2' to read from the correct store slice", async () => {
    const MORTY = { ...RICK, id: 2, name: "Morty Smith", episode: ["3"] };
    (fetchEpisodes as jest.Mock).mockResolvedValue([ep(3)]);
    useComparisonStore.setState({ char1: null, char2: MORTY });

    render(<EpisodeColumn panelId="char2" />);

    await waitFor(() => {
      expect(screen.getByText("Morty Smith")).toBeInTheDocument();
      expect(fetchEpisodes).toHaveBeenCalledWith(MORTY.episode, expect.any(AbortSignal));
    });
  });
});
