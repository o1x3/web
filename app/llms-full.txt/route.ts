export const dynamic = 'force-static'

const BODY = `# Karthik Vinayan

> Applied AI Engineer at Clueso (YC W23), based in Bengaluru. Previously Founding AI Engineer at Omni RPA, where I built the backend for a production AI cloud automation platform from zero: multi-agent orchestrator, knowledge graph infra, MCP tooling, semantic memory.

- Name: Karthik Vinayan
- Title: Applied AI Engineer
- Current company: Clueso (YC W23)
- Location: Bengaluru, IN
- Email: karthik@o1x3.com
- Website: https://o1x3.com
- GitHub: https://github.com/o1x3 (also https://github.com/karthikvinayan)
- X: https://x.com/pawnsloth
- LinkedIn: https://linkedin.com/in/karthik-vinayan

## Summary

Building AI at Clueso (YC W23). Previously built the backend for a production AI cloud automation platform: multi-agent orchestrator, knowledge graph infra, MCP, semantic memory, all from zero.

## Experience

### Clueso  -  Applied AI Engineer

Bengaluru. May 2026 – Present.

- Building AI at Clueso (YC W23): an AI video and docs platform. Agents study your product, draft the script, drive a browser through the flow to capture it, edit the result, and re-render when the code ships.

### Omni RPA Inc (San Jose) / Agentic Solutions Pvt Ltd (Hyderabad)  -  Founding AI Engineer, AI & Backend Systems

Jun 2024 – Apr 2026.

- MCP server and client from scratch. Built while the protocol was 5 weeks old. Tool gating with prerequisite chains, dynamic schema generation, attribute matrix filtering, mandatory reason parameter on every pricing call to kill speculative tool use and create an audit trail.
- DAG-based multi-agent orchestrator. 8 agent types (pricing-researcher, memory-retriever, cost-analyzer, constraint-validator, recommendation-builder, and others). Topological sort, cycle detection, parallel tier execution, WebSocket streaming. Users see a live DAG panel with agents moving through pending/running/completed.
- 8 ambient agents on a separate scheduler. Conflict detection, requirement completeness, workflow recommendations, context summarization, SKU recommendations, service monitoring. Push notifications to UI without the user asking. Plus a graph reasoning agent with 2-round LLM planning and compensation-based rollback on write failures.
- Knowledge graph and RAG stack. 7-stage NATS pipeline for document ingestion with 85–95% of entity extraction handled locally via GLiNER ONNX (no LLM API calls). Neo4j to FalkorDB migration, hybrid retrieval on Weaviate/gRPC, two-layer semantic cache to avoid redundant LLM calls.
- Fine-tuned GGUF model for constraint extraction. DR levels, cost/ops tolerance, region identification. Scikit-learn intent regressor as fast secondary signal. Confidence gating at 0.65 routes low-confidence inputs to a stronger model. Also training in-house LLM on workflow and Terraform data.
- Model routing by task complexity. gpt-5 for complex reasoning, gpt-5-nano for lightweight ops like title generation and context summaries, gpt-4.1-mini for graph manipulation. Not everything needs the expensive model.
- Semantic memory on PostgreSQL with pgvector. Hybrid ranking by similarity + recency + relevance, rolling summarization, personalized welcome prompts for returning users. Agents remember past conversations.
- OTel tracing and cost attribution. Cross-service tracing with session-ID propagation, PostHog cost attribution per user/session/agent, model benchmarking across GPT/Gemini/Claude/Llama.
- Onboarded first enterprise client pre-launch. Hands-on usage, bug filing, iterated on agent behavior and UX across 32 deployment workflows (multi-region DR, HIPAA/PCI-DSS, EKS, ML platforms).
- Own 3–5 repos end-to-end, primary on-call. 2hr worst-case recovery. Lead work across frontend, data, Java backend, and DevOps in a 10-person remote team.

### Digital University of Kerala  -  Research Intern, Computer Vision

Kerala. Oct 2023 – Dec 2023.

- Real-time crop ripeness detection with YOLOv8. Built real-time crop ripeness detection system using YOLOv8 fine-tuned on proprietary agricultural dataset; deployed to production.

## Projects

### podspawn

Go, AGPL-3.0. Docs: https://podspawn.dev  -  Source: https://github.com/podspawn/podspawn

One-command dev environments, locally or over SSH. Single binary, Docker-backed with composable Podfile config, branch-isolated workspaces, native sshd integration, gVisor sandboxing, and a session control plane with actor-scoped audit.

### ergo

TypeScript, Bun. Source: https://github.com/o1x3/ergo

Local-first AI code review. Bring your own ChatGPT or Codex subscription: it runs your linters, feeds the findings to the model, and prints the verdict as TUI, JSON, SARIF, or markdown with the token bill attached.

### dcon

Go, Homebrew. Source: https://github.com/o1x3/dcon

Drop-in docker CLI for macOS backed by Apple's container runtime. Speak docker, execute on per-container lightweight VMs. Warm-pool pre-boot takes container start from ~700ms to ~90ms; ships as a ~6MB static binary.

### furl

Rust. Source: https://github.com/o1x3/furl  -  crates.io: https://crates.io/crates/furl-http

HTTP client with human syntax: name=value builds JSON, \`:\` sets headers, \`@\` uploads files. Three binaries (furl, furls for HTTPS-default, furl-manager).

### tmax

Go. Source: https://github.com/o1x3/tmax

Pastel, neofetch-style terminal card for AI coding-harness token usage (Claude Code, Codex, pi.dev). Bubble Tea + Lipgloss, adapts to light/dark terminals, reads local session logs only.

### keiki

Bun, Docker, Postgres.

Self-hosted observability for Claude Code and Codex. One docker compose command stands up the dashboard; a proxy captures every request, token, dollar, and tool call into your own database. Nothing leaves your network.

### clip

Python, FastAPI, Bun.

A public podcast in, a who-said-what transcript out. Speaker-attributed, word-timestamped transcripts through pyannote diarization or AssemblyAI, driven from a FastAPI and Bun control plane.

### gala

Astro, Supabase, Cloudflare R2.

Drop a photo in Dropbox; the portfolio updates itself. An hourly GitHub Action extracts EXIF, geocodes the city, and optimizes each shot; images stream straight from R2's CDN.

### lunel

Rust, Expo, WIP. Source: https://github.com/o1x3/lunel

AI-powered mobile IDE and cloud dev platform: a Rust PTY server underneath, an Expo app on top.

### nx

Go. Source: https://github.com/o1x3/nx

Personal dev CLI. Pretty git stats across every repo in a folder at once. Concurrent fetching, auto-detected default branches, self-updating.

### sentinel

Swift. Source: https://github.com/o1x3/sentinel

2FA app for iOS. Codes live on the device.

### juno

TypeScript, Bun, WIP. Source: https://github.com/o1x3/juno

Local coding agent in the terminal. Bun + Ink TUI, append-only JSONL session log with resume, plan/exec mode split with read-only tools in plan mode, OAuth + API-key auth with automatic routing between the OpenAI SDK and the ChatGPT Codex backend.

### Tenso

Rust, SolidJS, MIT. Source: https://github.com/PatchPerson/Tenso

Postman alternative built with Tauri 2.0 and SolidJS. Real-time team sync, WebSocket client, sandboxed JS scripting, cURL and OpenAPI import.

### hn

Next.js, TypeScript, MIT. Source: https://github.com/o1x3/hn-web

Hacker News client. Next.js 15 + RSC, encrypted iron-session cookies, writes proxied through news.ycombinator.com with per-request CSRF token scraping and 500ms rate limiting, IndexedDB store with fuzzy-anchor highlight relocation, recursive collapsible threads, reply inbox, reader mode.

### ctoken

MIT. Source: https://github.com/o1x3/ctoken  -  PyPI: https://pypi.org/project/ctoken

OpenAI API cost estimation library. Supports all models, streaming, caching breakdown.

## Side Projects

### iOS Apps

Swift, SwiftUI, WIP. Two apps with on-device AI using Apple Foundation Models. Shipping Q1 2026.

### Crop Ripeness Detection

Python, YOLOv8, Research. Real-time detection fine-tuned on agricultural dataset; deployed at Digital University Kerala.

## Publication

### Automated Medicine Delivery System for Hospitals

Springer LNNS, 2025. DOI: 10.1007/978-981-96-3652-5_40  -  https://doi.org/10.1007/978-981-96-3652-5_40

Led team building Raspberry Pi autonomous robot with obstacle detection, path following, and RFID room ID.

## Skills

- Languages: Python, Go, Rust, TypeScript, SQL, Java
- Backend: FastAPI, WebSockets, NATS JetStream, Event-Driven Architecture
- AI & ML: Multi-Agent Orchestration, MCP Protocol, RAG, Semantic Caching, LLM Tool Calling, Eval Frameworks, pgvector, vLLM, llama.cpp
- Databases: FalkorDB, Neo4j, Weaviate, Supabase (Postgres), Redis
- Cloud & DevOps: AWS (CCP), Azure (AZ-104), GCP, Docker, Kubernetes, OpenTelemetry

## Education

### Vellore Institute of Technology (VIT Chennai)

B.Tech CSE, AI & ML Specialization. Sep 2021 – Aug 2025.
`

export function GET() {
  return new Response(BODY, {
    headers: {
      'content-type': 'text/plain; charset=utf-8',
      'cache-control': 'public, max-age=3600, must-revalidate',
    },
  })
}
