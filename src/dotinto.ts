import { Dotinto } from "./types";

function into(
  this: ThisParameterType<Dotinto>,
  ...[fn, ...args]: Parameters<Dotinto>
): ReturnType<Dotinto> {
  return fn(this, ...args);
}

export default {
  into: into,
  install: function (target: Function) {
    target = target || Object.prototype;
    Object.defineProperty(target, "into", {
      value: into,
      enumerable: false,
      configurable: true,
      writable: true,
    });
  },
};
