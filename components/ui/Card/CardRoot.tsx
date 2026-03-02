import { cva } from "class-variance-authority";
import type { CardRootProps } from "./types";
import { CardBadge } from "./CardBadge";
import { CardBody } from "./CardBody";
import { CardDescripcion } from "./CardDescripcion";
import { CardFooter } from "./CardFooter";
import { CardHeader } from "./CardHeader";
import { CardMedia } from "./CardMedia";
import { CardOverlay } from "./CardOverlay";

const cardRootVariants = cva(
  "relative overflow-hidden rounded-xl border-2 border-purple-500 bg-gray-100 dark:bg-gray-900"
);

export function CardRoot({ children, className, ...rest }: CardRootProps) {
  return (
    <article className={cardRootVariants({ className })} {...rest}>
      {children}
    </article>
  );
}

CardRoot.displayName = "Card";

CardRoot.Media = CardMedia;
CardRoot.Overlay = CardOverlay;
CardRoot.Badge = CardBadge;
CardRoot.Header = CardHeader;
CardRoot.Body = CardBody;
CardRoot.Descripcion = CardDescripcion;
CardRoot.Footer = CardFooter;
