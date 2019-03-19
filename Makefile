.PHONY: dev deps

deps: node_modules

dev: deps
	yarn jest --watch

node_modules:
	yarn
	touch node_modules
