import { cva } from "class-variance-authority";
import type { CardDescripcionProps } from "./types";

const cardDescripcionVariants = cva("text-sm text-gray-500");

export function CardDescripcion({ children, className, ...rest }: CardDescripcionProps) {
  return (
    <div className={cardDescripcionVariants({ className })} {...rest}>
      {children}
    </div>
  );
}

CardDescripcion.displayName = "CardDescripcion";
