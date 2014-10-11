
PATH := node_modules/.bin:$(PATH)
SHELL := /bin/bash -e -o pipefail
VERSION ?= patch

node_modules: package.json
	@npm prune
	@npm install
	@touch node_modules

coverage: index.js test/* node_modules
	@istanbul cover --report html --print detail ./test/index.js

coveralls: coverage
	@istanbul report lcov && (cat coverage/lcov.info | coveralls)

clean:
	@$(RM) -fr node_modules $(STANDALONE).js
	@$(RM) -fr npm-debug.log
	@$(RM) -fr coverage

test: node_modules
	@tape test/test-*.js

travis: test coveralls

release:
	npm version $(VERSION)
	git push && git push --tags
	npm publish

.PHONY: clean coveralls release test travis
