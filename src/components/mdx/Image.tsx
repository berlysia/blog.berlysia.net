import type { ComponentProps } from "react";
import React from "react";
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
  return (
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
