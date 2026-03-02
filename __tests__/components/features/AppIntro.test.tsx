import { render, screen } from "@testing-library/react";
import { AppIntro } from "@/components/features/AppIntro";

describe("AppIntro", () => {
  it("renders the main heading with 'Explorer'", () => {
    render(<AppIntro />);
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    expect(screen.getByText(/explorer/i)).toBeInTheDocument();
  });

  it("renders all three step numbers", () => {
    render(<AppIntro />);
    expect(screen.getByText("01")).toBeInTheDocument();
    expect(screen.getByText("02")).toBeInTheDocument();
    expect(screen.getByText("03")).toBeInTheDocument();
  });

  it("renders all three step instructions", () => {
    render(<AppIntro />);
    expect(screen.getByText(/elegí un personaje en el panel #1/i)).toBeInTheDocument();
    expect(screen.getByText(/elegí un personaje en el panel #2/i)).toBeInTheDocument();
    expect(screen.getByText(/explorá sus episodios compartidos/i)).toBeInTheDocument();
  });

  it("renders chevron separators between steps (not after the last step)", () => {
    const { container } = render(<AppIntro />);
    const svgs = container.querySelectorAll("svg");
    expect(svgs.length).toBe(4);
  });

  it("matches snapshot", () => {
    const { container } = render(<AppIntro />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
