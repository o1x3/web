# o1x3.com

Portfolio and MDX writing site on Next.js 16 and React 19. There are no published articles.

## Development

Use Bun 1.4.2 (pinned in `.bun-version` and `package.json`):

```sh
bun install --frozen-lockfile
bun dev
bun run typecheck
bun run lint
bun run test:interactions
bun run test:writing
bun run test:mdx
bun run build
bun start
```

TypeScript uses the newest compatible 6.x release. The current lint tooling and local compiler API tests do not support TypeScript 7's removed JavaScript compiler API.

## Assets and privacy

The variable font is served locally as a 53 KB WOFF2 file with its original license and copyright notices in `app/fonts/LICENSE.txt`. The 1200×630 share card is used by Open Graph and Twitter. Styles are authored CSS, with no utility framework or PostCSS configuration. Article styles load only on article routes.

There are no analytics or tracking scripts. The visitor illustration reads capabilities locally without transmitting or storing them. Theme preference is saved locally. Request nonces protect executable scripts; the proxy runs on HTML routes and skips static assets.

## Writing and RSS

Copy [`template.mdx`](app/writing/content/template.mdx) and follow the [authoring instructions](app/writing/content/README.md). The writing page shows only a centered title while empty. `/writing/rss.xml` is a valid, empty RSS 2.0 feed ready for future posts. The template is compiled and rendered with actual MDX and site components in its regression check.

## HTTP verification

With the development or production server running:

```sh
bun run test:smoke
TEST_ORIGIN=https://your-preview.vercel.app bun run test:smoke
```

Smoke checks cover CSP nonces, the empty writing page/feed, removed article routes, share metadata/artwork, résumé, and 404 responses. Layout and interaction checks also run in a browser.

## Résumé

`public/cv.pdf` is generated from `app/data.ts`. Rebuild with `node scripts/build-cv.mjs` after changing content. The optional command needs a local `pdflatex`; deployments use the checked-in PDF and need no TeX installation.
