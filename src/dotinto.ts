import { Dotinto } from "./types";

function into(
  this: ThisParameterType<Dotinto>,
  ...[fn, ...args]: Parameters<Dotinto>
): ReturnType<Dotinto> {
  return fn(this, ...args);
}

// Install globally.

declare global {
  interface Object {
    /**
     * Allows you to pipe a value into a function in left-to-right order, like
     * Bash `|` or some other languages' `|>` operator.
     *
     * @example
     *   // Turn this:
     *   third(second(first(a)), b);
     *   // Into this:
     *   first(a).into(second).into(third, b);
     */
    into: Dotinto;
  }
}

Object.defineProperty(Object.prototype, "into", {
  value: into,
  enumerable: false,
  configurable: false,
  writable: false,
});
