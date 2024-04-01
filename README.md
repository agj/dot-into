# dot-into ↪️

A small **JavaScript** and **TypeScript** utility that allows you to convert this type of code

```js
third(second(first(a)), b);
```

into this

```js
first(a).into(second).into(third, b);
```

You might be familiar with this style of programming from terminal shells (Bash and friends) which use the `|` (pipe) operator, or from programming languages that implement function piping, commonly through the `|>` operator. It allows you to avoid nesting function calls, maintaining left-to-right order.

⚠️ **DO NOT use in library code!** dot-into modifies the `Object` prototype with an `into` method, which is part of the global state! This ensures that most anything will have this method available, but it will affect your entire project.

This package was originally prompted by [Reg Brathwaite's 2008 blog post][2008blog]. He also implemented it in his [_Katy_][katy] library as the `T` method, but mine was a more basic and focused approach with no added magic. And now it comes with types!

[2008blog]: http://weblog.raganwald.com/2008/01/no-detail-too-small.html
[katy]: https://github.com/raganwald/Katy
[ramda]: https://ramdajs.com/

## Fun ways to use

Some of these examples use [Ramda][ramda], which is a library that makes it easy to do these kinds of sequential transformations of data!

```js
import "dot-into";
import R from "ramda"; // See: https://ramdajs.com/

// Get sum of amounts in objects, then get its power of 2.

const amountSumSquared = [
  { amounts: [10, 20] },
  { amounts: [35, 15] },
  { amounts: [2, 3] },
]
  .flatMap((o) => o.amounts)
  .reduce((n, m) => n + m)
  .into(Math.pow, 2);

// Group strings into an object.

const namesDict = ["Claudia", "Pedro", "Amalia"]
  .map((name) => [name, `My friend ${name}!`])
  .into(Object.fromEntries);

// Take the third string in alphabetical order.

const [third] = ["foo", "bar", "baz", "hoge", "bar", "foo"]
  .into(R.sort)
  .into(R.uniq)
  .into(R.drop(2));

// Get every latin alphabet letter used in some text.

const latinLettersInCorpus = "corpus"
  .toLowerCase()
  .split("")
  .filter((c) => /[a-z]/.test(c))
  .into(R.uniq);
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
