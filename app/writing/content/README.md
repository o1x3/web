# Publishing with MDX

There are no published articles. The writing page shows only its centered title and mark, and the RSS feed has no entries.

1. Copy `template.mdx` to a descriptive filename in this directory.
2. Import the new MDX component in `app/writing/[slug]/page.tsx` and register it in `articleContent` with a unique content key.
3. Add a matching entry to `posts` in `app/lib/posts.ts`: slug, title, `YYYY-MM` date, category, reading minutes, description, and content key. Keep entries newest first. They appear in writing, RSS, and article navigation; indexing enables when the first article exists.
4. Run `bun run test:mdx`, `bun run test:writing`, and `bun run build` before publishing.

Local MDX is compiled at build time. `remark-gfm` supports tables, task lists, strikethrough, and standard linked footnotes. Fenced code blocks have a copy button. The template demonstrates the reusable `Callout`, `PullQuote`, `Disclosure`, `CodeBlock`, and `ArticleDivider` components. Use normal Markdown for headings, lists, links, and images; give images meaningful alt text and keep assets local. Custom diagrams can be authored as SVG; there is no Mermaid runtime.
