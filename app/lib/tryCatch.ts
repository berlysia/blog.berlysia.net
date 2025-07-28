import type { Result } from "./Result";
import { createOk, createErr } from "./Result";

export default function tryCatch<T>(fn: () => T): Result<T, Error> {
  try {
    const value = fn();
    return createOk(value);
  } catch (error) {
    return createErr(error);
  }
}
