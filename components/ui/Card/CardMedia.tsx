import { cva } from "class-variance-authority";
import Image from "next/image";
import type { CardMediaProps } from "./types";

const cardMediaVariants = cva("relative w-full aspect-square");

export function CardMedia({ src, alt, className, sizes = "(max-width: 768px) 50vw, 25vw", ...rest }: CardMediaProps) {
  return (
    <div className={cardMediaVariants({ className })}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        unoptimized
        className="object-cover"
        {...rest}
      />
    </div>
  );
}

CardMedia.displayName = "CardMedia";
