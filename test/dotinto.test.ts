import "../src/dotinto";
import { test, expect } from "bun:test";
import type { Equal, Expect, NotEqual } from "type-testing";

test("`into` method is non-enumerable in `Object` prototype.", () => {
  const findIntoProp = () => {
    for (const prop in Object.prototype) {
      if (prop === "into") {
        throw "Found `into` while enumerating.";
      }
    }
  };

  expect(findIntoProp).not.toThrow();
});

test("Use without extra arguments.", () => {
  const input = [1, 2, 3] as const;

  const result = input.into((arr) => arr[1]);

  expect(result).toBe(2);
});

test("Use with extra arguments.", () => {
  const input = [1, 2, 3] as const;

  const result = input.into((arr, n, m) => arr[1] + n + m, 5, 6);

  expect(result).toBe(13);
});

// Type tests.

const identity = <T>(t: T): T => t;

const value: string = "a";

const a = identity(value);
const b = value.into(identity);
const c = value.into((t) => t);
const d = value.into(<T>(t: T): T => t);

type test1a = Expect<Equal<typeof a, string>>;
type test1b = Expect<Equal<typeof b, string>>;
type test1c = Expect<Equal<typeof c, string>>;
type test1d = Expect<Equal<typeof d, string>>;

type test2a = Expect<Equal<typeof a, typeof b>>;
type test2b = Expect<Equal<typeof b, typeof c>>;
type test2c = Expect<Equal<typeof c, typeof d>>;
type test2d = Expect<Equal<typeof d, typeof a>>;
