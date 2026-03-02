import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ScrollFAB } from "@/components/features/ScrollFAB";
import { useComparisonStore } from "@/store/comparisonStore";

let intersectionCallback: (entries: IntersectionObserverEntry[]) => void;
const mockObserve = jest.fn();
const mockDisconnect = jest.fn();

beforeAll(() => {
  global.IntersectionObserver = jest.fn().mockImplementation((cb) => {
    intersectionCallback = cb;
    return { observe: mockObserve, disconnect: mockDisconnect, unobserve: jest.fn() };
  });
});

beforeEach(() => {
  useComparisonStore.setState({ char1: null, char2: null });
  jest.clearAllMocks();
  window.scrollTo = jest.fn();
});

const RICK = { id: 1, name: "Rick Sanchez", image: "", status: "Alive" as const, species: "Human", episode: [] };
const MORTY = { id: 2, name: "Morty Smith", image: "", status: "Alive" as const, species: "Human", episode: [] };

describe("ScrollFAB", () => {
  it("has pointer-events-none and translate-y-20 when no characters are selected", () => {
    render(<ScrollFAB />);
    const btn = screen.getByRole("button");
    expect(btn.className).toContain("pointer-events-none");
    expect(btn.className).toContain("translate-y-20");
  });

  it("becomes visible (translate-y-0) when both characters are selected", () => {
    useComparisonStore.setState({ char1: RICK, char2: MORTY });
    render(<ScrollFAB />);
    const btn = screen.getByRole("button");
    expect(btn.className).toContain("translate-y-0");
    expect(btn.className).not.toContain("pointer-events-none");
  });

  it("aria-label is 'Ver episodios' when NOT at the episodes section", () => {
    useComparisonStore.setState({ char1: RICK, char2: MORTY });
    render(<ScrollFAB />);
    expect(screen.getByRole("button", { name: /ver episodios/i })).toBeInTheDocument();
  });

  it("calls scrollIntoView when clicked and NOT at episodes section", async () => {
    useComparisonStore.setState({ char1: RICK, char2: MORTY });

    const section = document.createElement("div");
    section.id = "episode-comparison";
    const mockScrollIntoView = jest.fn();
    section.scrollIntoView = mockScrollIntoView;
    document.body.appendChild(section);

    render(<ScrollFAB />);
    await userEvent.click(screen.getByRole("button"));
    expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: "smooth" });

    document.body.removeChild(section);
  });

  it("aria-label changes to 'Volver arriba' when at the episodes section", async () => {
    const section = document.createElement("div");
    section.id = "episode-comparison";
    document.body.appendChild(section);

    useComparisonStore.setState({ char1: RICK, char2: MORTY });
    render(<ScrollFAB />);

    // Simulate IntersectionObserver firing with isIntersecting=true
    act(() => {
      intersectionCallback([{ isIntersecting: true } as IntersectionObserverEntry]);
    });

    expect(screen.getByRole("button", { name: /volver arriba/i })).toBeInTheDocument();

    document.body.removeChild(section);
  });

  it("calls window.scrollTo when clicked at episodes section", async () => {
    const section = document.createElement("div");
    section.id = "episode-comparison";
    document.body.appendChild(section);

    useComparisonStore.setState({ char1: RICK, char2: MORTY });
    render(<ScrollFAB />);

    act(() => {
      intersectionCallback([{ isIntersecting: true } as IntersectionObserverEntry]);
    });

    await userEvent.click(screen.getByRole("button"));
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "smooth" });

    document.body.removeChild(section);
  });

  it("disconnects the observer on unmount", () => {
    const section = document.createElement("div");
    section.id = "episode-comparison";
    document.body.appendChild(section);

    const { unmount } = render(<ScrollFAB />);
    unmount();
    expect(mockDisconnect).toHaveBeenCalled();

    document.body.removeChild(section);
  });
});
