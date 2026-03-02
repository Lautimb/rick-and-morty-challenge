import { render } from "@testing-library/react";
import { PanelSkeleton } from "@/components/ui/Skeletons/PanelSkeleton";
import { PanelsSectionSkeleton } from "@/components/ui/Skeletons/PanelsSection";
import { UI_PAGE_SIZE } from "@/libs/constants/pagination";

describe("PanelSkeleton", () => {
  it(`renders exactly ${UI_PAGE_SIZE} animated card placeholders`, () => {
    const { container } = render(<PanelSkeleton />);
    const cards = container.querySelectorAll(".aspect-square.animate-pulse");
    expect(cards).toHaveLength(UI_PAGE_SIZE);
  });

  it("includes additional animated placeholders for the title and pagination bar", () => {
    const { container } = render(<PanelSkeleton />);
    const allPulse = container.querySelectorAll(".animate-pulse");
    expect(allPulse.length).toBeGreaterThan(UI_PAGE_SIZE);
  });

  it("matches snapshot", () => {
    const { container } = render(<PanelSkeleton />);
    expect(container.firstChild).toMatchSnapshot();
  });
});

describe("PanelsSectionSkeleton", () => {
  it(`renders ${UI_PAGE_SIZE * 2} card placeholders in total (2 panels × ${UI_PAGE_SIZE})`, () => {
    const { container } = render(<PanelsSectionSkeleton />);
    const cards = container.querySelectorAll(".aspect-square.animate-pulse");
    expect(cards).toHaveLength(UI_PAGE_SIZE * 2);
  });

  it("matches snapshot", () => {
    const { container } = render(<PanelsSectionSkeleton />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
