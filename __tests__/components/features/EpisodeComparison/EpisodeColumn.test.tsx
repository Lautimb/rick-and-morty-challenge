import { render, screen } from "@testing-library/react";
import { EpisodeColumn } from "@/components/features/EpisodeComparison/EpisodeColumn";
import type { Episode } from "@/libs/types";

const ep = (id: number): Episode => ({
  id,
  name: `Episode ${id}`,
  air_date: "December 2, 2013",
  episode: `S01E0${id}`,
});

const baseProps = {
  title: "Rick Sanchez",
  episodes: [] as Episode[],
  isPending: false,
  error: null,
  resetKey: 1,
};

describe("EpisodeColumn", () => {
  it("renders the character name as the column title", () => {
    render(<EpisodeColumn {...baseProps} />);
    expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();
  });

  it("displays all provided episodes", () => {
    render(<EpisodeColumn {...baseProps} episodes={[ep(1), ep(2)]} />);
    expect(screen.getByText("Episode 1")).toBeInTheDocument();
    expect(screen.getByText("Episode 2")).toBeInTheDocument();
  });

  it("shows 'No hay episodios' when episodes array is empty", () => {
    render(<EpisodeColumn {...baseProps} />);
    expect(screen.getByText("No hay episodios")).toBeInTheDocument();
  });

  it("shows error message when error is provided", () => {
    render(<EpisodeColumn {...baseProps} error="Server down" />);
    expect(screen.getByText("Server down")).toBeInTheDocument();
  });
});
