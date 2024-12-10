export function isNotUndefined<TVal>(x: TVal | undefined): x is TVal {
  return typeof x !== undefined && typeof x !== null;
}
