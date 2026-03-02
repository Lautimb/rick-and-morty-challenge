import nextJest from "next/jest.js";

const createJestConfig = nextJest({ dir: "./" });

/** @type {import('jest').Config} */
const config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^next/image$": "<rootDir>/__mocks__/nextImage.tsx",
  },
  testMatch: ["<rootDir>/__tests__/**/*.test.{ts,tsx}"],
  collectCoverageFrom: [
    "components/**/*.{ts,tsx}",
    "libs/**/*.{ts,tsx}",
    "hooks/**/*.{ts,tsx}",
    "store/**/*.{ts,tsx}",
    "app/**/*.{ts,tsx}",
    "!**/*.d.ts",
    "!**/types.ts",
    "!**/index.ts",
    "!app/layout.tsx",
    "!app/opengraph-image.tsx",
    "!app/loading.tsx",
    "!app/not-found.tsx",
    "!app/error.tsx",
  ],
};

export default createJestConfig(config);
