import { cva, cx } from "class-variance-authority";
import type { CardBadgeProps } from "./types";

const statusDotVariants = cva("h-2 w-2 shrink-0 rounded-full", {
  variants: {
    status: {
      Alive: "bg-green-400",
      Dead: "bg-red-500",
      unknown: "bg-gray-400",
    },
  },
});

function StatusDot({ status }: { status: NonNullable<CardBadgeProps["status"]> }) {
  return <span className={statusDotVariants({ status })} />;
}

export function CardBadge({ status, icon, className, children, ...rest }: CardBadgeProps) {
  return (
    <span
      className={cx(
        "inline-flex items-center gap-1.5 rounded-full bg-black/50 px-2 py-0.5 text-xs font-medium backdrop-blur-sm",
        className,
      )}
      {...rest}
    >
      {icon ?? (status && <StatusDot status={status} />)}
      {children ?? status}
    </span>
  );
}

CardBadge.displayName = "CardBadge";
