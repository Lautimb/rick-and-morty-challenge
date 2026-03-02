import { useLocalPagination } from "@/hooks/useLocalPagination";
import { Pagination } from "@/components/ui/Pagination";
import { EpisodeList as EpisodeListUI } from "@/components/ui/EpisodeList";
import type { Episode } from "@/libs/types";

type EpisodeListProps = {
  episodes: Episode[];
  emptyMessage?: string;
  resetKey?: unknown;
};

export function EpisodeList({ episodes, emptyMessage = "No hay episodios", resetKey }: EpisodeListProps) {
  const pagination = useLocalPagination(episodes, resetKey);

  if (episodes.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400 text-sm text-center">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      <EpisodeListUI episodes={pagination.currentItems} />
      {pagination.totalPages > 1 && (
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          isLoading={pagination.isLoading}
          hasPrev={pagination.hasPrev}
          hasNext={pagination.hasNext}
          onPrev={pagination.goPrev}
          onNext={pagination.goNext}
          onGoTo={pagination.goTo}
          siblingCount={0}
        />
      )}
    </div>
  );
}
