import "..";
import { test, expect } from "bun:test";

test("`into` method is non-enumerable in `Object` prototype.", function () {
  const findIntoProp = () => {
    for (var prop in Object.prototype) {
      if (prop === "into") {
        throw "Found `into` while enumerating.";
      }
    }
  };

  expect(findIntoProp).not.toThrow();
});

test("Use without extra arguments.", function () {
  const input = [1, 2, 3] as const;

  const result = input.into((arr) => arr[1]);

  expect(result).toBe(2);
});

test("Use with extra arguments.", function () {
  const input = [1, 2, 3] as const;

  const result = input.into((arr, n, m) => arr[1] + n + m, 5, 6);

  expect(result).toBe(13);
});
