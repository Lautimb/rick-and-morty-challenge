import { cva } from "class-variance-authority";
import type { CardOverlayProps } from "./types";

const cardOverlayVariants = cva(
  "absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/85 via-black/50 to-transparent px-3 pb-3 pt-10"
);

export function CardOverlay({ children, className, ...rest }: CardOverlayProps) {
  return (
    <div className={cardOverlayVariants({ className })} {...rest}>
      {children}
    </div>
  );
}

CardOverlay.displayName = "CardOverlay";
