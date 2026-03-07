import { fetchEpisodes } from "@/libs/api/episodes";

const EPISODE = {
  id: 1,
  name: "Pilot",
  air_date: "December 2, 2013",
  episode: "S01E01",
};

describe("fetchEpisodes", () => {
  beforeEach(() => { global.fetch = jest.fn(); });
  afterEach(() => { jest.restoreAllMocks(); });

  it("returns [] immediately when ids is empty — no fetch is made", async () => {
    const result = await fetchEpisodes([]);
    expect(result).toEqual([]);
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it("calls the internal API route with joined ids", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => [EPISODE],
    });
    await fetchEpisodes(["1", "2", "3"]);
    expect(global.fetch).toHaveBeenCalledWith(
      "/api/episodes?ids=1,2,3",
      expect.any(Object)
    );
  });

  it("returns array response directly", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => [EPISODE, { ...EPISODE, id: 2, name: "Lawnmower Dog" }],
    });
    const result = await fetchEpisodes(["1", "2"]);
    expect(result).toHaveLength(2);
    expect(result[0].name).toBe("Pilot");
    expect(result[1].name).toBe("Lawnmower Dog");
  });

  it("wraps a single-object response in an array", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => EPISODE,
    });
    const result = await fetchEpisodes(["1"]);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(1);
  });

  it("throws when res.ok is false", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({ ok: false, status: 503 });
    await expect(fetchEpisodes(["1"])).rejects.toThrow("Failed to fetch episodes: 503");
  });
});
