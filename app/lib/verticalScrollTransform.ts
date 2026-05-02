import type { InputDevice } from "./useInputDeviceDetector";

// writing-mode: vertical-rl では scrollLeft が 0 から負方向に伸びる（主要ブラウザ統一済み）
// "読み進める" = コンテンツの先頭→末尾 = scrollLeft が 0 → 負値方向

const LERP_FACTOR = 0.18;
const SNAP_THRESHOLD = 0.5;

let scrollTarget: number | null = null;
let animationFrameId: number | null = null;

function animate(container: HTMLElement): void {
  if (scrollTarget === null) {
    animationFrameId = null;
    return;
  }

  const current = container.scrollLeft;
  const diff = scrollTarget - current;

  if (Math.abs(diff) < SNAP_THRESHOLD) {
    container.scrollLeft = scrollTarget;
    animationFrameId = null;
    return;
  }

  container.scrollLeft = current + diff * LERP_FACTOR;
  animationFrameId = requestAnimationFrame(() => animate(container));
}

function clampTarget(container: HTMLElement): void {
  if (scrollTarget === null) return;
  const minScroll = -(container.scrollWidth - container.clientWidth);
  scrollTarget = Math.max(minScroll, Math.min(0, scrollTarget));
}

export function verticalScrollBy(container: HTMLElement, delta: number): void {
  if (scrollTarget === null) {
    scrollTarget = container.scrollLeft;
  }
  scrollTarget -= delta;
  clampTarget(container);

  if (animationFrameId === null) {
    animationFrameId = requestAnimationFrame(() => animate(container));
  }
}

export function resetScrollTarget(): void {
  scrollTarget = null;
  if (animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }
}

export function verticalScrollToStart(container: HTMLElement): void {
  scrollTarget = 0;
  if (animationFrameId === null) {
    animationFrameId = requestAnimationFrame(() => animate(container));
  }
}

export function verticalScrollToEnd(container: HTMLElement): void {
  scrollTarget =
    container.scrollWidth > 0
      ? -(container.scrollWidth - container.clientWidth)
      : 0;
  if (animationFrameId === null) {
    animationFrameId = requestAnimationFrame(() => animate(container));
  }
}

export function handleVerticalWheel(
  event: WheelEvent,
  container: HTMLElement,
  device: InputDevice
): void {
  if (device === "trackpad") return;

  if (event.deltaX !== 0) return;

  if (event.deltaY === 0) return;

  event.preventDefault();

  let delta = event.deltaY;
  if (event.deltaMode === 1) {
    delta *= 40;
  } else if (event.deltaMode === 2) {
    delta *= container.clientWidth;
  }

  verticalScrollBy(container, delta);
}

export function handleVerticalKeydown(
  event: KeyboardEvent,
  container: HTMLElement
): void {
  switch (event.key) {
    case "PageDown": {
      event.preventDefault();
      verticalScrollBy(container, container.clientWidth);
      break;
    }
    case "PageUp": {
      event.preventDefault();
      verticalScrollBy(container, -container.clientWidth);
      break;
    }
    case "End": {
      event.preventDefault();
      verticalScrollToEnd(container);
      break;
    }
    case "Home": {
      event.preventDefault();
      verticalScrollToStart(container);
      break;
    }
  }
}
