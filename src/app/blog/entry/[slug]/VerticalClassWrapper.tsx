"use client";

import clsx from "clsx";
import type { ReactNode } from "react";
import { useLayoutEffect } from "react";
import { WritingModeProvider, useWritingMode } from "./useWritingMode";

export default function VerticalClassWrapper({
  children,
  preferVertical,
}: {
  children: ReactNode;
  preferVertical: boolean;
}) {
  return (
    <WritingModeProvider preferVertical={preferVertical}>
      <VerticalClassImpl>{children}</VerticalClassImpl>
    </WritingModeProvider>
  );
}

function VerticalClassImpl({ children }: { children: ReactNode }) {
  const writingMode = useWritingMode();
  return (
    <div className={clsx({ vertical: writingMode.isVertical })}>{children}</div>
  );
}
