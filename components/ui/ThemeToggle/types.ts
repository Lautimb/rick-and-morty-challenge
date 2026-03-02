import type { RefObject } from "react";

export type Theme = "light" | "dark" | "system";

export type Option = { value: Theme; label: string; icon: React.ReactNode };

export type ThemeToggleUIProps = {
  current: Theme;
  isDark: boolean;
  isOpen: boolean;
  containerRef: RefObject<HTMLDivElement | null>;
  onToggle: () => void;
  onSelect: (theme: Theme) => void;
};
