import { render, screen } from "@testing-library/react";
import { Footer } from "@/components/layout/Footer";

describe("Footer", () => {
  it("renders inside a footer element", () => {
    render(<Footer />);
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  it("displays the current year in the copyright notice", () => {
    render(<Footer />);
    const year = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(year))).toBeInTheDocument();
  });

  it("renders the Rick & Morty API link with correct href", () => {
    render(<Footer />);
    const apiLink = screen.getByRole("link", { name: /rick & morty api/i });
    expect(apiLink).toHaveAttribute("href", "https://rickandmortyapi.com");
    expect(apiLink).toHaveAttribute("target", "_blank");
    expect(apiLink).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders the Next.js docs link", () => {
    render(<Footer />);
    const docsLink = screen.getByRole("link", { name: /next\.js/i });
    expect(docsLink).toHaveAttribute("href", "https://nextjs.org/docs");
    expect(docsLink).toHaveAttribute("target", "_blank");
  });

  it("matches snapshot", () => {
    const { container } = render(<Footer />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
