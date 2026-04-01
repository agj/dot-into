[private]
@default:
    just --list --unsorted

# Load a Nix development shell.
init:
    @printf "You may type 'exit' to return to your regular shell.\n"
    nix develop -c "$SHELL"

# Build into `dist` folder.
build: clean install
    yarn exec tsdown --format esm,cjs
    # Fixes types don't load:
    echo -e "\nexport {}" >> ./dist/dotinto.d.mts
    just format

# Run tests.
test: build check-types
    yarn exec vitest

# Run tests and wait for file changes.
test-watch: build check-types
    yarn exec vitest --watch

# Check TypeScript types.
check-types: install
    yarn exec tsc --noEmit

# Formats files.
format:
    prettier --write '**.{ts,js,json,md}'

# Pack to check whether published code is correct.
pack: build
    yarn pack

[private]
install:
    yarn install

[private]
clean:
    rm -rf ./dist
