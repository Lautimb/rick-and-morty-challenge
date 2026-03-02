import { render, screen } from "@testing-library/react";
import { CardBadge } from "@/components/ui/Card/CardBadge";

describe("CardBadge", () => {
  it("renders the status text as default content when no children are given", () => {
    render(<CardBadge status="Alive" />);
    expect(screen.getByText("Alive")).toBeInTheDocument();
  });

  it("renders 'Dead' as default text with status Dead", () => {
    render(<CardBadge status="Dead" />);
    expect(screen.getByText("Dead")).toBeInTheDocument();
  });

  it("renders 'unknown' as default text with status unknown", () => {
    render(<CardBadge status="unknown" />);
    expect(screen.getByText("unknown")).toBeInTheDocument();
  });

  it("renders a green dot for Alive status", () => {
    const { container } = render(<CardBadge status="Alive" />);
    expect(container.querySelector(".bg-green-400")).toBeInTheDocument();
  });

  it("renders a red dot for Dead status", () => {
    const { container } = render(<CardBadge status="Dead" />);
    expect(container.querySelector(".bg-red-500")).toBeInTheDocument();
  });

  it("renders a gray dot for unknown status", () => {
    const { container } = render(<CardBadge status="unknown" />);
    expect(container.querySelector(".bg-gray-400")).toBeInTheDocument();
  });

  it("renders the custom icon instead of the StatusDot", () => {
    render(
      <CardBadge status="Alive" icon={<span data-testid="custom-icon" />} />
    );
    expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
  });

  it("does NOT render the StatusDot when a custom icon is provided", () => {
    const { container } = render(
      <CardBadge status="Alive" icon={<span />} />
    );
    expect(container.querySelector(".bg-green-400")).not.toBeInTheDocument();
  });

  it("renders children instead of the status text", () => {
    render(<CardBadge status="Alive">Custom label</CardBadge>);
    expect(screen.getByText("Custom label")).toBeInTheDocument();
    expect(screen.queryByText("Alive")).not.toBeInTheDocument();
  });

  it("does not crash when rendered with no props", () => {
    const { container } = render(<CardBadge />);
    expect(container.querySelector("span")).toBeInTheDocument();
  });

  it("renders no color dot when neither status nor icon is provided", () => {
    const { container } = render(<CardBadge />);
    expect(container.querySelector(".bg-green-400")).not.toBeInTheDocument();
    expect(container.querySelector(".bg-red-500")).not.toBeInTheDocument();
    expect(container.querySelector(".bg-gray-400")).not.toBeInTheDocument();
  });

  it("matches snapshot for Alive status", () => {
    const { container } = render(<CardBadge status="Alive" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it("matches snapshot for Dead status", () => {
    const { container } = render(<CardBadge status="Dead" />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
