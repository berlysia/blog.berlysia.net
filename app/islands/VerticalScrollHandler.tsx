import { useEffect } from "hono/jsx";
import { useViewerModeValue } from "../lib/viewerMode";
import { useInputDeviceDetector } from "../lib/useInputDeviceDetector";
import {
  handleVerticalWheel,
  handleVerticalKeydown,
} from "../lib/verticalScrollTransform";

function ClientVerticalScrollHandler() {
  const { isVertical } = useViewerModeValue();
  const { processWheelEvent, getDevice } = useInputDeviceDetector();

  useEffect(() => {
    if (!isVertical) return;

    const container = document.querySelector<HTMLElement>(".articleWrapper");
    if (!container) return;

    const onWheel = (event: WheelEvent) => {
      const device = processWheelEvent(event);
      handleVerticalWheel(event, container, device);
    };

    const onKeydown = (event: KeyboardEvent) => {
      handleVerticalKeydown(event, container);
    };

    container.addEventListener("wheel", onWheel, { passive: false });
    container.addEventListener("keydown", onKeydown);

    return () => {
      container.removeEventListener("wheel", onWheel);
      container.removeEventListener("keydown", onKeydown);
    };
  }, [isVertical, processWheelEvent, getDevice]);

  return null;
}

export default function VerticalScrollHandler() {
  if (import.meta.env.SSR) {
    return null;
  }

  return <ClientVerticalScrollHandler />;
}
