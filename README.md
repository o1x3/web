# o1x3.com

Portfolio and writing site, implemented from the final Paper design in Next.js 15.

## Development

```sh
bun install --frozen-lockfile
bun dev
bun run typecheck
bun run lint
bun run test:interactions
bun run test:writing
bun run build
bun start
```

Paper Mono is embedded locally at weights 100–800. Its original SIL Open Font License and copyright notices are in `app/fonts/LICENSE.txt`. Brand artwork and all design imagery are local assets. There are no analytics or tracking scripts; the visitor illustration reads browser capabilities locally and does not transmit or persist them. Theme preference is saved locally.

## Writing

Copy [`app/writing/content/template.mdx`](app/writing/content/template.mdx) and follow the [authoring instructions](app/writing/content/README.md). Posts are compiled locally, with GFM tables, tasks, strikethrough, and footnotes. The current posts are design samples; sample pages carry `noindex`. The comprehensive formatting reference is `/writing/everything-this-page-can-render`. The supplied diagrams are accessible SVG components, not a general Mermaid parser.

## Verification

With the development or production server running:

```sh
bun run test:smoke
# To verify a deployed preview:
TEST_ORIGIN=https://your-preview.vercel.app bun run test:smoke
```

Smoke tests cover nonce-bearing executable scripts, compiled MDX elements and metadata, missing-page status codes, RSS, CV, and brand assets. Responsive geometry and interactive states are additionally checked in a browser against the Paper artboards.

## Résumé

`public/cv.pdf` is generated from `app/data.ts`. Rebuild after content changes with `node scripts/build-cv.mjs`. This optional command needs a local `pdflatex`; deployment uses the checked-in PDF and does not need TeX. The builder uses temporary files and leaves the original résumé source untouched.
