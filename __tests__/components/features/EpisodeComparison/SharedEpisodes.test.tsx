import { render, screen, waitFor } from "@testing-library/react";
import { SharedEpisodes } from "@/components/features/EpisodeComparison/SharedEpisodes";
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
  episode: ["1", "2", "3"],
};

const MORTY = {
  id: 2,
  name: "Morty Smith",
  image: "https://example.com/morty.jpg",
  status: "Alive" as const,
  species: "Human",
  episode: ["2", "3", "4"],
};

beforeEach(() => {
  useComparisonStore.setState({ char1: null, char2: null });
  jest.clearAllMocks();
});

describe("SharedEpisodes", () => {
  it("shows placeholder when no characters are selected", () => {
    render(<SharedEpisodes />);
    expect(screen.getByText(/selecciona un personaje en cada panel/i)).toBeInTheDocument();
    expect(fetchEpisodes).not.toHaveBeenCalled();
  });

  it("shows placeholder when only char1 is selected", () => {
    useComparisonStore.setState({ char1: RICK, char2: null });
    render(<SharedEpisodes />);
    expect(screen.getByText(/selecciona un personaje en cada panel/i)).toBeInTheDocument();
  });

  it("renders 'Episodios compartidos' title when both characters are set", async () => {
    (fetchEpisodes as jest.Mock).mockResolvedValue([]);
    useComparisonStore.setState({ char1: RICK, char2: MORTY });

    render(<SharedEpisodes />);

    await waitFor(() => {
      expect(screen.getByText("Episodios compartidos")).toBeInTheDocument();
    });
  });

  it("calls fetchEpisodes for each character when both are selected", async () => {
    (fetchEpisodes as jest.Mock).mockResolvedValue([]);
    useComparisonStore.setState({ char1: RICK, char2: MORTY });

    render(<SharedEpisodes />);

    await waitFor(() => {
      expect(fetchEpisodes).toHaveBeenCalledTimes(2);
      expect(fetchEpisodes).toHaveBeenCalledWith(RICK.episode, expect.any(AbortSignal));
      expect(fetchEpisodes).toHaveBeenCalledWith(MORTY.episode, expect.any(AbortSignal));
    });
  });

  it("displays only shared episodes (intersection)", async () => {
    // Rick: ep 1,2,3 — Morty: ep 2,3,4 → shared: 2,3
    (fetchEpisodes as jest.Mock)
      .mockResolvedValueOnce([ep(1), ep(2), ep(3)])  // Rick's episodes
      .mockResolvedValueOnce([ep(2), ep(3), ep(4)]); // Morty's episodes

    useComparisonStore.setState({ char1: RICK, char2: MORTY });
    render(<SharedEpisodes />);

    await waitFor(() => {
      expect(screen.getByText("Episode 2")).toBeInTheDocument();
      expect(screen.getByText("Episode 3")).toBeInTheDocument();
    });

    // Episode 1 (Rick only) and 4 (Morty only) should NOT appear
    expect(screen.queryByText("Episode 1")).not.toBeInTheDocument();
    expect(screen.queryByText("Episode 4")).not.toBeInTheDocument();
  });

  it("shows 'No comparten episodios' when there are no shared episodes", async () => {
    (fetchEpisodes as jest.Mock)
      .mockResolvedValueOnce([ep(1)])
      .mockResolvedValueOnce([ep(2)]);

    useComparisonStore.setState({ char1: RICK, char2: MORTY });
    render(<SharedEpisodes />);

    await waitFor(() => {
      expect(screen.getByText("No comparten episodios")).toBeInTheDocument();
    });
  });

  it("shows error message when fetchEpisodes throws", async () => {
    (fetchEpisodes as jest.Mock).mockRejectedValue(new Error("API down"));
    useComparisonStore.setState({ char1: RICK, char2: MORTY });

    render(<SharedEpisodes />);

    await waitFor(() => {
      expect(screen.getByText("API down")).toBeInTheDocument();
    });
  });

  it("shows fallback error for non-Error throws", async () => {
    (fetchEpisodes as jest.Mock).mockRejectedValue("oops");
    useComparisonStore.setState({ char1: RICK, char2: MORTY });

    render(<SharedEpisodes />);

    await waitFor(() => {
      expect(screen.getByText("Error loading episodes")).toBeInTheDocument();
    });
  });
});
