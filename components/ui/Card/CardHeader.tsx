import { cva } from "class-variance-authority";
import type { CardHeaderProps } from "./types";

const cardHeaderVariants = cva("px-4 pt-4");

export function CardHeader({ children, className, ...rest }: CardHeaderProps) {
  return (
    <div className={cardHeaderVariants({ className })} {...rest}>
      {children}
    </div>
  );
}

CardHeader.displayName = "CardHeader";
