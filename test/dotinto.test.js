import into from "../dotinto";
import { test, expect } from "bun:test";

class Num {
  constructor(value) {
    this.value = value;
  }

  valueOf() {
    return this.value;
  }
}

function increment(a) {
  return new Num(a + 1);
}
function add(a, b, c, d) {
  return new Num(a + b + c + d);
}

test("Installation.", function () {
  expect(() => into.install(Num.prototype)).not.toThrow();
});

test("Function exposed stand-alone.", function () {
  expect(into.into).toBe(Num.prototype.into);
});

test("Installed method is non-enumerable.", function () {
  const perform = () => {
    for (var prop in Num.prototype) {
      if (prop === "into") {
        throw "Found `into` while enumerating.";
      }
    }
  };

  expect(perform).not.toThrow();
});

test("Use without parameters.", function () {
  expect(new Num(1).into(increment).valueOf()).toBe(2);
});

test("Use with parameters.", function () {
  expect(new Num(1).into(add, 1, 2, 3).valueOf()).toBe(7);
});
