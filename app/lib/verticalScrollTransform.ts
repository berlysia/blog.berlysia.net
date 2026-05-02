import type { InputDevice } from "./useInputDeviceDetector";

// writing-mode: vertical-rl では scrollLeft が 0 から負方向に伸びる（主要ブラウザ統一済み）
// "読み進める" = コンテンツの先頭→末尾 = scrollLeft が 0 → 負値方向

export function verticalScrollBy(container: HTMLElement, delta: number): void {
  container.scrollLeft -= delta;
}

export function verticalScrollToStart(container: HTMLElement): void {
  container.scrollLeft = 0;
}

export function verticalScrollToEnd(container: HTMLElement): void {
  container.scrollLeft =
    container.scrollWidth > 0
      ? -(container.scrollWidth - container.clientWidth)
      : 0;
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
  verticalScrollBy(container, event.deltaY);
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
