import { getCharactersPage, fetchCharactersPage } from "@/libs/api/characters";


const RAW_CHARACTER = {
  id: "1",
  name: "Rick Sanchez",
  image: "https://example.com/rick.jpeg",
  status: "Alive",
  species: "Human",
  episode: [{ id: "10" }, { id: "11" }],
};

const GRAPHQL_RESPONSE = {
  characters: {
    info: { count: 826, pages: 42, next: 2, prev: null },
    results: [RAW_CHARACTER],
  },
};

function mockFetchSuccess() {
  (global.fetch as jest.Mock).mockResolvedValueOnce({
    ok: true,
    json: async () => ({ data: GRAPHQL_RESPONSE }),
  });
}


describe("getCharactersPage", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("returns a CharactersPage with the correct info block", async () => {
    mockFetchSuccess();
    const page = await getCharactersPage(1);
    expect(page.info).toEqual(GRAPHQL_RESPONSE.characters.info);
  });

  it("normalizes character ids from string to number", async () => {
    mockFetchSuccess();
    const page = await getCharactersPage(1);
    expect(page.results[0].id).toBe(1);
  });

  it("normalizes episode objects to string id arrays", async () => {
    mockFetchSuccess();
    const page = await getCharactersPage(1);
    expect(page.results[0].episode).toEqual(["10", "11"]);
  });

  it("throws when the network request fails", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({ ok: false, status: 503 });
    await expect(getCharactersPage(1)).rejects.toThrow("GraphQL request failed: 503");
  });

  it("throws when the response contains GraphQL errors", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: null, errors: [{ message: "Rate limited" }] }),
    });
    await expect(getCharactersPage(1)).rejects.toThrow("Rate limited");
  });
});

describe("fetchCharactersPage", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("returns a normalized CharactersPage (page 50)", async () => {
    mockFetchSuccess();
    const page = await fetchCharactersPage(50);
    expect(page.info.pages).toBe(42);
    expect(page.results[0].id).toBe(1);
  });

  it("deduplicates concurrent requests — fetch is called only once for the same page (page 51)", async () => {
    mockFetchSuccess();
    const [a, b] = await Promise.all([fetchCharactersPage(51), fetchCharactersPage(51)]);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(a).toBe(b);
  });

  it("removes the cache entry on error so the next call retries (page 52)", async () => {
    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({ ok: false, status: 500 })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ data: GRAPHQL_RESPONSE }),
      });

    await expect(fetchCharactersPage(52)).rejects.toThrow("GraphQL request failed: 500");
    const page = await fetchCharactersPage(52);
    expect(global.fetch).toHaveBeenCalledTimes(2);
    expect(page.results[0].id).toBe(1);
  });
});
