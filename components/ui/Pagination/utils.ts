import { PageItem } from "./types";

export function getPageRange(current: number, total: number): PageItem[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const pages = new Set<number>([1, total]);
  for (let i = Math.max(1, current - 1); i <= Math.min(total, current + 1); i++) {
    pages.add(i);
  }

  const sorted = Array.from(pages).sort((a, b) => a - b);
  const result: PageItem[] = [];

  for (let i = 0; i < sorted.length; i++) {
    if (i > 0) {
      const gap = sorted[i] - sorted[i - 1];
      if (gap === 2) {
        result.push(sorted[i] - 1);
      } else if (gap > 2) {
        result.push("...");
      }
    }
    result.push(sorted[i]);
  }

  return result;
}