import { render, screen } from "@testing-library/react";
import { SharedEpisodes } from "@/components/features/EpisodeComparison/SharedEpisodes";
import type { Episode } from "@/libs/types";

const ep = (id: number): Episode => ({
  id,
  name: `Episode ${id}`,
  air_date: "December 2, 2013",
  episode: `S01E0${id}`,
});

const baseProps = {
  episodes: [] as Episode[],
  isPending: false,
  error: null,
};

describe("SharedEpisodes", () => {
  it("renders 'Episodios compartidos' as title", () => {
    render(<SharedEpisodes {...baseProps} />);
    expect(screen.getByText("Episodios compartidos")).toBeInTheDocument();
  });

  it("displays the provided shared episodes", () => {
    render(<SharedEpisodes {...baseProps} episodes={[ep(2), ep(3)]} />);
    expect(screen.getByText("Episode 2")).toBeInTheDocument();
    expect(screen.getByText("Episode 3")).toBeInTheDocument();
  });

  it("shows 'No comparten episodios' when episodes array is empty", () => {
    render(<SharedEpisodes {...baseProps} />);
    expect(screen.getByText("No comparten episodios")).toBeInTheDocument();
  });

  it("shows error message when error is provided", () => {
    render(<SharedEpisodes {...baseProps} error="API down" />);
    expect(screen.getByText("API down")).toBeInTheDocument();
  });
});
