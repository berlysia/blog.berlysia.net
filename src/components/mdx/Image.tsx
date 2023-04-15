import { extname } from "node:path";
import React from "react";
import NextImage from "next/image";

type Props = {
  src: string;
  alt: string;
  className?: string;
  loading?: HTMLImageElement["loading"];
} & (
  | {
      width: number;
      height: number;
    }
  | {
      width: undefined;
      height: undefined;
    }
);

const placeholder =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQYV2NgAAIAAAUAAarVyFEAAAAASUVORK5CYII=";

const Image: React.FC<Props> = ({
  src,
  alt,
  className,
  loading = "lazy",
  width,
  height,
}) => {
  return width && height && extname(src) !== ".svg" ? (
    <NextImage
      src={src}
      alt={alt}
      className={className}
      width={width}
      height={height}
      loading={loading}
    />
  ) : (
    <img
      className={`tw-object-contain ${className}`}
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
