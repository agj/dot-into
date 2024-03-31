import "../src/dotinto";
import { test, expect } from "bun:test";

test("Installed method is non-enumerable.", function () {
  const findIntoProp = () => {
    for (var prop in Object.prototype) {
      if (prop === "into") {
        throw "Found `into` while enumerating.";
      }
    }
  };

  expect(findIntoProp).not.toThrow();
});

test("Use without parameters.", function () {
  const input = [1, 2, 3] as const;

  expect(input.into((arr) => arr[1])).toBe(2);
});

test("Use with parameters.", function () {
  const input = [1, 2, 3] as const;

  expect(input.into((arr, num: number) => arr[1] + num, 5)).toBe(7);
});
