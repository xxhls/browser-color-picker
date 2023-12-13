clean:generate
	node bin/clean.cjs

generate:build
	node bin/generate.cjs

build:install
	yarn build

install:
	yarn install
