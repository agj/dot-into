import "../src/dotinto";
import { expect, test } from "bun:test";
import type { Equal, Expect } from "type-testing";

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

const value: string = "a";

const identity = <T>(t: T): T => t;

function multiIdentity(t: number): number;
function multiIdentity(t: string): string;
function multiIdentity(t: boolean): boolean;
function multiIdentity(t: unknown) {
  return t;
}

const identityReturnValue = identity(value);
type TestIdentity = Expect<Equal<typeof identityReturnValue, string>>;

const intoIdentityReturnValue = value.into(identity);
type TestIntoIdentity = Expect<Equal<typeof intoIdentityReturnValue, string>>;

const intoUntypedAnonymousReturnValue = value.into((t) => t);
type TestIntoUntypedAnonymous = Expect<
  Equal<typeof intoUntypedAnonymousReturnValue, string>
>;

const intoGenericAnonymousReturnValue = value.into(<T>(t: T): T => t);
type TestIntoGenericAnonymous = Expect<
  Equal<typeof intoGenericAnonymousReturnValue, string>
>;

// @ts-expect-error There is a known issue with multiple-signature functions.
const intoMultiIdentityReturnValue = value.into(multiIdentity);
type TestIntoMultiIdentity = Expect<
  // @ts-expect-error There is a known issue with multiple-signature functions.
  Equal<typeof intoMultiIdentityReturnValue, string>
>;
