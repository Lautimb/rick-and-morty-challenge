import { PanelSkeleton } from "./PanelSkeleton";

export function PanelsSectionSkeleton() {
  return (
    <div className="flex flex-col gap-10 md:flex-row">
      <PanelSkeleton />
      <PanelSkeleton />
    </div>
  );
}