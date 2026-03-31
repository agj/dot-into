# dot-into ↪️

A small **JavaScript** and **TypeScript** utility that allows you to convert
this type of code

```js
third(second(first(a)), b);
```

into this

```js
first(a).into(second).into(third, b);
```

You might be familiar with this style of programming from terminal shells (Bash
and friends) which use the `|` (pipe) operator, or from programming languages
that implement function piping, commonly through the `|>` operator. It allows
you to avoid nesting function calls, maintaining left-to-right order.

⚠️ **DO NOT use in library code!** dot-into modifies the `Object` prototype
with an `into` method, which is part of the global state! This ensures that
most anything will have this method available, but it will affect your entire
project.

This package was originally prompted by [Reg Brathwaite's 2008 blog
post][2008blog]. He also implemented it in his [_Katy_][katy] library as the `T`
method, but mine was a more basic and focused approach with no added magic. And
now it comes with types!

[2008blog]: http://weblog.raganwald.com/2008/01/no-detail-too-small.html
[katy]: https://github.com/raganwald/Katy
[ramda]: https://ramdajs.com/

## Fun ways to use

Some of these examples use [Ramda][ramda], which is a library that makes it easy
to do these kinds of sequential transformations of data!

```js
import "dot-into";
import * as R from "ramda"; // See: https://ramdajs.com/

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
  .into(R.sort(R.ascend))
  .into(R.uniq)
  .into(R.drop(2));

// Get every latin alphabet letter used in some text.

const latinLettersInCorpus = "corpus"
  .toLowerCase()
  .split("")
  .filter((char) => /[a-z]/.test(char))
  .into(R.uniq);
```

## Installation

With npm:

```sh
npm install --save dot-into
```

Remember to `import "dot-into"` from the main file of your project!

## No AI slop policy

This project does not use LLMs or any form of generative AI for the authoring of
its code or any of its related content, and will not accept such contributions,
be they in whole or in part made using such technologies.
