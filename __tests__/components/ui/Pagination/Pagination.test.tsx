import { render, screen, fireEvent } from "@testing-library/react";
import { Pagination } from "@/components/ui/Pagination/Pagination";
import type { PaginationProps } from "@/components/ui/Pagination/types";

function renderPagination(overrides: Partial<PaginationProps> = {}) {
  const props: PaginationProps = {
    currentPage: 3,
    totalPages: 5,
    isLoading: false,
    hasPrev: true,
    hasNext: true,
    onPrev: jest.fn(),
    onNext: jest.fn(),
    onGoTo: jest.fn(),
    ...overrides,
  };
  render(<Pagination {...props} />);
  return props;
}

describe("Pagination", () => {
  it("marks the active page button with aria-current='page'", () => {
    renderPagination({ currentPage: 3, totalPages: 5 });
    expect(screen.getByRole("button", { name: "Ir a página 3" })).toHaveAttribute(
      "aria-current",
      "page"
    );
  });

  it("does NOT set aria-current on inactive page buttons", () => {
    renderPagination({ currentPage: 3, totalPages: 5 });
    expect(screen.getByRole("button", { name: "Ir a página 1" })).not.toHaveAttribute(
      "aria-current"
    );
  });

  it("disables the prev button when hasPrev=false", () => {
    renderPagination({ hasPrev: false });
    expect(screen.getByRole("button", { name: "Página anterior" })).toBeDisabled();
  });

  it("disables the next button when hasNext=false", () => {
    renderPagination({ hasNext: false });
    expect(screen.getByRole("button", { name: "Página siguiente" })).toBeDisabled();
  });

  it("disables ALL buttons when isLoading=true", () => {
    renderPagination({ isLoading: true });
    screen.getAllByRole("button").forEach((btn) => expect(btn).toBeDisabled());
  });

  it("calls onPrev when the prev button is clicked and enabled", () => {
    const { onPrev } = renderPagination({ hasPrev: true });
    fireEvent.click(screen.getByRole("button", { name: "Página anterior" }));
    expect(onPrev).toHaveBeenCalledTimes(1);
  });

  it("calls onNext when the next button is clicked and enabled", () => {
    const { onNext } = renderPagination({ hasNext: true });
    fireEvent.click(screen.getByRole("button", { name: "Página siguiente" }));
    expect(onNext).toHaveBeenCalledTimes(1);
  });

  it("calls onGoTo with the correct page number when a page button is clicked", () => {
    const { onGoTo } = renderPagination({ currentPage: 1, totalPages: 5 });
    fireEvent.click(screen.getByRole("button", { name: "Ir a página 4" }));
    expect(onGoTo).toHaveBeenCalledWith(4);
  });

  it("does NOT call onPrev when the button is disabled", () => {
    const { onPrev } = renderPagination({ hasPrev: false });
    fireEvent.click(screen.getByRole("button", { name: "Página anterior" }));
    expect(onPrev).not.toHaveBeenCalled();
  });

  it("renders two ellipsis spans for large page ranges with currentPage in the middle", () => {
    renderPagination({ currentPage: 10, totalPages: 20 });
    expect(screen.getAllByText("…")).toHaveLength(2);
  });

  it("renders no ellipsis when totalPages ≤ 7", () => {
    renderPagination({ currentPage: 3, totalPages: 7 });
    expect(screen.queryByText("…")).not.toBeInTheDocument();
  });

  it("disables both nav buttons when totalPages=1", () => {
    renderPagination({ currentPage: 1, totalPages: 1, hasPrev: false, hasNext: false });
    expect(screen.getByRole("button", { name: "Página anterior" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Página siguiente" })).toBeDisabled();
  });

  it("matches snapshot (5 pages, page 3 active)", () => {
    const { container } = render(
      <Pagination
        currentPage={3}
        totalPages={5}
        isLoading={false}
        hasPrev
        hasNext
        onPrev={jest.fn()}
        onNext={jest.fn()}
        onGoTo={jest.fn()}
      />
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
