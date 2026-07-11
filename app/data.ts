// Portfolio Data Constants
// Single source of truth for all portfolio content - sourced from main.tex

export const PERSONAL_INFO = {
  name: 'Karthik Vinayan',
  title: 'Applied AI Engineer',
  currentCompany: 'Clueso',
  email: 'karthik@o1x3.com',
  location: 'Bengaluru, IN',
  github: {
    url: 'https://github.com/o1x3',
    display: 'github',
  },
  linkedin: {
    url: 'https://linkedin.com/in/karthik-vinayan',
    display: 'linkedin',
  },
  website: {
    url: 'https://o1x3.com',
    display: 'o1x3.com',
  },
  x: {
    url: 'https://x.com/pawnsloth',
    display: '@pawnsloth',
  },
  githubAccounts: ['o1x3', 'karthikvinayan'],
} as const

export const TAGLINES = [
  'applied ai engineer',
  'builds agents for a living',
  'ships CLIs for fun',
  'terminal dweller',
  'infra from zero, twice',
] as const

export const SUMMARY = `Building AI at Clueso (YC W23). Previously built the backend for a production AI cloud automation platform — multi-agent orchestrator, knowledge graph infra, MCP, semantic memory, all from zero.`

export const EXPERIENCE = [
  {
    id: 'clueso',
    companies: [
      { name: 'Clueso', location: 'Bengaluru', url: 'https://clueso.io' },
    ],
    position: 'Applied AI Engineer',
    period: 'May 2026 – Present',
    description: [
      {
        short: 'Building AI at Clueso (YC W23)',
        full: 'AI that turns screen recordings into polished product videos and step-by-step docs.',
      },
    ],
  },
  {
    id: 'omni-rpa',
    companies: [
      { name: 'Omni RPA Inc', location: 'San Jose' },
      { name: 'Agentic Solutions Pvt Ltd', location: 'Hyderabad' },
    ],
    position: 'Founding AI Engineer',
    focus: 'AI & Backend Systems',
    period: 'Jun 2024 – Apr 2026',
    description: [
      {
        short: 'MCP server and client from scratch',
        full: 'Built while the protocol was 5 weeks old. Tool gating with prerequisite chains, dynamic schema generation, attribute matrix filtering, mandatory reason parameter on every pricing call to kill speculative tool use and create an audit trail.',
      },
      {
        short: 'DAG-based multi-agent orchestrator',
        full: '8 agent types (pricing-researcher, memory-retriever, cost-analyzer, constraint-validator, recommendation-builder, and others). Topological sort, cycle detection, parallel tier execution, WebSocket streaming. Users see a live DAG panel with agents moving through pending/running/completed.',
      },
      {
        short: '8 ambient agents on a separate scheduler',
        full: 'Conflict detection, requirement completeness, workflow recommendations, context summarization, SKU recommendations, service monitoring. Push notifications to UI without the user asking. Plus a graph reasoning agent with 2-round LLM planning and compensation-based rollback on write failures.',
      },
      {
        short: 'Knowledge graph and RAG stack',
        full: '7-stage NATS pipeline for document ingestion with 85–95% of entity extraction handled locally via GLiNER ONNX (no LLM API calls). Neo4j to FalkorDB migration, hybrid retrieval on Weaviate/gRPC, two-layer semantic cache to avoid redundant LLM calls.',
      },
      {
        short: 'Fine-tuned GGUF model for constraint extraction',
        full: 'DR levels, cost/ops tolerance, region identification. Scikit-learn intent regressor as fast secondary signal. Confidence gating at 0.65 routes low-confidence inputs to a stronger model. Also training in-house LLM on workflow and Terraform data.',
      },
      {
        short: 'Model routing by task complexity',
        full: 'gpt-5 for complex reasoning, gpt-5-nano for lightweight ops like title generation and context summaries, gpt-4.1-mini for graph manipulation. Not everything needs the expensive model.',
      },
      {
        short: 'Semantic memory on PostgreSQL with pgvector',
        full: 'Hybrid ranking by similarity + recency + relevance, rolling summarization, personalized welcome prompts for returning users. Agents remember past conversations.',
      },
      {
        short: 'OTel tracing and cost attribution',
        full: 'Cross-service tracing with session-ID propagation, PostHog cost attribution per user/session/agent, model benchmarking across GPT/Gemini/Claude/Llama.',
      },
      {
        short: 'Onboarded first enterprise client pre-launch',
        full: 'Hands-on usage, bug filing, iterated on agent behavior and UX across 32 deployment workflows (multi-region DR, HIPAA/PCI-DSS, EKS, ML platforms).',
      },
      {
        short: 'Own 3–5 repos end-to-end, primary on-call',
        full: '2hr worst-case recovery. Lead work across frontend, data, Java backend, and DevOps in a 10-person remote team.',
      },
    ],
  },
  {
    id: 'duk',
    companies: [
      { name: 'Digital University of Kerala', location: 'Kerala' },
    ],
    position: 'Research Intern',
    focus: 'Computer Vision',
    period: 'Oct 2023 – Dec 2023',
    description: [
      {
        short: 'Real-time crop ripeness detection with YOLOv8',
        full: 'Built real-time crop ripeness detection system using YOLOv8 fine-tuned on proprietary agricultural dataset; deployed to production.',
      },
    ],
  },
] as const

