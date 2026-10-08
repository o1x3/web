# Development environment

This is a self-contained Next.js 16 App Router portfolio with React 19. It needs no database, account credentials, or environment variables.

Use Bun 1.4.2, pinned in `.bun-version` and `package.json`. Dependencies are locked in `bun.lock`.

- Development: `bun run dev` on http://localhost:3000
- Validation: `bun run lint`, `bun run typecheck`, `bun run test:interactions`, `bun run test:writing`, `bun run test:mdx`
- Production: `bun run build`, then `bun run start`
- HTTP checks with a server running: `bun run test:smoke`

Styles are authored CSS. Article content is local MDX; follow `app/writing/content/README.md`. The writing registry is currently empty. RSS lives at `/writing/rss.xml`.

Keep the request nonce policy in `proxy.ts` aligned with rendered executable scripts. There are no analytics packages or contribution-scraping endpoints. The visitor illustration stays local.
