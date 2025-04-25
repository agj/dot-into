import "../src/dotinto";
import { test, expect } from "bun:test";

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
