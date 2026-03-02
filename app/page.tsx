import { Suspense } from "react";
import { AppIntro } from "@/components/features/AppIntro";
import { PanelsSection } from "@/components/features/PanelsSection";
import { EpisodeComparison } from "@/components/features/EpisodeComparison";
import { ScrollFAB } from "@/components/features/ScrollFAB";
import { PanelsSectionSkeleton } from "@/components/ui/Skeletons/PanelsSection";

export default function Home() {
  return (
    <div className="flex flex-col gap-16">
      <AppIntro />
      <Suspense
        fallback={
          <PanelsSectionSkeleton />
        }
      >
        <PanelsSection />
      </Suspense>
      <EpisodeComparison />
      <ScrollFAB />
    </div>
  );
}
