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
  // writingMode.isVerticalの値に応じて、classList.toggleを使ってhtml要素にverticalクラスを付与する
  useLayoutEffect(() => {
    const html = document.documentElement;
    html.classList.toggle("vertical", writingMode.isVertical);
    return () => {
      // アンマウント時には必ずremoveする
      html.classList.remove("vertical");
    };
  }, [writingMode.isVertical]);
  return (
    <div className={clsx({ vertical: writingMode.isVertical })}>{children}</div>
  );
}
