import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { EpisodeList } from "@/components/features/EpisodeComparison/EpisodeList";
import type { Episode } from "@/libs/types";

const ep = (id: number): Episode => ({
  id,
  name: `Episode ${id}`,
  air_date: "December 2, 2013",
  episode: `S01E0${id}`,
});

const FEW_EPISODES = [ep(1), ep(2), ep(3)];
const MANY_EPISODES = Array.from({ length: 7 }, (_, i) => ep(i + 1));

describe("EpisodeList (EpisodeComparison feature)", () => {
  it("shows emptyMessage when episodes array is empty", () => {
    render(<EpisodeList episodes={[]} emptyMessage="No episodes here" />);
    expect(screen.getByText("No episodes here")).toBeInTheDocument();
  });

  it("uses default emptyMessage when not provided", () => {
    render(<EpisodeList episodes={[]} />);
    expect(screen.getByText("No hay episodios")).toBeInTheDocument();
  });

  it("renders all episodes when count is below PAGE_SIZE", () => {
    render(<EpisodeList episodes={FEW_EPISODES} />);
    expect(screen.getByText("Episode 1")).toBeInTheDocument();
    expect(screen.getByText("Episode 3")).toBeInTheDocument();
  });

  it("does NOT show pagination when episodes count <= PAGE_SIZE", () => {
    render(<EpisodeList episodes={FEW_EPISODES} />);
    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
  });

  it("shows pagination when episodes count > PAGE_SIZE", () => {
    render(<EpisodeList episodes={MANY_EPISODES} />);
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("pagination shows page 1 episodes only initially", () => {
    render(<EpisodeList episodes={MANY_EPISODES} />);
    expect(screen.getByText("Episode 1")).toBeInTheDocument();
    expect(screen.queryByText("Episode 6")).not.toBeInTheDocument();
  });

  it("navigates to page 2 when Next is clicked", async () => {
    render(<EpisodeList episodes={MANY_EPISODES} />);
    const nextBtn = screen.getByRole("button", { name: /siguiente/i });
    await userEvent.click(nextBtn);
    expect(screen.getByText("Episode 6")).toBeInTheDocument();
    expect(screen.queryByText("Episode 1")).not.toBeInTheDocument();
  });
});