// Everything I build, grouped for the /stuff page. `featured` items also
// surface on the home page.
export type Build = {
  id: string
  title: string
  year: string
  group: 'tools' | 'web & apps' | 'odd ones'
  featured?: boolean
  badges: readonly { label: string; url?: string }[]
  url?: string
  description: string
}

export const BUILDS: readonly Build[] = [
  {
    id: 'podspawn',
    title: 'podspawn',
    year: '2026',
    group: 'tools',
    featured: true,
    badges: [
      { label: 'Docs', url: 'https://podspawn.dev' },
      { label: 'GitHub', url: 'https://github.com/podspawn/podspawn' },
      { label: 'Go' },
      { label: 'AGPL-3.0' },
    ],
    url: 'https://podspawn.dev',
    description:
      'One-command dev environments, locally or over SSH. Single binary, Docker-backed with composable Podfile config, branch-isolated workspaces, native sshd integration, gVisor sandboxing, and a session control plane with actor-scoped audit.',
  },
  {
    id: 'ergo',
    title: 'ergo',
    year: '2026',
    group: 'tools',
    featured: true,
    badges: [
      { label: 'GitHub', url: 'https://github.com/o1x3/ergo' },
      { label: 'TypeScript' },
      { label: 'Bun' },
    ],
    url: 'https://github.com/o1x3/ergo',
    description:
      'Local-first AI code review. Bring your own ChatGPT or Codex subscription: it runs your linters, feeds the findings to the model, and prints the verdict as TUI, JSON, SARIF, or markdown with the token bill attached.',
  },
  {
    id: 'dcon',
    title: 'dcon',
    year: '2026',
    group: 'tools',
    featured: true,
    badges: [
      { label: 'GitHub', url: 'https://github.com/o1x3/dcon' },
      { label: 'Go' },
      { label: 'Homebrew' },
    ],
    url: 'https://github.com/o1x3/dcon',
    description:
      "Drop-in docker CLI for macOS backed by Apple's container runtime. Speak docker, execute on per-container lightweight VMs. Warm-pool pre-boot takes container start from ~700ms to ~90ms; ships as a ~6MB static binary.",
  },
  {
    id: 'hn',
    title: 'hn',
    year: '2026',
    group: 'web & apps',
    featured: true,
    badges: [
      { label: 'GitHub', url: 'https://github.com/o1x3/hn-web' },
      { label: 'Next.js' },
      { label: 'TypeScript' },
      { label: 'MIT' },
    ],
    url: 'https://github.com/o1x3/hn-web',
    description:
      'Hacker News client. Next.js 15 + RSC, encrypted iron-session cookies, writes proxied through news.ycombinator.com with per-request CSRF token scraping and 500ms rate limiting, IndexedDB store with fuzzy-anchor highlight relocation, recursive collapsible threads, reply inbox, reader mode.',
  },
  {
    id: 'juno',
    title: 'juno',
    year: '2026',
    group: 'tools',
    badges: [
      { label: 'GitHub', url: 'https://github.com/o1x3/juno' },
      { label: 'TypeScript' },
      { label: 'Bun' },
      { label: 'WIP' },
    ],
    url: 'https://github.com/o1x3/juno',
    description:
      'Local coding agent in the terminal. Bun + Ink TUI, append-only JSONL session log with resume, plan/exec mode split with read-only tools in plan mode, OAuth + API-key auth with automatic routing between the OpenAI SDK and the ChatGPT Codex backend.',
  },
  {
    id: 'furl',
    title: 'furl',
    year: '2026',
    group: 'tools',
    badges: [
      { label: 'GitHub', url: 'https://github.com/o1x3/furl' },
      { label: 'crates.io', url: 'https://crates.io/crates/furl-http' },
      { label: 'Rust' },
    ],
    url: 'https://github.com/o1x3/furl',
    description:
      'HTTP client with human syntax: name=value builds JSON, `:` sets headers, `@` uploads files. Three binaries (furl, furls for HTTPS-default, furl-manager), published to crates.io.',
  },
  {
    id: 'tmax',
    title: 'tmax',
    year: '2026',
    group: 'tools',
    badges: [
      { label: 'GitHub', url: 'https://github.com/o1x3/tmax' },
      { label: 'Go' },
    ],
    url: 'https://github.com/o1x3/tmax',
    description:
      'Pastel, neofetch-style terminal card for AI coding-harness token usage (Claude Code, Codex, pi.dev). Bubble Tea + Lipgloss, adapts to light/dark terminals, reads local session logs so nothing leaves the machine.',
  },
  {
    id: 'nx',
    title: 'nx',
    year: '2026',
    group: 'tools',
    badges: [
      { label: 'GitHub', url: 'https://github.com/o1x3/nx' },
      { label: 'Go' },
    ],
    url: 'https://github.com/o1x3/nx',
    description:
      'Personal dev CLI. Pretty git stats across every repo in a folder at once. Concurrent fetching, auto-detected default branches, GoReleaser self-updates, intentionally no Cobra.',
  },
  {
    id: 'ctoken',
    title: 'ctoken',
    year: '2025',
    group: 'tools',
    badges: [
      { label: 'GitHub', url: 'https://github.com/o1x3/ctoken' },
      { label: 'PyPI', url: 'https://pypi.org/project/ctoken' },
      { label: 'MIT' },
    ],
    url: 'https://github.com/o1x3/ctoken',
    description:
      'OpenAI API cost estimation library. Supports all models, streaming, caching breakdown.',
  },
  {
    id: 'tenso',
    title: 'Tenso',
    year: '2025',
    group: 'web & apps',
    badges: [
      { label: 'GitHub', url: 'https://github.com/PatchPerson/Tenso' },
      { label: 'Rust' },
      { label: 'SolidJS' },
      { label: 'MIT' },
    ],
    url: 'https://github.com/PatchPerson/Tenso',
    description:
      'Postman alternative built with Tauri 2.0 and SolidJS. Real-time team sync, WebSocket client, sandboxed JS scripting, cURL and OpenAPI import.',
  },
  {
    id: 'sentinel',
    title: 'sentinel',
    year: '2026',
    group: 'web & apps',
    badges: [
      { label: 'GitHub', url: 'https://github.com/o1x3/sentinel' },
      { label: 'Swift' },
    ],
    url: 'https://github.com/o1x3/sentinel',
    description: '2FA app for iOS. Codes live on the device.',
  },
  {
    id: 'ios-apps',
    title: 'iOS apps',
    year: '2026',
    group: 'odd ones',
    badges: [{ label: 'Swift' }, { label: 'SwiftUI' }, { label: 'WIP' }],
    description:
      'Two apps with on-device AI using Apple Foundation Models. Shipping when they stop embarrassing me.',
  },
  {
    id: 'crop-detection',
    title: 'crop ripeness detection',
    year: '2023',
    group: 'odd ones',
    badges: [{ label: 'Python' }, { label: 'YOLOv8' }, { label: 'Research' }],
    description:
      'Real-time detection fine-tuned on a proprietary agricultural dataset; deployed at Digital University Kerala.',
  },
] as const

