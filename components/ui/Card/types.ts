import { ComponentPropsWithoutRef } from "react";
import { ImageProps } from "next/image";
import { CharacterStatus } from "@/libs/types";

export type CardRootProps = ComponentPropsWithoutRef<"div">;
export type CardHeaderProps = ComponentPropsWithoutRef<"div">;
export type CardBodyProps = ComponentPropsWithoutRef<"div">;
export type CardDescripcionProps = ComponentPropsWithoutRef<"div">;
export type CardFooterProps = ComponentPropsWithoutRef<"div">;
export type CardOverlayProps = ComponentPropsWithoutRef<"div">;

export type CardMediaProps = Omit<ImageProps, "fill" | "width" | "height"> & {
  className?: string;
};

export type CardBadgeProps = ComponentPropsWithoutRef<"span"> & {
  status: CharacterStatus;
  species: string;
};
