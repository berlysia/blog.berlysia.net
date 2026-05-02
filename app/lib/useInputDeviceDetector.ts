import { useCallback, useRef } from "hono/jsx";

export type InputDevice = "mouse" | "trackpad";

const STORAGE_KEY = "scroll-input-device";
const EMA_ALPHA = 0.15;
const MOUSE_THRESHOLD = 0.7;
const TRACKPAD_THRESHOLD = 0.3;

function getOsDefault(): InputDevice {
  if (typeof navigator === "undefined") return "mouse";
  return /mac/i.test(navigator.platform) ||
    /macintosh/i.test(navigator.userAgent)
    ? "trackpad"
    : "mouse";
}

function loadStoredDevice(): InputDevice | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "mouse" || stored === "trackpad") return stored;
  } catch {
    // ignore
  }
  return null;
}

function saveDevice(device: InputDevice): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, device);
  } catch {
    // ignore
  }
}

function classifyWheelEvent(event: WheelEvent): number | null {
  if (event.shiftKey && event.deltaX !== 0) return null;

  if (event.deltaMode === 1) return 1;

  if (!event.shiftKey && event.deltaX !== 0) return 0.1;

  const absDeltaY = Math.abs(event.deltaY);
  if (event.deltaX === 0) {
    if (absDeltaY >= 100) return 0.9;
    if (absDeltaY >= 50) return 0.5;
    return 0.3;
  }

  return null;
}

interface DetectorState {
  device: InputDevice;
  emaScore: number;
}

export function useInputDeviceDetector() {
  const stateRef = useRef<DetectorState | null>(null);

  if (stateRef.current === null) {
    const stored = loadStoredDevice();
    const device = stored ?? getOsDefault();
    stateRef.current = {
      device,
      emaScore: device === "mouse" ? 0.8 : 0.2,
    };
  }

  const processWheelEvent = useCallback((event: WheelEvent): InputDevice => {
    const state = stateRef.current!;
    const confidence = classifyWheelEvent(event);

    if (confidence !== null) {
      state.emaScore =
        EMA_ALPHA * confidence + (1 - EMA_ALPHA) * state.emaScore;

      let changed = false;
      if (state.emaScore > MOUSE_THRESHOLD && state.device !== "mouse") {
        state.device = "mouse";
        changed = true;
      } else if (
        state.emaScore < TRACKPAD_THRESHOLD &&
        state.device !== "trackpad"
      ) {
        state.device = "trackpad";
        changed = true;
      }

      if (changed) {
        saveDevice(state.device);
      }
    }

    return state.device;
  }, []);

  const getDevice = useCallback((): InputDevice => {
    return stateRef.current!.device;
  }, []);

  return { processWheelEvent, getDevice };
}
