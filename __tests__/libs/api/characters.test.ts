import { getCharactersPage, fetchCharactersPage } from "@/libs/api/characters";

const RAW_CHARACTER = {
  id: 1,
  name: "Rick Sanchez",
  image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
  status: "Alive",
  species: "Human",
  episode: [
    "https://rickandmortyapi.com/api/episode/10",
    "https://rickandmortyapi.com/api/episode/11",
  ],
};

const REST_RESPONSE = {
  info: { count: 826, pages: 42, next: "https://rickandmortyapi.com/api/character?page=2", prev: null },
  results: [RAW_CHARACTER],
};

function mockFetchSuccess() {
  (global.fetch as jest.Mock).mockResolvedValueOnce({
    ok: true,
    json: async () => REST_RESPONSE,
  });
}

describe("getCharactersPage", () => {
  beforeEach(() => { global.fetch = jest.fn(); });
  afterEach(() => { jest.restoreAllMocks(); });

  it("calls the correct REST endpoint", async () => {
    mockFetchSuccess();
    await getCharactersPage(1);
    expect(global.fetch).toHaveBeenCalledWith(
      "https://rickandmortyapi.com/api/character?page=1",
      expect.any(Object)
    );
  });

  it("returns the info block from the response", async () => {
    mockFetchSuccess();
    const page = await getCharactersPage(1);
    expect(page.info.count).toBe(826);
    expect(page.info.pages).toBe(42);
  });

  it("returns episode URLs as-is from the API", async () => {
    mockFetchSuccess();
    const page = await getCharactersPage(1);
    expect(page.results[0].episode).toEqual([
      "https://rickandmortyapi.com/api/episode/10",
      "https://rickandmortyapi.com/api/episode/11",
    ]);
  });

  it("throws when the network request fails", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({ ok: false, status: 503 });
    await expect(getCharactersPage(1)).rejects.toThrow("Failed to fetch characters: 503");
  });
});

describe("fetchCharactersPage", () => {
  beforeEach(() => { global.fetch = jest.fn(); });
  afterEach(() => { jest.restoreAllMocks(); });

  it("calls the internal API route", async () => {
    mockFetchSuccess();
    await fetchCharactersPage(1);
    expect(global.fetch).toHaveBeenCalledWith("/api/characters?page=1");
  });

  it("returns a CharactersPage", async () => {
    mockFetchSuccess();
    const page = await fetchCharactersPage(1);
    expect(page.info.pages).toBe(42);
    expect(page.results[0].id).toBe(1);
  });

  it("throws when the network request fails", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({ ok: false, status: 500 });
    await expect(fetchCharactersPage(1)).rejects.toThrow("Failed to fetch characters: 500");
  });
});
