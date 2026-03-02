import { buildEpisodeSets } from "@/libs/api/utils";
import type { Episode } from "@/libs/types";

const ep = (id: number): Episode => ({
  id,
  name: `Episode ${id}`,
  air_date: "December 2, 2013",
  episode: `S01E0${id}`,
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
