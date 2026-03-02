import { UI_PAGE_SIZE } from "@/libs/constants/pagination";

export function PanelSkeleton() {
  return (
    <section className="flex w-full flex-col gap-4">
      <div className="h-8 w-36 rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
      <div className="grid grid-cols-2 gap-4">
        {Array.from({ length: UI_PAGE_SIZE }).map((_, i) => (
          <div
            key={i}
            className="aspect-square rounded-xl bg-gray-200 dark:bg-gray-700 animate-pulse"
          />
        ))}
      </div>
      <div className="h-10 w-full rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse" />
    </section>
  );
}
