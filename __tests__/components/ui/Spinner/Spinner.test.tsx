import { render, screen } from "@testing-library/react";
import { Spinner } from "@/components/ui/Spinner/Spinner";

describe("Spinner", () => {
  it("has role='status'", () => {
    render(<Spinner />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("has aria-label='Cargando'", () => {
    render(<Spinner />);
    expect(screen.getByRole("status")).toHaveAttribute("aria-label", "Cargando");
  });

  it("applies w-6 h-6 classes for the default size (md)", () => {
    render(<Spinner />);
    expect(screen.getByRole("status")).toHaveClass("w-6", "h-6");
  });

  it("applies w-4 h-4 classes for size='sm'", () => {
    render(<Spinner size="sm" />);
    expect(screen.getByRole("status")).toHaveClass("w-4", "h-4");
  });

  it("applies w-8 h-8 classes for size='lg'", () => {
    render(<Spinner size="lg" />);
    expect(screen.getByRole("status")).toHaveClass("w-8", "h-8");
  });

  it("forwards className to the outer wrapper without affecting the inner spinner", () => {
    const { container } = render(<Spinner className="my-class" />);
    expect(container.firstChild).toHaveClass("my-class");
    expect(screen.getByRole("status")).toHaveClass("animate-spin");
  });

  it("matches snapshot (default md size)", () => {
    const { container } = render(<Spinner />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