export const PUBLICATION = {
  title: 'Automated Medicine Delivery System for Hospitals',
  venue: 'Springer LNNS, 2025',
  description: 'Led team building Raspberry Pi autonomous robot with obstacle detection, path following, and RFID room ID.',
  doi: '10.1007/978-981-96-3652-5_40',
  doiUrl: 'https://doi.org/10.1007/978-981-96-3652-5_40',
} as const

export const SKILLS = {
  languages: {
    label: 'Languages',
    items: ['Python', 'Go', 'Rust', 'TypeScript', 'SQL', 'Java'],
  },
  backend: {
    label: 'Backend',
    items: ['FastAPI', 'WebSockets', 'NATS JetStream', 'Event-Driven Architecture'],
  },
  aiml: {
    label: 'AI & ML',
    items: ['Multi-Agent Orchestration', 'MCP Protocol', 'RAG', 'Semantic Caching', 'LLM Tool Calling', 'Eval Frameworks', 'pgvector', 'vLLM', 'llama.cpp'],
  },
  databases: {
    label: 'Databases',
    items: ['FalkorDB', 'Neo4j', 'Weaviate', 'Supabase (Postgres)', 'Redis'],
  },
  cloud: {
    label: 'Cloud & DevOps',
    items: ['AWS (CCP)', 'Azure (AZ-104)', 'GCP', 'Docker', 'Kubernetes', 'OpenTelemetry'],
  },
} as const

export const EDUCATION = [
  {
    id: 'vit',
    institution: 'Vellore Institute of Technology',
    institutionShort: 'VIT Chennai',
    degree: 'B.Tech CSE, AI & ML Specialization',
    period: 'Sep 2021 – Aug 2025',
    periodShort: '2021–2025',
  },
] as const
