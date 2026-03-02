"use client";

import { useState } from "react";
import { cva, cx } from "class-variance-authority";
import Image from "next/image";
import type { CardMediaProps } from "./types";

const cardMediaVariants = cva("relative w-full aspect-square");

export function CardMedia({ src, alt, className, ...rest }: CardMediaProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={cx(
      cardMediaVariants({ className }),
      !isLoaded && "bg-gray-200 dark:bg-gray-700 animate-pulse"
    )}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        onLoad={() => setIsLoaded(true)}
        {...rest}
      />
    </div>
  );
}

CardMedia.displayName = "CardMedia";
