import { normalizeCharacter, graphqlFetch, buildEpisodeSets } from "@/libs/api/utils";
import { GRAPHQL_URL, GET_CHARACTERS_QUERY } from "@/libs/api/queries";
import type { RawCharacter, Episode } from "@/libs/types";

// ── Fixtures ──────────────────────────────────────────────────────────────────

const RAW: RawCharacter = {
  id: "1",
  name: "Rick Sanchez",
  image: "https://example.com/rick.jpeg",
  status: "Alive",
  species: "Human",
  episode: [{ id: "1" }, { id: "2" }, { id: "3" }],
};

const ep = (id: number): Episode => ({
  id,
  name: `Episode ${id}`,
  air_date: "December 2, 2013",
  episode: `S01E0${id}`,
});


describe("normalizeCharacter", () => {
  it("converts string id to number", () => {
    expect(normalizeCharacter(RAW).id).toBe(1);
  });

  it("maps episode objects to their string ids", () => {
    expect(normalizeCharacter(RAW).episode).toEqual(["1", "2", "3"]);
  });

  it("preserves name, image, status and species", () => {
    const result = normalizeCharacter(RAW);
    expect(result.name).toBe("Rick Sanchez");
    expect(result.image).toBe("https://example.com/rick.jpeg");
    expect(result.status).toBe("Alive");
    expect(result.species).toBe("Human");
  });

  it("returns an empty episode array when the character has no episodes", () => {
    expect(normalizeCharacter({ ...RAW, episode: [] }).episode).toEqual([]);
  });

  it("handles large numeric string ids without precision loss", () => {
    expect(normalizeCharacter({ ...RAW, id: "826" }).id).toBe(826);
  });
});


describe("graphqlFetch", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("calls fetch with POST method and JSON content-type header", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: { characters: { info: {}, results: [] } } }),
    });

    await graphqlFetch({ page: 1 });

    expect(global.fetch).toHaveBeenCalledWith(
      GRAPHQL_URL,
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: GET_CHARACTERS_QUERY, variables: { page: 1 } }),
      })
    );
  });

  it("returns the data field from the JSON response", async () => {
    const mockData = {
      characters: {
        info: { count: 826, pages: 42, next: 2, prev: null },
        results: [],
      },
    };
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: mockData }),
    });

    const result = await graphqlFetch({ page: 1 });
    expect(result).toEqual(mockData);
  });

  it("throws when res.ok is false", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({ ok: false, status: 500 });
    await expect(graphqlFetch({ page: 1 })).rejects.toThrow(
      "GraphQL request failed: 500"
    );
  });

  it("throws the first GraphQL error message when errors are present", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        data: null,
        errors: [{ message: "Field not found" }, { message: "Other error" }],
      }),
    });
    await expect(graphqlFetch({ page: 1 })).rejects.toThrow("Field not found");
  });

  it("merges extra RequestInit options into the fetch call (e.g. next revalidate)", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: { characters: { info: {}, results: [] } } }),
    });

    await graphqlFetch({ page: 1 }, { next: { revalidate: 3600 } } as RequestInit);

    expect(global.fetch).toHaveBeenCalledWith(
      GRAPHQL_URL,
      expect.objectContaining({ next: { revalidate: 3600 } })
    );
  });
});


describe("buildEpisodeSets", () => {
  it("puts non-overlapping episodes into char1Only and char2Only respectively", () => {
    const char1 = [ep(1), ep(2)];
    const char2 = [ep(3), ep(4)];
    const result = buildEpisodeSets(char1, char2);
    expect(result.char1Only).toEqual(char1);
    expect(result.char2Only).toEqual(char2);
    expect(result.shared).toHaveLength(0);
  });

  it("puts all episodes into shared when both arrays are identical", () => {
    const episodes = [ep(1), ep(2), ep(3)];
    const result = buildEpisodeSets(episodes, episodes);
    expect(result.shared).toEqual(episodes);
    expect(result.char1Only).toHaveLength(0);
    expect(result.char2Only).toHaveLength(0);
  });

  it("correctly splits a partial overlap", () => {
    const char1 = [ep(1), ep(2), ep(3)];
    const char2 = [ep(2), ep(3), ep(4)];
    const result = buildEpisodeSets(char1, char2);
    expect(result.char1Only).toEqual([ep(1)]);
    expect(result.shared).toEqual([ep(2), ep(3)]);
    expect(result.char2Only).toEqual([ep(4)]);
  });

  it("returns all empty sets when both arrays are empty", () => {
    const result = buildEpisodeSets([], []);
    expect(result.char1Only).toHaveLength(0);
    expect(result.shared).toHaveLength(0);
    expect(result.char2Only).toHaveLength(0);
  });

  it("handles char1 empty and char2 non-empty", () => {
    const result = buildEpisodeSets([], [ep(1), ep(2)]);
    expect(result.char1Only).toHaveLength(0);
    expect(result.shared).toHaveLength(0);
    expect(result.char2Only).toEqual([ep(1), ep(2)]);
  });

  it("handles char1 non-empty and char2 empty", () => {
    const result = buildEpisodeSets([ep(5), ep(6)], []);
    expect(result.char1Only).toEqual([ep(5), ep(6)]);
    expect(result.shared).toHaveLength(0);
    expect(result.char2Only).toHaveLength(0);
  });
});
