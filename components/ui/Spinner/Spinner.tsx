import type { SpinnerProps } from "./types";
import { ringVariants } from "./styles";
import { cx } from "class-variance-authority";

export function Spinner({ size, className, ...rest }: SpinnerProps) {
  return (
    <div className={cx("flex items-center justify-center py-2", className)} {...rest}>
      <div className={ringVariants({ size })} aria-label="Cargando" role="status" />
    </div>
  );
}
