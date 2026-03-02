import { PanelSkeleton } from "@/components/ui/Skeletons/PanelSkeleton";

function AppIntroSkeleton() {
  return (
    <div className="flex flex-col items-center gap-8 text-center">
      <div className="flex flex-col items-center gap-3">
        <div className="h-10 w-72 rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse md:h-12" />
        <div className="h-5 w-80 rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
      </div>
      <div className="flex flex-col items-center gap-2 sm:flex-row">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex flex-col items-center gap-2 sm:flex-row">
            <div className="h-11 w-56 rounded-xl bg-gray-200 dark:bg-gray-700 animate-pulse" />
            {i < 2 && (
              <div className="h-4 w-4 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function EpisodeComparisonSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <div className="h-8 w-48 rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
      <div className="h-32 rounded-xl bg-gray-200 dark:bg-gray-700 animate-pulse" />
    </div>
  );
}

export function HomeSkeleton() {
  return (
    <div className="flex flex-col gap-16">
      <AppIntroSkeleton />
      <div className="flex flex-col gap-10 md:flex-row">
        <PanelSkeleton />
        <PanelSkeleton />
      </div>
      <EpisodeComparisonSkeleton />
    </div>
  );
}
