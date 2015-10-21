
into
====

A small javascript utility function for Node that, by installing into a prototype, allows you to maintain left-to-right order in function calls, not only with methods but with any arbitrary function. Compare `third(second(first(obj)))` to `first(obj).into(second).into(third)`.

into is a javascript implementation of [Reg Brathwaite's Ruby "into" idea][1]. He already implemented it in his [Katy][2] library as the T method, but this is a more basic and focused approach with no added magic.

[1]: http://weblog.raganwald.com/2008/01/no-detail-too-small.html
[2]: https://github.com/raganwald/Katy


## Example

```js
require('into').install(Number.prototype);

function double(a) { return a * 2 }
function add(a, b) { return a + b }

// With list [1, 2, 3], double each, add all values, and then get its second power.
[1, 2, 3].map(double).reduce(add).into(Math.pow, 2); // 144
```

Note the last line. Normally, you'd have to break the left-to-right flow and surround the result of the `map` and `reduce` operations into the `Math.pow` function, like so:

```js
Math.pow([1, 2, 3].map(double).reduce(add), 2); // 144
```


## API

### `install([target])`

You can pass a prototype to install it to, or it will by default use Object.prototype, allowing to use the `into` method in any object. It is defined as non-enumerable, so the property won't show up when iterating with `for (var prop in obj)`.

### `into(fn [, ...args])`

This is the actual function that is installed using `install`, offered to allow for customized implementations.


## License

Copyright (c) 2015, agj

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

