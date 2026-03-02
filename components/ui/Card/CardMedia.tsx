import { cva } from "class-variance-authority";
import Image from "next/image";
import type { CardMediaProps } from "./types";

const cardMediaVariants = cva("relative w-full aspect-square");

export function CardMedia({ src, alt, className, ...rest }: CardMediaProps) {
  return (
    <div className={cardMediaVariants({ className })}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        {...rest}
      />
    </div>
  );
}

CardMedia.displayName = "CardMedia";
