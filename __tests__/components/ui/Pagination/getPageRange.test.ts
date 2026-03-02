import { getPageRange } from "@/components/ui/Pagination/utils";

describe("getPageRange", () => {
  it("returns full sequential range when total ≤ visibleMax (7 with siblingCount=1)", () => {
    expect(getPageRange(1, 7)).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  it("returns [1] for total = 1", () => {
    expect(getPageRange(1, 1)).toEqual([1]);
  });

  it("does NOT add left ellipsis when currentPage ≤ siblingCount+3 (exact boundary: 4)", () => {
    expect(getPageRange(4, 20)).toEqual([1, 2, 3, 4, 5, "...", 20]);
  });

  it("adds left ellipsis when currentPage > siblingCount+3 (current=5)", () => {
    expect(getPageRange(5, 20)).toEqual([1, "...", 4, 5, 6, "...", 20]);
  });

  it("starting from page 1 produces no left ellipsis", () => {
    expect(getPageRange(1, 20)).toEqual([1, 2, 3, 4, 5, "...", 20]);
  });

  it("does NOT add right ellipsis when currentPage ≥ total−siblingCount−2 (exact boundary)", () => {
    expect(getPageRange(17, 20)).toEqual([1, "...", 16, 17, 18, 19, 20]);
  });

  it("handles the last page correctly", () => {
    expect(getPageRange(20, 20)).toEqual([1, "...", 16, 17, 18, 19, 20]);
  });

  it("shows both ellipses when currentPage is in the middle", () => {
    expect(getPageRange(10, 20)).toEqual([1, "...", 9, 10, 11, "...", 20]);
  });

  it("expands the sibling window with siblingCount=2", () => {
    expect(getPageRange(10, 20, 2)).toEqual([
      1, "...", 8, 9, 10, 11, 12, "...", 20,
    ]);
  });

  it("returns full range when total ≤ visibleMax with siblingCount=2", () => {
    expect(getPageRange(1, 9, 2)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });
});
