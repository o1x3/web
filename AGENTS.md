# AGENTS.md

## Cursor Cloud specific instructions

This repo is a single Next.js 15 (App Router) personal portfolio site (`portfolio-grid`). It is self-contained: no database, auth, queues, env vars, or secrets are required to run it.

### Package manager
- Uses **Bun** (`bun.lock`). Bun is installed to `~/.bun/bin` and is on `PATH` via `~/.bashrc`. If `bun` is not found in a fresh shell, run `export PATH="$HOME/.bun/bin:$PATH"`.

### Commands (see `package.json` scripts)
- Dev server: `bun run dev` → `next dev --turbopack` on http://localhost:3000
- Lint: `bun run lint` (note: `next lint` prints a deprecation warning; this is expected and not an error)
- Build: `bun run build`
- Prod serve: `bun run start`

### Notes
- The only backend route is `app/api/contributions/route.ts`, which scrapes public GitHub endpoints (no token). If egress to GitHub is blocked, it degrades gracefully (returns `503`/empty), and the rest of the site still renders fine.
- Vercel Analytics/Speed Insights are production-only telemetry; irrelevant for local dev.
