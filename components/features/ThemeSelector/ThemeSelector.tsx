"use client";

import { useEffect, useRef, useState } from "react";
import { ThemeToggleUI, type Theme } from "@/components/ui/ThemeToggle";

export function ThemeSelector() {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem("theme") as Theme) || "system"
  );
  const [systemDark, setSystemDark] = useState(
    () => window.matchMedia("(prefers-color-scheme: dark)").matches
  );
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const isDark = theme === "dark" || (theme === "system" && systemDark);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  useEffect(() => {
    if (theme !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => setSystemDark(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [theme]);

  useEffect(() => {
    if (!isOpen) return;
    function handleOutsideClick(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isOpen]);

  function handleSelect(selected: Theme) {
    setTheme(selected);
    localStorage.setItem("theme", selected);
    setIsOpen(false);
  }

  return (
    <ThemeToggleUI
      current={theme}
      isDark={isDark}
      isOpen={isOpen}
      containerRef={containerRef}
      onToggle={() => setIsOpen((prev) => !prev)}
      onSelect={handleSelect}
    />
  );
}
