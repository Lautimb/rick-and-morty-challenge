export type PaginationProps = {
  currentPage: number;
  totalPages: number;
  isLoading: boolean;
  hasPrev: boolean;
  hasNext: boolean;
  onPrev: () => void;
  onNext: () => void;
  onGoTo: (page: number) => void;
};

export type PageItem = number | "...";