import { render, screen } from "@testing-library/react";
import { CardRoot as Card } from "@/components/ui/Card/CardRoot";

describe("CardRoot", () => {
  it("renders as an <article> element", () => {
    render(<Card>Content</Card>);
    expect(screen.getByRole("article")).toBeInTheDocument();
  });

  it("renders its children", () => {
    render(<Card>Hello world</Card>);
    expect(screen.getByText("Hello world")).toBeInTheDocument();
  });

  it("includes the CVA base classes", () => {
    render(<Card data-testid="card">child</Card>);
    const card = screen.getByTestId("card");
    expect(card).toHaveClass("rounded-xl", "border-2", "border-purple-500");
  });

  it("merges a custom className without overriding the base classes", () => {
    render(<Card data-testid="card" className="extra-class">child</Card>);
    const card = screen.getByTestId("card");
    expect(card).toHaveClass("extra-class");
    expect(card).toHaveClass("rounded-xl");
  });

  it("forwards extra HTML attributes to the root element", () => {
    render(<Card data-testid="card" id="my-card">child</Card>);
    expect(screen.getByTestId("card")).toHaveAttribute("id", "my-card");
  });

  it("exposes all compound sub-components as static properties", () => {
    expect(Card.Media).toBeDefined();
    expect(Card.Overlay).toBeDefined();
    expect(Card.Badge).toBeDefined();
    expect(Card.Header).toBeDefined();
    expect(Card.Body).toBeDefined();
    expect(Card.Descripcion).toBeDefined();
    expect(Card.Footer).toBeDefined();
  });

  it("composes sub-components together without errors", () => {
    render(
      <Card data-testid="card">
        <Card.Header data-testid="header">Title</Card.Header>
        <Card.Body>
          <Card.Descripcion>Description</Card.Descripcion>
        </Card.Body>
        <Card.Footer data-testid="footer">Footer</Card.Footer>
      </Card>
    );
    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByTestId("footer")).toBeInTheDocument();
    expect(screen.getByText("Description")).toBeInTheDocument();
  });

  it("matches snapshot with full composition", () => {
    const { container } = render(
      <Card>
        <Card.Header>Title</Card.Header>
        <Card.Body>
          <Card.Descripcion>Alive · Human</Card.Descripcion>
        </Card.Body>
        <Card.Footer>S01E01</Card.Footer>
      </Card>
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
