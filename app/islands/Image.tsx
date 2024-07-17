import clsx from "clsx";
import { useRef } from "hono/jsx";

type Props = {
  readonly src: string;
  readonly alt: string;
  readonly className?: string;
  readonly loading?: "eager" | "lazy";
  readonly width?: number;
  readonly height?: number;
};

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
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openDialog = () => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  };
  const closeDialog = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  };
  return (
    <>
      <button type="button" onClick={openDialog}>
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
      </button>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions -- dialog要素のバックドロップに反応したい場合のよりよい方法があれば */}
      <dialog
        ref={dialogRef}
        title="image viewer"
        onClick={closeDialog}
        className="tw-overflow-visible"
      >
        <button type="button" onClick={closeDialog}>
          <img
            title="click to close dialog"
            className=""
            src={src}
            alt={alt}
            width={width}
            height={height}
            decoding="async"
            loading={loading}
          />
        </button>
        <button
          type="button"
          className="tw-block tw-absolute tw-left-[-32px] tw-top-[-32px]"
          onClick={closeDialog}
        >
          <img
            src="/static/icons/xmark.svg"
            alt="close"
            className="tw-h-8 tw-w-8"
          />
        </button>
      </dialog>
    </>
  );
};

export default Image;
