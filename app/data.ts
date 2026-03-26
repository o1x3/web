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
        full: 'Built the entire MCP implementation from scratch. Tool gating with prerequisite chains, dynamic schema conversion, attribute matrix filtering, value validation against live session state.',
      },
      {
        short: 'Knowledge graph and RAG infra',
        full: 'Own the entire knowledge graph stack. Neo4j to FalkorDB migration, hybrid RAG on Weaviate with gRPC, two-layer semantic cache (Redis + RedisVL), event-driven ingestion pipeline on NATS.',
      },
      {
        short: 'DAG-based multi-agent orchestrator',
        full: '8 agent types, topological sort with cycle detection, parallel execution, dependency injection, persistence, WebSocket streaming.',
      },
      {
        short: 'Semantic memory on PostgreSQL with pgvector',
        full: 'Embedding-based retrieval, rolling summarization, optimistic concurrency control. Runs in background, enables continuity across sessions.',
      },
      {
        short: 'Performance engineering across services',
        full: 'Database indexing, bulk operations, L1/L2 cache layering, parallel graph calls, redundant query elimination.',
      },
      {
        short: 'Own 3-5 repos end-to-end, primary on-call',
        full: 'Manage all PRs/issues, containerize services, ship to production. 2hr worst-case incident recovery.',
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
    items: ['FastAPI', 'MCP Protocol', 'Websockets', 'NATS JetStream', 'Event-Driven Architecture'],
  },
  aiml: {
    label: 'AI & ML',
    items: ['Multi-Agent Orchestration', 'RAG Pipelines', 'Semantic Caching', 'LLM Tool Calling', 'pgvector'],
  },
  databases: {
    label: 'Databases',
    items: ['Neo4j', 'FalkorDB', 'Supabase (Postgres)', 'Redis', 'Weaviate'],
  },
  cloud: {
    label: 'Cloud & DevOps',
    items: ['AWS (CCP)', 'Azure (AZ-104)', 'GCP', 'Docker', 'Kubernetes', 'Grafana', 'OpenTelemetry'],
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
