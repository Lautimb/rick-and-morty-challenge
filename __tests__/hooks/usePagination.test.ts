import { renderHook, act } from "@testing-library/react";
import { usePagination } from "@/hooks/usePagination";
import { fetchCharactersPage } from "@/libs/api/characters";
import type { Character, CharactersPage } from "@/libs/types";

jest.mock("../../libs/api/characters");

const makeChar = (id: number): Character => ({
  id,
  name: `Character ${id}`,
  image: `https://example.com/${id}.jpg`,
  status: "Alive",
  species: "Human",
  episode: [],
});

const API_PAGE_1 = Array.from({ length: 20 }, (_, i) => makeChar(i + 1));
const API_PAGE_2 = Array.from({ length: 20 }, (_, i) => makeChar(i + 21));

const INITIAL_DATA: CharactersPage = {
  info: { count: 826, pages: 42, next: 2, prev: null },
  results: API_PAGE_1,
};


const fetchedPages = () =>
  (fetchCharactersPage as jest.Mock).mock.calls.map((args) => args[0]);

describe("usePagination", () => {
  let mockNow: number;

  beforeEach(() => {
    jest.clearAllMocks();
    mockNow = 1_000_000;
    jest.spyOn(Date, "now").mockImplementation(() => mockNow);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  const tick = () => { mockNow += 400; };

  it("initializes characters with the first UI_PAGE_SIZE items from initialData", () => {
    const { result } = renderHook(() => usePagination(INITIAL_DATA));
    expect(result.current.characters).toEqual(API_PAGE_1.slice(0, 6)); // ids 1-6
    expect(result.current.characters).toHaveLength(6);
  });

  it("starts on page 1 with hasPrev=false", () => {
    const { result } = renderHook(() => usePagination(INITIAL_DATA));
    expect(result.current.currentPage).toBe(1);
    expect(result.current.hasPrev).toBe(false);
  });

  it("hasNext=true when there are more pages", () => {
    const { result } = renderHook(() => usePagination(INITIAL_DATA));
    expect(result.current.hasNext).toBe(true);
  });

  it("computes totalPages as ceil(count / UI_PAGE_SIZE)", () => {
    const { result } = renderHook(() => usePagination(INITIAL_DATA));
    expect(result.current.totalPages).toBe(Math.ceil(826 / 6)); // 138
  });

  it("initializes with isLoading=false and error=null", () => {
    const { result } = renderHook(() => usePagination(INITIAL_DATA));
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("navigates to page 2 from cache without fetching", async () => {
    const { result } = renderHook(() => usePagination(INITIAL_DATA));

    await act(async () => {
      await result.current.goTo(2);
    });

    expect(fetchCharactersPage).not.toHaveBeenCalled();
    expect(result.current.currentPage).toBe(2);
    expect(result.current.characters.map((c) => c.id)).toEqual([7, 8, 9, 10, 11, 12]);
  });

  it("sets hasPrev=true and hasNext=true on an intermediate page", async () => {
    const { result } = renderHook(() => usePagination(INITIAL_DATA));
    await act(async () => { await result.current.goTo(2); });
    expect(result.current.hasPrev).toBe(true);
    expect(result.current.hasNext).toBe(true);
  });

  it("fetches the missing API page when navigating to an uncached UI page", async () => {
    (fetchCharactersPage as jest.Mock).mockResolvedValueOnce({
      info: INITIAL_DATA.info,
      results: API_PAGE_2,
    });

    const { result } = renderHook(() => usePagination(INITIAL_DATA));
    await act(async () => { await result.current.goTo(5); });

    expect(fetchCharactersPage).toHaveBeenCalledTimes(1);
    expect(fetchedPages()).toEqual([2]); 
    expect(result.current.currentPage).toBe(5);
    expect(result.current.characters.map((c) => c.id)).toEqual([25, 26, 27, 28, 29, 30]);
  });

  it("isLoading returns to false after a successful fetch", async () => {
    (fetchCharactersPage as jest.Mock).mockResolvedValueOnce({
      info: INITIAL_DATA.info,
      results: API_PAGE_2,
    });
    const { result } = renderHook(() => usePagination(INITIAL_DATA));
    await act(async () => { await result.current.goTo(5); });
    expect(result.current.isLoading).toBe(false);
  });

  it("fetches ONLY the missing API page when a UI page spans two API pages", async () => {
    (fetchCharactersPage as jest.Mock).mockResolvedValueOnce({
      info: INITIAL_DATA.info,
      results: API_PAGE_2,
    });

    const { result } = renderHook(() => usePagination(INITIAL_DATA));
    await act(async () => { await result.current.goTo(4); });

    expect(fetchCharactersPage).toHaveBeenCalledTimes(1);
    expect(fetchedPages()).toEqual([2]);
    expect(fetchedPages()).not.toContain(1);

    expect(result.current.characters.map((c) => c.id)).toEqual([19, 20, 21, 22, 23, 24]);
  });

  it("goTo the current page is a no-op", async () => {
    const { result } = renderHook(() => usePagination(INITIAL_DATA));
    await act(async () => { await result.current.goTo(1); });
    expect(fetchCharactersPage).not.toHaveBeenCalled();
    expect(result.current.currentPage).toBe(1);
  });

  it("goTo(0) is a no-op", async () => {
    const { result } = renderHook(() => usePagination(INITIAL_DATA));
    await act(async () => { await result.current.goTo(0); });
    expect(result.current.currentPage).toBe(1);
    expect(fetchCharactersPage).not.toHaveBeenCalled();
  });

  it("goTo beyond totalPages is a no-op", async () => {
    const { result } = renderHook(() => usePagination(INITIAL_DATA));
    await act(async () => { await result.current.goTo(9999); });
    expect(result.current.currentPage).toBe(1);
    expect(fetchCharactersPage).not.toHaveBeenCalled();
  });

  it("sets error message and resets isLoading when fetch fails", async () => {
    (fetchCharactersPage as jest.Mock).mockRejectedValueOnce(
      new Error("Network error")
    );
    const { result } = renderHook(() => usePagination(INITIAL_DATA));

    await act(async () => { await result.current.goTo(5); });

    expect(result.current.error).toBe("Network error");
    expect(result.current.isLoading).toBe(false);
    expect(result.current.currentPage).toBe(1);
  });

  it("sets a fallback error message for non-Error throws", async () => {
    (fetchCharactersPage as jest.Mock).mockRejectedValueOnce("plain string error");
    const { result } = renderHook(() => usePagination(INITIAL_DATA));

    await act(async () => { await result.current.goTo(5); });

    expect(result.current.error).toBe("Error loading characters");
  });

  it("goNext advances to the next page (within cache)", async () => {
    const { result } = renderHook(() => usePagination(INITIAL_DATA));
    await act(async () => { await result.current.goNext(); });
    expect(result.current.currentPage).toBe(2);
  });

  it("goPrev goes back to the previous page", async () => {
    const { result } = renderHook(() => usePagination(INITIAL_DATA));
    await act(async () => { await result.current.goTo(2); });
    tick(); 
    await act(async () => { await result.current.goPrev(); });
    expect(result.current.currentPage).toBe(1);
    expect(result.current.hasPrev).toBe(false);
  });
});
