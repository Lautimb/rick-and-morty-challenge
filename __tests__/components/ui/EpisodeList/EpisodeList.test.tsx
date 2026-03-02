import { render, screen } from "@testing-library/react";
import { EpisodeList } from "@/components/ui/EpisodeList/EpisodeList";
import type { Episode } from "@/libs/types";

const EPISODES: Episode[] = [
  { id: 1, name: "Pilot", air_date: "December 2, 2013", episode: "S01E01" },
  { id: 28, name: "Something Ricked This Way Comes", air_date: "March 3, 2014", episode: "S01E09" },
];

describe("EpisodeList", () => {
  it("renders null when episodes=[]", () => {
    render(<EpisodeList episodes={[]} />);
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });

  it("renders the episode code (e.g. S01E01)", () => {
    render(<EpisodeList episodes={EPISODES} />);
    expect(screen.getByText("S01E01")).toBeInTheDocument();
  });

  it("renders the episode name", () => {
    render(<EpisodeList episodes={EPISODES} />);
    expect(screen.getByText("Pilot")).toBeInTheDocument();
  });

  it("renders the air date", () => {
    render(<EpisodeList episodes={EPISODES} />);
    expect(screen.getByText("December 2, 2013")).toBeInTheDocument();
  });

  it("renders as many <li> items as episodes provided", () => {
    render(<EpisodeList episodes={EPISODES} />);
    expect(screen.getAllByRole("listitem")).toHaveLength(EPISODES.length);
  });

  it("renders a single episode correctly", () => {
    render(<EpisodeList episodes={[EPISODES[0]]} />);
    expect(screen.getAllByRole("listitem")).toHaveLength(1);
    expect(screen.getByText("Pilot")).toBeInTheDocument();
  });

  it("matches snapshot", () => {
    const { container } = render(<EpisodeList episodes={EPISODES} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
