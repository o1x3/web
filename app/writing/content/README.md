# Writing in MDX

Articles are compiled locally by Next.js with `@next/mdx`. `remark-gfm` adds tables, task lists, strikethrough, and standard footnotes. No remote MDX or runtime evaluation is used.

1. Copy `template.mdx` to a descriptive filename in this directory.
2. Add the post's slug, title, `YYYY-MM` date, category, reading minutes, description, and list weight to `app/lib/posts.ts`. Set `sample: false` for a real published article; use `sample: true` for review samples. Sample articles stay out of search, and the writing index becomes searchable automatically when its first real article is published. The current entries are explicitly review samples from the Paper design. Set up real publication metadata before replacing them.
3. Import the new file in `app/writing/[slug]/page.tsx` and add its component to the `articleContent` registry. Give its entry a matching content key in the `Post` type. Static imports keep unsupported or missing content from silently appearing.
4. Run `bun run test:writing` to verify publication indexing, then `bun run build` to validate the MDX, static routes, and metadata.

All common Markdown elements receive the site typography through `mdx-components.tsx` and `app/writing.css`. The reference route `/writing/everything-this-page-can-render` demonstrates each styled element.

Available MDX components: `Callout` (`kind="note"` or `"warning"`), `PullQuote`, `Disclosure` (`title`, optional `open`, `lines`), `CodeBlock` (`code`, `filename`, `language`, optional `highlightLine`), `ArticleDivider`, `FootnoteRef`, `ArticleNotes`, `MarginNote`, `Pipeline`, `ReferenceImage`, `FlowDiagram`, `SequenceDiagram`, and `StateDiagram`. Native fenced code blocks also work; use `CodeBlock` for line numbers, copy, and selected lines.

The three diagram components render accessible, theme-aware SVGs matching the reference diagrams. Their graph data is authored in React; they are not a Mermaid parser. For a new diagram, create an equivalent component and register it in `mdx-components.tsx`. Do not paste Mermaid source and expect automatic rendering. Diagrams scroll horizontally on small screens to preserve readable labels.

Standard footnotes use `[^id]` references and `[^id]: text` definitions. The reference's custom `FootnoteRef`/`ArticleNotes` pair additionally provides the exact square chips and return arrows from Paper. `MarginNote` places a duplicate note beside the article on wide screens and disappears on phones. Standard notes remain at the end of the article on all screen sizes.

Use ordinary HTML `figure`/`img`/`figcaption` for new images. Images sit at full column width with square corners. Give every informative image meaningful alt text, and store its asset under `public/design` or another appropriate public directory.
