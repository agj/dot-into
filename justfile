[private]
@default:
    just --list --unsorted

# Load a Nix development shell.
init:
    @printf "You may type 'exit' to return to your regular shell.\n"
    nix develop -c "$SHELL"

# Build into `dist` folder.
build: clean install
    # Generate files.
    bunx tsup ./src/dotinto.ts --format cjs --dts
    # Fix for tsup issue: https://github.com/egoist/tsup/issues/843
    printf "\nexport {};\n" >> ./dist/dotinto.d.ts

# Run tests.
test: build check-types
    bun test

# Run tests and wait for file changes.
test-watch: build check-types
    bun test --watch

# Check TypeScript types.
check-types:
    tsc --noEmit
    tsc --noEmit test/**.ts

# Formats files.
format:
    biome format --write src/**.ts test/**.ts

# Pack to check whether published code is correct.
pack: build
    bun pm pack

[private]
install:
    bun install

[private]
clean:
    rm -rf ./dist
