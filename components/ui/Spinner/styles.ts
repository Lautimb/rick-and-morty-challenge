import { cva } from "class-variance-authority";

export const ringVariants = cva(
  "rounded-full border-2 border-gray-200 dark:border-white/10 border-t-purple-500 dark:border-t-purple-400 animate-spin",
  {
    variants: {
      size: {
        sm: "w-4 h-4",
        md: "w-6 h-6",
        lg: "w-8 h-8",
      },
    },
    defaultVariants: { size: "md" },
  }
);
