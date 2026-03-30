//#region src/dotinto.d.ts
type Fn<This, Args extends unknown[], Ret> = (p0: This, ...rest: Args) => Ret;
declare function into<This, Args extends unknown[], Ret>(this: This, fn: Fn<This, Args, Ret>, ...args: Args): Ret;
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
    into: typeof into;
  }
}
//# sourceMappingURL=dotinto.d.mts.map