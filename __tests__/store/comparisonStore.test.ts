import { useComparisonStore } from "@/store/comparisonStore";
import type { Character } from "@/libs/types";

// ── Fixtures ──────────────────────────────────────────────────────────────────

const RICK: Character = {
  id: 1,
  name: "Rick Sanchez",
  image: "https://example.com/rick.jpg",
  status: "Alive",
  species: "Human",
  episode: ["1", "2"],
};

const MORTY: Character = {
  id: 2,
  name: "Morty Smith",
  image: "https://example.com/morty.jpg",
  status: "Alive",
  species: "Human",
  episode: ["1", "3"],
};

// Reset the Zustand singleton between tests
beforeEach(() => {
  useComparisonStore.setState({ char1: null, char2: null });
});

const store = () => useComparisonStore.getState();

// ── Initial state ─────────────────────────────────────────────────────────────

describe("comparisonStore — initial state", () => {
  it("char1 starts as null", () => {
    expect(store().char1).toBeNull();
  });

  it("char2 starts as null", () => {
    expect(store().char2).toBeNull();
  });
});

// ── selectCharacter ───────────────────────────────────────────────────────────

describe("selectCharacter", () => {
  it("sets char1 when panelId is 'char1'", () => {
    store().selectCharacter("char1", RICK);
    expect(store().char1).toEqual(RICK);
  });

  it("sets char2 when panelId is 'char2'", () => {
    store().selectCharacter("char2", MORTY);
    expect(store().char2).toEqual(MORTY);
  });

  it("setting char1 does not affect char2", () => {
    store().selectCharacter("char1", RICK);
    expect(store().char2).toBeNull();
  });

  it("setting char2 does not affect char1", () => {
    store().selectCharacter("char2", MORTY);
    expect(store().char1).toBeNull();
  });

  it("overwrites char1 when called again on the same panel", () => {
    store().selectCharacter("char1", RICK);
    store().selectCharacter("char1", MORTY);
    expect(store().char1).toEqual(MORTY);
  });

  it("both panels can hold different characters independently", () => {
    store().selectCharacter("char1", RICK);
    store().selectCharacter("char2", MORTY);
    expect(store().char1).toEqual(RICK);
    expect(store().char2).toEqual(MORTY);
  });
});

// ── clearCharacter ────────────────────────────────────────────────────────────

describe("clearCharacter", () => {
  it("sets char1 back to null", () => {
    store().selectCharacter("char1", RICK);
    store().clearCharacter("char1");
    expect(store().char1).toBeNull();
  });

  it("sets char2 back to null", () => {
    store().selectCharacter("char2", MORTY);
    store().clearCharacter("char2");
    expect(store().char2).toBeNull();
  });

  it("clearing char1 does not affect char2", () => {
    store().selectCharacter("char1", RICK);
    store().selectCharacter("char2", MORTY);
    store().clearCharacter("char1");
    expect(store().char2).toEqual(MORTY);
  });

  it("clearing an already-null panel is a no-op", () => {
    store().clearCharacter("char1");
    expect(store().char1).toBeNull();
  });
});
