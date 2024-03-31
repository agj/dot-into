function into<
  Param0,
  Result,
  RestParams extends unknown[],
  Fn extends (p0: Param0, ...rest: RestParams) => Result
>(this: Param0, fn: Fn, ...args: RestParams): Result {
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
