import { renderHook, act } from "@testing-library/react";
import { useLocalPagination } from "@/hooks/useLocalPagination";

// PAGE_SIZE is 5 (internal constant)
const ITEMS = Array.from({ length: 12 }, (_, i) => i + 1); 

describe("useLocalPagination", () => {
  it("returns the first PAGE_SIZE items on initialization", () => {
    const { result } = renderHook(() => useLocalPagination(ITEMS));
    expect(result.current.currentItems).toEqual([1, 2, 3, 4, 5]);
  });

  it("computes totalPages as ceil(items.length / PAGE_SIZE)", () => {
    const { result } = renderHook(() => useLocalPagination(ITEMS));
    expect(result.current.totalPages).toBe(3); // ceil(12/5) = 3
  });

  it("starts on page 1 with hasPrev=false and hasNext=true", () => {
    const { result } = renderHook(() => useLocalPagination(ITEMS));
    expect(result.current.currentPage).toBe(1);
    expect(result.current.hasPrev).toBe(false);
    expect(result.current.hasNext).toBe(true);
  });

  it("isLoading is always false (local pagination needs no fetch)", () => {
    const { result } = renderHook(() => useLocalPagination(ITEMS));
    expect(result.current.isLoading).toBe(false);
  });

  it("goTo(2) updates currentPage and returns the correct slice", () => {
    const { result } = renderHook(() => useLocalPagination(ITEMS));
    act(() => result.current.goTo(2));
    expect(result.current.currentPage).toBe(2);
    expect(result.current.currentItems).toEqual([6, 7, 8, 9, 10]);
    expect(result.current.hasPrev).toBe(true);
    expect(result.current.hasNext).toBe(true);
  });

  it("goTo last page returns the remaining items (less than PAGE_SIZE)", () => {
    const { result } = renderHook(() => useLocalPagination(ITEMS));
    act(() => result.current.goTo(3));
    expect(result.current.currentItems).toEqual([11, 12]);
    expect(result.current.hasNext).toBe(false);
  });

  it("goNext advances to the next page", () => {
    const { result } = renderHook(() => useLocalPagination(ITEMS));
    act(() => result.current.goNext());
    expect(result.current.currentPage).toBe(2);
  });

  it("goPrev goes back to the previous page", () => {
    const { result } = renderHook(() => useLocalPagination(ITEMS));
    act(() => result.current.goTo(3));
    act(() => result.current.goPrev());
    expect(result.current.currentPage).toBe(2);
  });

  it("goTo(0) is a no-op", () => {
    const { result } = renderHook(() => useLocalPagination(ITEMS));
    act(() => result.current.goTo(0));
    expect(result.current.currentPage).toBe(1);
  });

  it("goTo beyond totalPages is a no-op", () => {
    const { result } = renderHook(() => useLocalPagination(ITEMS));
    act(() => result.current.goTo(99));
    expect(result.current.currentPage).toBe(1);
  });

  it("goPrev on page 1 is a no-op", () => {
    const { result } = renderHook(() => useLocalPagination(ITEMS));
    act(() => result.current.goPrev());
    expect(result.current.currentPage).toBe(1);
  });

  it("goNext on last page is a no-op", () => {
    const { result } = renderHook(() => useLocalPagination(ITEMS));
    act(() => result.current.goTo(3));
    act(() => result.current.goNext());
    expect(result.current.currentPage).toBe(3);
  });

  it("totalPages is 1 (not 0) for an empty array", () => {
    const { result } = renderHook(() => useLocalPagination([]));
    expect(result.current.totalPages).toBe(1);
    expect(result.current.currentItems).toEqual([]);
    expect(result.current.hasNext).toBe(false);
  });

  it("a single item has totalPages=1 and hasNext=false", () => {
    const { result } = renderHook(() => useLocalPagination([42]));
    expect(result.current.totalPages).toBe(1);
    expect(result.current.hasNext).toBe(false);
    expect(result.current.currentItems).toEqual([42]);
  });

  it("resets to page 1 when resetKey changes", () => {
    let key = "A";
    const { result, rerender } = renderHook(() => useLocalPagination(ITEMS, key));

    act(() => result.current.goTo(3));
    expect(result.current.currentPage).toBe(3);

    key = "B";
    rerender();
    expect(result.current.currentPage).toBe(1);
  });

  it("does NOT reset when resetKey stays the same", () => {
    const { result, rerender } = renderHook(() => useLocalPagination(ITEMS, "same"));

    act(() => result.current.goTo(2));
    rerender();
    expect(result.current.currentPage).toBe(2);
  });
});
