import { fetchEpisodes, clearEpisodeCache } from "@/libs/api/episodes";
import { GRAPHQL_URL, GET_EPISODES_QUERY } from "@/libs/api/queries";

const RAW_EPISODE = {
  id: "1",
  name: "Pilot",
  air_date: "December 2, 2013",
  episode: "S01E01",
};

describe("fetchEpisodes", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
    clearEpisodeCache();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  // ── Edge cases ─────────────────────────────────────────────────────────────

  it("returns [] immediately when episodeIds is empty — no fetch is made", async () => {
    const result = await fetchEpisodes([]);
    expect(result).toEqual([]);
    expect(global.fetch).not.toHaveBeenCalled();
  });

  // ── Happy path ─────────────────────────────────────────────────────────────

  it("normalizes episode id from string to number", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: { episodesByIds: [RAW_EPISODE] } }),
    });
    const result = await fetchEpisodes(["1"]);
    expect(result[0].id).toBe(1);
  });

  it("preserves name, air_date and episode code after normalization", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: { episodesByIds: [RAW_EPISODE] } }),
    });
    const [ep] = await fetchEpisodes(["1"]);
    expect(ep.name).toBe("Pilot");
    expect(ep.air_date).toBe("December 2, 2013");
    expect(ep.episode).toBe("S01E01");
  });

  it("sends the correct GraphQL body with all requested ids", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: { episodesByIds: [] } }),
    });
    await fetchEpisodes(["1", "2", "3"]);
    expect(global.fetch).toHaveBeenCalledWith(
      GRAPHQL_URL,
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: GET_EPISODES_QUERY,
          variables: { ids: ["1", "2", "3"] },
        }),
      })
    );
  });

  it("handles a batch of multiple episodes and normalizes all of them", async () => {
    const raws = [
      RAW_EPISODE,
      { id: "2", name: "Lawnmower Dog", air_date: "December 9, 2013", episode: "S01E02" },
    ];
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: { episodesByIds: raws } }),
    });
    const result = await fetchEpisodes(["1", "2"]);
    expect(result).toHaveLength(2);
    expect(result[1].id).toBe(2);
    expect(result[1].name).toBe("Lawnmower Dog");
  });

  // ── Error cases ────────────────────────────────────────────────────────────

  it("throws when res.ok is false", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({ ok: false, status: 503 });
    await expect(fetchEpisodes(["1"])).rejects.toThrow("GraphQL request failed: 503");
  });

  it("throws the first GraphQL error message when errors are present", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: null, errors: [{ message: "Episode not found" }] }),
    });
    await expect(fetchEpisodes(["999"])).rejects.toThrow("Episode not found");
  });
});
