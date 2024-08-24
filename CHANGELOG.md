# dot-into changelog

Details on all dot-into releases. The format is roughly based on [Keep a
Changelog](https://keepachangelog.com/en/1.1.0/).

## [2.0.0] (2024-03-31)

[2.0.0]: https://github.com/agj/dot-into/tree/v2.0.0

Simplified for the base use-case, and made it TypeScript-ready.

### Added

- TypeScript types.

### Changed

- Importing `dot-into` now instantly causes the side-effect of installing the
  `into` method on `Object.prototype`. In sum, this:

    ```js
    import dotInto from "dot-into";
    dotInto.install();
    ```

  Becomes this:

    ```js
    import "dot-into";
    ```

### Removed

- `install` and the standalone `into` function are not exported anymore.

## [1.0.2] (2017-05-12)

[1.0.2]: https://github.com/agj/dot-into/tree/v1.0.2

Fixed CI issues.

## [1.0.1] (2017-05-12)

[1.0.1]: https://github.com/agj/dot-into/tree/v1.0.1

Fixed some test issues.

## [1.0.0] (2017-05-11)

[1.0.0]: https://github.com/agj/dot-into/tree/v1.0.0

Improved tests and documentation.

## [0.1.1] (2015-10-22)

[0.1.1]: https://github.com/agj/dot-into/tree/v0.1.1

Only fixed the name to `dot-into` in `package.json`.

## [0.1.0] (2015-10-21)

[0.1.0]: https://github.com/agj/dot-into/tree/v0.1.0

First release. Use the `install` function to add the `into` method to any
prototype you provide, or the `Object` prototype if none supplied. The `into`
function is also exported on its own.
