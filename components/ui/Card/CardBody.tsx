import { cva } from "class-variance-authority";
import type { CardBodyProps } from "./types";

const cardBodyVariants = cva("px-4 py-2 flex flex-col gap-1");

export function CardBody({ children, className, ...rest }: CardBodyProps) {
  return (
    <div className={cardBodyVariants({ className })} {...rest}>
      {children}
    </div>
  );
}

CardBody.displayName = "CardBody";
