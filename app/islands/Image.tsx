import { useViewerModeValue } from "#lib/viewerMode";
import clsx from "clsx";
import { useRef, useSyncExternalStore } from "hono/jsx";

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

// TODO: useViewerModeValueに埋め込む
function useMediaQuery(query: string, defaultValue = false) {
  const mediaQuery =
    typeof window === "undefined" ? null : window.matchMedia(query);

  return useSyncExternalStore(
    (notify) => {
      const cb = () => notify;
      mediaQuery?.addEventListener("change", cb);
      return () => {
        mediaQuery?.removeEventListener("change", cb);
      };
    },
    () => mediaQuery?.matches,
    () => defaultValue
  );
}

const Image = ({
  src,
  alt,
  className,
  loading = "lazy",
  width,
  height,
}: Props) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const mode = useViewerModeValue();
  const isNarrowViewport = useMediaQuery("(width < 640px), (height < 600px)");
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
  const wrapper =
    mode.isVertical && isNarrowViewport
      ? (inner) => (
          <a href={src} target="_blank" rel="noreferrer">
            {inner}
          </a>
        )
      : (inner) => (
          <button type="button" onClick={openDialog}>
            {inner}
          </button>
        );
  return (
    <>
      {wrapper(
        <img
          className={clsx("image", "tw-object-contain", className)}
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
      )}
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions -- dialog backdrop hack */}
      <dialog ref={dialogRef} title="image viewer" onClick={closeDialog}>
        <button type="button" className="tw-block" onClick={closeDialog}>
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
      </dialog>
    </>
  );
};

export default Image;
