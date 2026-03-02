import { render, screen } from "@testing-library/react";
import { HomeSkeleton } from "@/components/layout/SkeletonHome";

describe("HomeSkeleton", () => {
  it("renders without crashing", () => {
    const { container } = render(<HomeSkeleton />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders multiple animate-pulse placeholder elements", () => {
    const { container } = render(<HomeSkeleton />);
    const pulseElements = container.querySelectorAll(".animate-pulse");
    expect(pulseElements.length).toBeGreaterThan(0);
  });

  it("matches snapshot", () => {
    const { container } = render(<HomeSkeleton />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
