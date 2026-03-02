"use client";
import dynamic from "next/dynamic";

export const ThemeSelectorLoader = dynamic(
  () =>
    import("@/components/features/ThemeSelector/ThemeSelector").then(
      (m) => ({ default: m.ThemeSelector })
    ),
  { ssr: false }
);
