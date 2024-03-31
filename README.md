# dot-into

A small JavaScript utility that allows you to convert this type of code

```js
third(second(first(a)), b);
```

into this

```js
first(a).into(second).into(third, b);
```

You might be familiar with this style of programming from terminal shells (Bash and friends) which use the `|` (pipe) operator, or from programming languages that implement piping, commonly through the `|>` operator. It allows you to avoid nesting function calls, maintaining left-to-right order.

⚠️ **dot-into** modifies the `Object` prototype with an `into` method. This ensures that anything that extends `Object` will have `into` available. The method is made non-enumerable, so it should not interfere with ordinary interaction with objects, such as while iterating through properties.

This package was originally prompted by [Reg Brathwaite's 2008 blog post][2008blog]. He also implemented it in his [_Katy_][katy] library as the `T` method, but mine was a more basic and focused approach with no added magic.

[2008blog]: http://weblog.raganwald.com/2008/01/no-detail-too-small.html
[katy]: https://github.com/raganwald/Katy
[ramda]: https://ramdajs.com/

## Fun ideas

Some of these examples use [Ramda][ramda], which is a nice library that makes it easy to do these kinds of sequential transformations of data!

```js
import "dot-into";
import R from "ramda"; // See: https://ramdajs.com/

// A sequence of arithmetic operations on an array of numbers.

[1, 2, 3]
  .map((a) => a * 2)
  .reduce((a, b) => a + b)
  .into(Math.pow, 2);

//
```

## Installation

With npm:

```sh
npm install --save dot-into
```

Remember to `import "dot-into"` from the main file of your project!

## License

Copyright (c) 2017-2024, agj

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
