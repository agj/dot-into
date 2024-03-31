import { Dotinto } from "./types";

function into(
  this: ThisParameterType<Dotinto>,
  ...[fn, ...args]: Parameters<Dotinto>
): ReturnType<Dotinto> {
  return fn(this, ...args);
}

// Install globally.

Object.defineProperty(Object.prototype, "into", {
  value: into,
  enumerable: false,
  configurable: false,
  writable: false,
});
