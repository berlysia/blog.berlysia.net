import { extname } from "node:path";
import type { ComponentProps } from "react";
import React from "react";
import NextImage from "next/image";
import clsx from "clsx";

type Props = ComponentProps<"img">;

const placeholder =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQYV2NgAAIAAAUAAarVyFEAAAAASUVORK5CYII=";

const Image = ({
  src,
  alt,
  className,
  loading = "lazy",
  width,
  height,
}: Props) => {
  return typeof width === "number" &&
    Number.isFinite(width) &&
    typeof height === "number" &&
    Number.isFinite(height) &&
    src &&
    extname(src) !== ".svg" ? (
    <NextImage
      src={src}
      alt={alt ?? ""}
      className={className}
      width={width}
      height={height}
      loading={loading}
    />
  ) : (
    // eslint-disable-next-line @next/next/no-img-element -- fallback
    <img
      className={clsx("tw-object-contain", className)}
      src={src}
      alt={alt}
      width={width}
      height={height}
      decoding="async"
      loading={loading}
      // onError={(e) => {
      //   const target = e.target as HTMLImageElement;
      //   target.onerror = null;
      //   target.src = placeholder;
      // }}
    />
  );
};

export default Image;
