import { render, screen } from "@testing-library/react";
import Home from "../../app/page";

// PanelsSection is an async Server Component — mock it to render synchronously
jest.mock("../../components/features/PanelsSection", () => ({
  PanelsSection: () => <div data-testid="panels-section" />,
}));

// EpisodeComparison uses Zustand store and async fetches — mock it
jest.mock("../../components/features/EpisodeComparison", () => ({
  EpisodeComparison: () => <div data-testid="episode-comparison" />,
}));

// ScrollFAB uses IntersectionObserver — mock it
jest.mock("../../components/features/ScrollFAB", () => ({
  ScrollFAB: () => <div data-testid="scroll-fab" />,
}));

describe("Home page", () => {
  it("renders the AppIntro heading", () => {
    render(<Home />);
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    expect(screen.getByText(/explorer/i)).toBeInTheDocument();
  });

  it("renders the AppIntro step instructions", () => {
    render(<Home />);
    expect(screen.getByText(/elegí un personaje en el panel #1/i)).toBeInTheDocument();
  });

  it("renders PanelsSection inside Suspense", () => {
    render(<Home />);
    expect(screen.getByTestId("panels-section")).toBeInTheDocument();
  });

  it("renders EpisodeComparison", () => {
    render(<Home />);
    expect(screen.getByTestId("episode-comparison")).toBeInTheDocument();
  });

  it("renders ScrollFAB", () => {
    render(<Home />);
    expect(screen.getByTestId("scroll-fab")).toBeInTheDocument();
  });

  it("matches snapshot", () => {
    const { container } = render(<Home />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
