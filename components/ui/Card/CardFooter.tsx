import { cva } from "class-variance-authority";
import type { CardFooterProps } from "./types";

const cardFooterVariants = cva("px-4 pb-4 pt-2 border-t border-gray-100");

export function CardFooter({ children, className, ...rest }: CardFooterProps) {
  return (
    <div className={cardFooterVariants({ className })} {...rest}>
      {children}
    </div>
  );
}

CardFooter.displayName = "CardFooter";
