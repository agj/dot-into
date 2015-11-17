
dot-into
========

[![Build Status](https://travis-ci.org/agj/dot-into.svg?branch=master)](https://travis-ci.org/agj/dot-into)
[![Dependency Status](https://david-dm.org/agj/dot-into.svg)](https://david-dm.org/agj/dot-into)

A small javascript utility function for [Node][node] and the browser (using [Browserify][browserify]) that, by installing into a prototype, allows you to maintain left-to-right order in function calls, using any arbitrary function almost as if it were a method of the object. Compare `third(second(first(a)), b)` to `first(a).into(second).into(third, b)`.

**dot-into** is a javascript implementation of [Reg Brathwaite's Ruby "into" idea][1] (read his blog post for illuminating insight). He already implemented it in his [_Katy_][2] library as the T method, but this is a more basic and focused approach with no added magic.

[node]: https://nodejs.org/
[browserify]: http://browserify.org/
[1]: http://weblog.raganwald.com/2008/01/no-detail-too-small.html
[2]: https://github.com/raganwald/Katy


## Example

```js
require('dot-into').install(Number.prototype);

function double(a) { return a * 2 }
function add(a, b) { return a + b }

// With list [1, 2, 3], double each, add all values, and then get its second power.
[1, 2, 3].map(double).reduce(add).into(Math.pow, 2); // 144
```

Note the last line. Normally, you'd have to break the left-to-right flow and surround the result of the `map` and `reduce` operations into the `Math.pow` function, like so:

```js
Math.pow([1, 2, 3].map(double).reduce(add), 2); // 144
```


## Installation

Using [Node][node], type into the command line:

```sh
npm install dot-into
```


## API

Given:

```js
var dotInto = require('dot-into');
```

### `dotInto.install([target])`

You can pass `target` to specify a prototype to install it to, or it will by default use `Object.prototype`, allowing use of the `into` method in any object. It is defined as non-enumerable, so the property won't show up when iterating with `for (var prop in obj)`. Be aware that if you install it on global objects, it will affect global state! Consider the risk if you decide to do it.

### `dotInto.into(fn [, ...args])`

This is the actual function that is installed using `install`, offered to allow for customized implementations.

* `fn` is a function that takes one or more arguments.
* `args` are optional extra arguments to pass to `fn`.

`fn` is called with `this` as the first argument, followed by any extra arguments `args` if supplied. `this` is the object _left to the dot of a method call,_ i.e. `obj` in `obj.into(fn)`.

```js
require('dot-into').install(); // By default installs on `Object.prototype`, affecting all objects.
({ 'one': 1, 'two': 2 }).into(Object.keys); // ['one', 'two']
```

Is equivalent to:

```js
Object.keys({ 'one': 1, 'two': 2 }); // ['one', 'two']
```


## License

Copyright (c) 2015, agj

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

