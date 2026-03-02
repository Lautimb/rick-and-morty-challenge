import { render, screen } from "@testing-library/react";
import { EpisodeColumnShell } from "@/components/features/EpisodeComparison/EpisodeColumnShell";
import type { Episode } from "@/libs/types";

const ep = (id: number): Episode => ({
  id,
  name: `Episode ${id}`,
  air_date: "December 2, 2013",
  episode: `S01E0${id}`,
});

describe("EpisodeColumnShell", () => {
  const baseProps = {
    title: "Rick Sanchez",
    episodes: [] as Episode[],
    isPending: false,
    error: null,
  };

  it("renders the title", () => {
    render(<EpisodeColumnShell {...baseProps} />);
    expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();
  });

  it("shows a spinner when isPending=true", () => {
    render(<EpisodeColumnShell {...baseProps} isPending />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("hides the episode list when isPending=true", () => {
    render(<EpisodeColumnShell {...baseProps} isPending episodes={[ep(1)]} />);
    expect(screen.queryByText("Episode 1")).not.toBeInTheDocument();
  });

  it("shows error message when error is not null", () => {
    render(<EpisodeColumnShell {...baseProps} error="Network error" />);
    expect(screen.getByText("Network error")).toBeInTheDocument();
  });

  it("shows the episode list when not pending", () => {
    render(<EpisodeColumnShell {...baseProps} episodes={[ep(1), ep(2)]} />);
    expect(screen.getByText("Episode 1")).toBeInTheDocument();
    expect(screen.getByText("Episode 2")).toBeInTheDocument();
  });

  it("shows custom emptyMessage when episodes array is empty and not pending", () => {
    render(
      <EpisodeColumnShell {...baseProps} emptyMessage="No hay nada" />
    );
    expect(screen.getByText("No hay nada")).toBeInTheDocument();
  });

  it("centerTitle prop applies text-center class to the title", () => {
    const { container } = render(
      <EpisodeColumnShell {...baseProps} centerTitle />
    );
    const heading = container.querySelector("h3");
    expect(heading?.className).toContain("text-center");
  });

  it("without centerTitle, title has truncate class", () => {
    const { container } = render(<EpisodeColumnShell {...baseProps} />);
    const heading = container.querySelector("h3");
    expect(heading?.className).toContain("truncate");
  });
});
