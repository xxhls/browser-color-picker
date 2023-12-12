clean:generate
	node bin/clean.cjs

generate:build
	node bin/generate.cjs

build:install
	pnpm build

install:
	pnpm install
