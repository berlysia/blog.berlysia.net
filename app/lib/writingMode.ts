import { useEffect, useState } from "hono/jsx";
import { atom } from "nanostores";

export type WritingMode = "vertical" | "horizontal";
export const $writingMode = atom<WritingMode>("horizontal");

export function useWritingMode(
  defaultValue: "vertical" | "horizontal" = "horizontal"
) {
  const [writingMode, setWritingMode] = useState(defaultValue);

  useEffect(() => {
    $writingMode.set(defaultValue);
    return $writingMode.subscribe(setWritingMode);
  }, []);

  return {
    writingMode,
    isVertical: writingMode === "vertical",
    isHorizontal: writingMode === "horizontal",
  };
}
