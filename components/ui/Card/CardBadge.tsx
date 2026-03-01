import { cva, cx } from "class-variance-authority";
import type { CardBadgeProps } from "./types";


const statusDotClass = cva("h-2 w-2 shrink-0 rounded-full", {
  variants: {
    status: {
      Alive: "bg-green-400",
      Dead: "bg-red-500",
      unknown: "bg-gray-400",
    },
  },
});
export function CardBadge({ status, species, className, ...rest }: CardBadgeProps) {
  return (
    <span className={cx("inline-flex items-center gap-1.5 rounded-full bg-black/50 px-2 py-0.5 text-xs font-medium text-white backdrop-blur-sm", className)} {...rest}>
      <span className={statusDotClass({ status })} />
      {status} - {species}
    </span>
  );
}

CardBadge.displayName = "CardBadge";
