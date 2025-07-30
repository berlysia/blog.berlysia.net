import { useSyncExternalStore } from "hono/jsx";

// TODO: useViewerModeValueに埋め込む
export function useMediaQuery(query: string, defaultValue = false) {
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
