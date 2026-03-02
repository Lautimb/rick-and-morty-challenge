import { render, screen } from "@testing-library/react";
import { Header } from "@/components/layout/Header";

// Mock ThemeSelectorLoader (dynamic import, ssr:false) to render a simple placeholder
jest.mock("../../../components/features/ThemeSelector", () => ({
  ThemeSelectorLoader: () => <div data-testid="theme-selector" />,
}));

describe("Header", () => {
  it("renders inside a header element", () => {
    render(<Header />);
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });

  it("renders the site logo image", () => {
    render(<Header />);
    expect(screen.getByAltText("Rick Sanchez")).toBeInTheDocument();
  });

  it("renders the site name text", () => {
    render(<Header />);
    expect(screen.getByText(/rick & morty/i)).toBeInTheDocument();
  });

  it("logo link points to the home page", () => {
    render(<Header />);
    const logoLink = screen.getByRole("link", { name: /rick & morty/i });
    expect(logoLink).toHaveAttribute("href", "/");
  });

  it("renders the GitHub repository link", () => {
    render(<Header />);
    const githubLink = screen.getByRole("link", { name: /ver repositorio/i });
    expect(githubLink).toHaveAttribute(
      "href",
      "https://github.com/Lautimb/rick-and-morty-challenge"
    );
    expect(githubLink).toHaveAttribute("target", "_blank");
    expect(githubLink).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders the ThemeSelectorLoader", () => {
    render(<Header />);
    expect(screen.getByTestId("theme-selector")).toBeInTheDocument();
  });

  it("matches snapshot", () => {
    const { container } = render(<Header />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
