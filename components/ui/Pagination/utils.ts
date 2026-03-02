import { PageItem } from "./types";

export function getPageRange(current: number, total: number, siblingCount = 1): PageItem[] {
  const visibleMax = 5 + 2 * siblingCount;
  if (total <= visibleMax) return Array.from({ length: total }, (_, i) => i + 1);

  const leftEllipsis = current > siblingCount + 3;
  const rightEllipsis = current < total - siblingCount - 2;

  if (!leftEllipsis) {
    const left = Array.from({ length: siblingCount * 2 + 3 }, (_, i) => i + 1);
    return [...left, "...", total];
  }
  if (!rightEllipsis) {
    const right = Array.from({ length: siblingCount * 2 + 3 }, (_, i) => total - (siblingCount * 2 + 2) + i);
    return [1, "...", ...right];
  }
  const siblings = Array.from({ length: siblingCount * 2 + 1 }, (_, i) => current - siblingCount + i);
  return [1, "...", ...siblings, "...", total];
}