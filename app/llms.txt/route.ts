export const dynamic = 'force-static'

const BODY = `# Karthik Vinayan

> Applied AI Engineer at Clueso (YC W23), based in Bengaluru. Previously Founding AI Engineer at Omni RPA, where I built the backend for a production AI cloud automation platform from zero — multi-agent orchestrator, knowledge graph infra, MCP tooling, semantic memory.

I work across AI systems and backend infrastructure: LLM agents, multi-agent orchestration, the Model Context Protocol, retrieval and knowledge graphs, and the serving stack underneath them. Primary languages are Python, Go, and Rust. This file is a map of who I am and what I've built — the linked pages have the detail.

## Profile

- [Portfolio](https://o1x3.com): Single-page site with full experience, projects, publication, and skills.
- [GitHub (@o1x3)](https://github.com/o1x3): Personal repos — juno, hn, ctoken, and more.
- [LinkedIn](https://linkedin.com/in/karthik-vinayan): Professional history.
- Email: karthik@o1x3.com

## Experience

- [Clueso (YC W23)](https://clueso.io): Applied AI Engineer, May 2026–present. AI that turns screen recordings into polished product videos and step-by-step docs.
- Omni RPA / Agentic Solutions: Founding AI Engineer, Jun 2024–Apr 2026. Built an MCP server/client when the protocol was 5 weeks old, a DAG-based multi-agent orchestrator (8 agent types, topological scheduling, WebSocket streaming), 8 ambient agents on a separate scheduler, a 7-stage NATS knowledge-graph + RAG pipeline (GLiNER ONNX local extraction, FalkorDB, Weaviate), fine-tuned GGUF constraint extraction, model routing by task complexity, and semantic memory on Postgres/pgvector. Onboarded the first enterprise client pre-launch; primary on-call.
- Digital University of Kerala: Research Intern, Oct–Dec 2023. Real-time crop ripeness detection with YOLOv8, deployed to production.

## Projects

- [podspawn](https://podspawn.dev): One-command dev environments, locally or over SSH. Single Go binary, Docker-backed, composable Podfile config, branch-isolated workspaces, native sshd, gVisor sandboxing, actor-scoped audit. AGPL-3.0. [Source](https://github.com/podspawn/podspawn).
- [juno](https://github.com/o1x3/juno): Local coding agent in the terminal. Bun + Ink TUI, append-only JSONL session log with resume, plan/exec split, OAuth + API-key auth routing between the OpenAI SDK and the ChatGPT Codex backend. TypeScript, WIP.
- [Tenso](https://github.com/PatchPerson/Tenso): Postman alternative on Tauri 2.0 + SolidJS. Real-time team sync, WebSocket client, sandboxed JS scripting, cURL/OpenAPI import. Rust, MIT.
- [hn](https://github.com/o1x3/hn-web): Hacker News client. Next.js 15 + RSC, encrypted iron-session cookies, CSRF-scraped write proxy, IndexedDB store with fuzzy-anchor highlight relocation, recursive collapsible threads. MIT.
- [ctoken](https://github.com/o1x3/ctoken): OpenAI API cost-estimation library — all models, streaming, caching breakdown. [PyPI](https://pypi.org/project/ctoken). MIT.

## Publication

- [Automated Medicine Delivery System for Hospitals](https://doi.org/10.1007/978-981-96-3652-5_40): Springer LNNS, 2025. Led a team building a Raspberry Pi autonomous robot with obstacle detection, path following, and RFID room ID.

## Optional

- [llms-full.txt](https://o1x3.com/llms-full.txt): The complete resume content inline — every experience bullet, skill, and project detail in one document.
`

export function GET() {
  return new Response(BODY, {
    headers: {
      'content-type': 'text/plain; charset=utf-8',
      'cache-control': 'public, max-age=3600, must-revalidate',
    },
  })
}
