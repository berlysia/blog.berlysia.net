export type Result<T, E> = Ok<T> | Err<E>;
export type Ok<T> = {
  ok: true;
  value: T;
};
export type Err<E> = {
  ok: false;
  error: E;
};

export function createOk<T>(value: T): Ok<T> {
  return { ok: true, value };
}

export function createErr<E>(error: E): Err<E> {
  return { ok: false, error };
}

export function isOk<T, E>(result: Result<T, E>): result is Ok<T> {
  return result.ok === true;
}

export function isErr<T, E>(result: Result<T, E>): result is Err<E> {
  return result.ok === false;
}
