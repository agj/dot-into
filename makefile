init: ## Load a shell with all dependencies (if you don't use direnv).
	@printf "You may type 'exit' to return to the regular shell.\n"
	nix develop -c "$$SHELL"

build: install ## Build into `dist` folder.
# Clean-up.
	rm -rf ./dist
# Generate files.
	npx tsup ./src/dotinto.ts --format cjs --dts
# Fix for tsup issue: https://github.com/egoist/tsup/issues/843
	printf "\nexport {};\n" >> ./dist/dotinto.d.ts

test: install ## Run tests.
	bun test

test-watch: install ## Run tests and wait for file changes.
	bun test --watch

pack: build ## Pack to check whether published code is correct.
	pnpm pack

install:
	pnpm install



# The following makes this file self-documenting.
# See: https://marmelab.com/blog/2016/02/29/auto-documented-makefile.html

help:
	@printf "To develop you'll need Nix installed!\n\n"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

.DEFAULT_GOAL := help
