import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeSelector } from "@/components/features/ThemeSelector/ThemeSelector";

// ── Browser API mocks ──────────────────────────────────────────────────────

const mockAddEventListener = jest.fn();
const mockRemoveEventListener = jest.fn();
const mockMediaQueryList = {
  matches: false,
  addEventListener: mockAddEventListener,
  removeEventListener: mockRemoveEventListener,
};

beforeEach(() => {
  localStorage.clear();

  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockReturnValue(mockMediaQueryList),
  });

  jest.clearAllMocks();
});

describe("ThemeSelector", () => {
  it("renders without crashing", () => {
    const { container } = render(<ThemeSelector />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("reads initial theme from localStorage", () => {
    localStorage.setItem("theme", "dark");
    render(<ThemeSelector />);
    // With theme=dark, document.documentElement should have 'dark' class applied
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });

  it("defaults to 'system' theme when localStorage is empty", () => {
    render(<ThemeSelector />);
    // system + systemDark=false → no dark class
    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });

  it("opens the dropdown when the toggle button is clicked", async () => {
    render(<ThemeSelector />);
    const toggle = screen.getByRole("button");
    await userEvent.click(toggle);
    // Three theme options should appear
    expect(screen.getByText(/claro/i)).toBeInTheDocument();
    expect(screen.getByText(/oscuro/i)).toBeInTheDocument();
    expect(screen.getByText(/sistema/i)).toBeInTheDocument();
  });

  it("selects 'dark' theme and saves it to localStorage", async () => {
    render(<ThemeSelector />);
    await userEvent.click(screen.getByRole("button"));
    await userEvent.click(screen.getByText(/oscuro/i));
    expect(localStorage.getItem("theme")).toBe("dark");
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });

  it("selects 'light' theme and saves it to localStorage", async () => {
    localStorage.setItem("theme", "dark");
    render(<ThemeSelector />);
    await userEvent.click(screen.getByRole("button"));
    await userEvent.click(screen.getByText(/claro/i));
    expect(localStorage.getItem("theme")).toBe("light");
    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });

  it("closes the dropdown after selecting a theme", async () => {
    render(<ThemeSelector />);
    await userEvent.click(screen.getByRole("button")); // open
    await userEvent.click(screen.getByText(/oscuro/i)); // select → close
    expect(screen.queryByText(/claro/i)).not.toBeInTheDocument();
  });

  it("subscribes to matchMedia changes when theme is 'system'", () => {
    render(<ThemeSelector />);
    // theme defaults to 'system', so it should add a listener
    expect(mockAddEventListener).toHaveBeenCalledWith("change", expect.any(Function));
  });

  it("does NOT subscribe to matchMedia when theme is not 'system'", async () => {
    localStorage.setItem("theme", "dark");
    render(<ThemeSelector />);
    // dark theme — no system listener needed
    expect(mockAddEventListener).not.toHaveBeenCalled();
  });
});
