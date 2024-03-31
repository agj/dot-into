init: ## Load a shell with all dependencies (if you don't use direnv).
	@printf "You may type 'exit' to return to the regular shell.\n"
	nix develop -c "$$SHELL"

test: install ## Run tests.
	bun test

test-watch: install ## Run tests and wait for file changes.
	bun test --watch

install:
	pnpm install



# The following makes this file self-documenting.
# See: https://marmelab.com/blog/2016/02/29/auto-documented-makefile.html

help:
	@printf "To develop you'll need Nix installed!\n\n"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

.DEFAULT_GOAL := help
