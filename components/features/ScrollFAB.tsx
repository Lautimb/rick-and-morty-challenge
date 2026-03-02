"use client";

import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cx } from "class-variance-authority";
import { useComparisonStore } from "@/store/comparisonStore";

export function ScrollFAB() {
  const bothSelected = useComparisonStore((state) => !!state.char1 && !!state.char2);
  const [atEpisodes, setAtEpisodes] = useState(false);

  useEffect(() => {
    const section = document.getElementById("episode-comparison");
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => setAtEpisodes(entry.isIntersecting),
      { threshold: 0.15 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  function handleClick() {
    if (atEpisodes) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      document.getElementById("episode-comparison")?.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <button
      onClick={handleClick}
      aria-label={atEpisodes ? "Volver arriba" : "Ver episodios"}
      className={cx(
        "fixed bottom-6 right-6 z-50 lg:hidden flex items-center gap-2 rounded-full bg-purple-600 hover:bg-purple-500 active:scale-95 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-900/50 transition-all duration-300",
        bothSelected
          ? "translate-y-0 opacity-100"
          : "translate-y-20 opacity-0 pointer-events-none",
      )}
    >
      {atEpisodes ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
    </button>
  );
}
