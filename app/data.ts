// Portfolio Data Constants
// Single source of truth for all portfolio content - sourced from main.tex

export const PERSONAL_INFO = {
  name: 'Karthik Vinayan',
  title: 'AI Platform Engineer',
  currentCompany: 'Omni RPA Inc',
  email: 'karthikvinayan57@gmail.com',
  location: 'Hyderabad, IN',
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
} as const

export const SUMMARY = `Built the backend for a production AI cloud automation platform. Multi-agent orchestrator, knowledge graph infra, MCP, semantic memory — all from zero.`

export const EXPERIENCE = [
  {
    id: 'omni-rpa',
    companies: [
      { name: 'Omni RPA Inc', location: 'San Jose' },
      { name: 'Agentic Solutions Pvt Ltd', location: 'Hyderabad' },
    ],
    position: 'AI Platform Engineer',
    focus: 'AI & Backend Systems',
    period: 'Jan 2024 – Present',
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

export const PROJECTS = [
  {
    id: 'podspawn',
    title: 'podspawn',
    badges: [
      { label: 'Docs', url: 'https://podspawn.dev' },
      { label: 'GitHub', url: 'https://github.com/podspawn/podspawn' },
      { label: 'Go' },
      { label: 'AGPL-3.0' },
    ],
    url: 'https://podspawn.dev',
    description: 'One-command dev environments, locally or over SSH. Single binary, Docker-backed with composable Podfile config, companion services, native sshd integration, gVisor sandboxing, and Prometheus metrics.',
  },
  {
    id: 'tenso',
    title: 'Tenso',
    badges: [
      { label: 'GitHub', url: 'https://github.com/PatchPerson/Tenso' },
      { label: 'Rust' },
      { label: 'SolidJS' },
      { label: 'MIT' },
    ],
    url: 'https://github.com/PatchPerson/Tenso',
    description: 'Postman alternative built with Tauri 2.0 and SolidJS. Real-time team sync, WebSocket client, sandboxed JS scripting, cURL and OpenAPI import.',
  },
  {
    id: 'ctoken',
    title: 'ctoken',
    badges: [
      { label: 'GitHub', url: 'https://github.com/o1x3/ctoken' },
      { label: 'PyPI', url: 'https://pypi.org/project/ctoken' },
      { label: 'MIT' },
    ],
    url: 'https://github.com/o1x3/ctoken',
    description: 'OpenAI API cost estimation library. Supports all models, streaming, caching breakdown.',
  },
] as const

export const SIDE_PROJECTS = [
  {
    id: 'ios-apps',
    title: 'iOS Apps',
    badges: [
      { label: 'Swift' },
      { label: 'SwiftUI' },
      { label: 'WIP' },
    ],
    description: 'Two apps with on-device AI using Apple Foundation Models. Shipping Q1 2026.',
  },
  {
    id: 'crop-detection',
    title: 'Crop Ripeness Detection',
    badges: [
      { label: 'Python' },
      { label: 'YOLOv8' },
      { label: 'Research' },
    ],
    description: 'Real-time detection fine-tuned on agricultural dataset; deployed at Digital University Kerala.',
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
