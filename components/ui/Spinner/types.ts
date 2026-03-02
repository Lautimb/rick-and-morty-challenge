export type SpinnerSize = "sm" | "md" | "lg";

export type SpinnerProps = React.HTMLAttributes<HTMLDivElement> & {
  size?: SpinnerSize;
};
