[private]
@default:
    just --list --unsorted

# Load a Nix development shell.
init:
    @printf "You may type 'exit' to return to your regular shell.\n"
    nix develop -c "$SHELL"

# Build into `dist` folder.
build: clean install
    bunx tsdown ./src/dotinto.ts --format esm

# Check for errors.
lint:
    biome lint

# Run tests.
test: build check-types
    bun test

# Run tests and wait for file changes.
test-watch: build check-types
    bun test --watch

# Check TypeScript types.
check-types: install
    bunx tsc --noEmit
    bunx tsc --noEmit test/**.ts

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
