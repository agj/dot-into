export type Dotinto = <
  This,
  Rest extends any[],
  Fn extends (p0: This, ...rest: Rest) => any
>(
  this: This,
  fn: Fn,
  ...rest: Rest
) => ReturnType<Fn>;
