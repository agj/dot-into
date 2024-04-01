type Dotinto = <This, Rest extends any[], Fn extends (p0: This, ...rest: Rest) => any>(this: This, fn: Fn, ...rest: Rest) => ReturnType<Fn>;

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

export {};
