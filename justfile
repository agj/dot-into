[private]
@default:
    just --list --unsorted

# DEVELOPMENT

# Build into `dist` folder.
[group("development")]
build: clean install
    yarn exec tsdown --format esm,cjs
    # Fixes types don't load:
    echo -e "\nexport {}" >> ./dist/dotinto.d.mts
    just format

# Run tests.
[group("development")]
test: build check-types
    yarn exec vitest

# Run tests and wait for file changes.
[group("development")]
test-watch: build check-types
    yarn exec vitest --watch

# Check TypeScript types.
[group("development")]
check-types: install
    yarn exec tsc --noEmit

# Format files.
[group("development")]
format:
    prettier --write '**.{ts,js,json,md}'

# PRIVATE

[private]
install:
    yarn install

[private]
clean:
    rm -rf ./dist
