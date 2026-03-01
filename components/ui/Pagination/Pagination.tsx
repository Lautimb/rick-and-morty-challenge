
import type { PaginationProps } from "./types";
import { pageButtonVariants } from "./styles";
import { getPageRange } from "./utils";

export function Pagination({
  currentPage,
  totalPages,
  isLoading,
  hasPrev,
  hasNext,
  onPrev,
  onNext,
  onGoTo,
}: PaginationProps) {
  const pages = getPageRange(currentPage, totalPages);

  return (
    <nav aria-label="Paginación" className="flex items-center justify-center gap-1 mt-4">
      <button
        onClick={onPrev}
        disabled={!hasPrev || isLoading}
        aria-label="Página anterior"
        className={pageButtonVariants({ disabled: !hasPrev || isLoading })}
      >
        ‹
      </button>

      {pages.map((page, i) =>
        page === "..." ? (
          <span key={`ellipsis-${i}`} className="flex h-8 w-8 items-center justify-center text-sm text-gray-500 select-none">
            …
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onGoTo(page)}
            disabled={isLoading}
            aria-label={`Ir a página ${page}`}
            aria-current={page === currentPage ? "page" : undefined}
            className={pageButtonVariants({
              active: page === currentPage,
              disabled: isLoading,
            })}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={onNext}
        disabled={!hasNext || isLoading}
        aria-label="Página siguiente"
        className={pageButtonVariants({ disabled: !hasNext || isLoading })}
      >
        ›
      </button>
    </nav>
  );
}
