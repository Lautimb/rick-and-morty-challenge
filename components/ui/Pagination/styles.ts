import { cva } from "class-variance-authority";

export const pageButtonVariants = cva(
  "flex h-8 min-w-8 items-center justify-center rounded px-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500",
  {
    variants: {
      active: {
        true: "bg-purple-600 text-white",
        false: "text-gray-300 hover:bg-gray-700 hover:text-white",
      },
      disabled: {
        true: "cursor-not-allowed opacity-40",
        false: "cursor-pointer",
      },
    },
    defaultVariants: { active: false, disabled: false },
  }
);