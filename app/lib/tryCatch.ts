export default function tryCatch<T>(
  fn: () => T
): { ok: true; value: T } | { ok: false; error: Error } {
  try {
    const value = fn();
    return {
      ok: true,
      value,
    };
  } catch (error) {
    return {
      ok: false,
      error,
    };
  }
}
