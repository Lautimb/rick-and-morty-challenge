import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeToggleUI } from "@/components/ui/ThemeToggle/ThemeToggle";
import type { ThemeToggleUIProps } from "@/components/ui/ThemeToggle/types";

function renderToggle(overrides: Partial<ThemeToggleUIProps> = {}) {
  const props: ThemeToggleUIProps = {
    current: "light",
    isDark: false,
    isOpen: false,
    containerRef: React.createRef<HTMLDivElement>(),
    onToggle: jest.fn(),
    onSelect: jest.fn(),
    ...overrides,
  };
  render(<ThemeToggleUI {...props} />);
  return props;
}

describe("ThemeToggleUI", () => {
  it("renders the toggle button with the correct aria-label", () => {
    renderToggle();
    expect(screen.getByRole("button", { name: "Cambiar tema" })).toBeInTheDocument();
  });

  it("renders without crashing when isDark=true (Moon icon)", () => {
    renderToggle({ isDark: true });
    expect(screen.getByRole("button", { name: "Cambiar tema" })).toBeInTheDocument();
  });

  it("does NOT render theme options when isOpen=false", () => {
    renderToggle({ isOpen: false });
    expect(screen.queryByRole("button", { name: "Claro" })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Oscuro" })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Sistema" })).not.toBeInTheDocument();
  });

  it("renders all 3 theme options when isOpen=true", () => {
    renderToggle({ isOpen: true });
    expect(screen.getByRole("button", { name: "Claro" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Oscuro" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Sistema" })).toBeInTheDocument();
  });

  it("shows the check icon only on the active theme option", () => {
    renderToggle({ isOpen: true, current: "dark" });
    const activeBtn = screen.getByRole("button", { name: "Oscuro" });
    const inactiveBtn = screen.getByRole("button", { name: "Claro" });
    expect(activeBtn.querySelectorAll("svg").length).toBeGreaterThan(
      inactiveBtn.querySelectorAll("svg").length
    );
  });

  it("calls onToggle when the main button is clicked", () => {
    const { onToggle } = renderToggle();
    fireEvent.click(screen.getByRole("button", { name: "Cambiar tema" }));
    expect(onToggle).toHaveBeenCalledTimes(1);
  });

  it("calls onSelect with 'light' when Claro is clicked", () => {
    const { onSelect } = renderToggle({ isOpen: true });
    fireEvent.click(screen.getByRole("button", { name: "Claro" }));
    expect(onSelect).toHaveBeenCalledWith("light");
  });

  it("calls onSelect with 'dark' when Oscuro is clicked", () => {
    const { onSelect } = renderToggle({ isOpen: true });
    fireEvent.click(screen.getByRole("button", { name: "Oscuro" }));
    expect(onSelect).toHaveBeenCalledWith("dark");
  });

  it("calls onSelect with 'system' when Sistema is clicked", () => {
    const { onSelect } = renderToggle({ isOpen: true });
    fireEvent.click(screen.getByRole("button", { name: "Sistema" }));
    expect(onSelect).toHaveBeenCalledWith("system");
  });

  it("matches snapshot when dropdown is open with active theme 'dark'", () => {
    const { container } = render(
      <ThemeToggleUI
        current="dark"
        isDark
        isOpen
        containerRef={React.createRef<HTMLDivElement>()}
        onToggle={jest.fn()}
        onSelect={jest.fn()}
      />
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
