export type Dotinto = <
  This,
  Ps extends any[],
  R,
  Fn extends (p0: This, ...rest: Ps) => R
>(
  this: This,
  fn: Fn,
  ...args: Ps
) => ReturnType<Fn>;
