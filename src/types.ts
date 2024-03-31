export type Dotinto = <
  Param0,
  Result,
  RestParams extends unknown[],
  Fn extends (p0: Param0, ...rest: RestParams) => Result
>(
  this: Param0,
  fn: Fn,
  ...args: RestParams
) => Result;
