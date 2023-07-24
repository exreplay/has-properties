type DeepRequired<T> = {
  [P in keyof T]-?: DeepRequired<T[P]>;
};

type PathImpl<T, K extends keyof T> = K extends string
  ? T[K] extends Record<string, unknown>
    ? T[K] extends ArrayLike<unknown>
      ? K | `${K}.${PathImpl<T[K], Exclude<keyof T[K], keyof unknown[]>>}`
      : K | `${K}.${PathImpl<T[K], keyof T[K]>}`
    : K
  : never;

export type Path<T> = PathImpl<T, keyof T> | keyof T;

type RecursiveDeepRequireByKey<T, K> = {
  [P in keyof T]: K extends `${P & string}.${infer R}`
    ? Required<RecursiveDeepRequireByKey<T[P], R>>
    : T[P];
};

type UnionToIntersection<T> = (T extends any ? (x: T) => void : never) extends (
  x: infer R
) => void
  ? R
  : never;

type DeepRequireByKey<
  T,
  K extends Path<DeepRequired<T>>
> = K extends `${infer P}.${string}`
  ? P extends keyof T
    ? RecursiveDeepRequireByKey<Required<T>, K>
    : RecursiveDeepRequireByKey<T, K>
  : RecursiveDeepRequireByKey<T, K>;

export function hasProperties<T extends Record<string, any>, K extends Path<DeepRequired<T>>[]>(
  obj: T,
  ...args: K
): obj is UnionToIntersection<DeepRequireByKey<T, K[number]>> & T {
  for (const arg of args) {
    // eslint-disable-next-line unicorn/no-array-reduce
    if (!(arg as string).split('.').reduce((o, i) => o?.[i], obj)) {
      return false;
    }
  }

  return true;
}
