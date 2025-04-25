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

const uniq = <T,>(t: T): T => ts;

const a = uniq(["a"].map((a) => `${a}b`));
const b = ["a"].map((a) => `${a}b`).into(uniq);
const c = ["a"].map((a) => `${a}b`).into(<T,>(t: T): T => t);

type test1 = Expect<Equal<typeof a, string[]>>;
type test2 = Expect<Equal<typeof b, string[]>>;
type test3 = Expect<Equal<typeof c, string[]>>;

type test4 = Expect<Equal<typeof a, typeof b>>;
type test5 = Expect<Equal<typeof b, typeof c>>;
type test6 = Expect<Equal<typeof c, typeof a>>;
