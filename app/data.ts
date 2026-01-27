// Portfolio Data Constants
// Single source of truth for all portfolio content - sourced from main.tex

export const PERSONAL_INFO = {
  name: 'Karthik Vinayan',
  title: 'Founding Software Engineer',
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

export const SUMMARY = `Founding engineer who built the AI backend for a cloud automation platform from ground zero — now weeks from launch. Own a 20-agent orchestration system, real-time sync architecture, and full ML infrastructure. Lead code reviews, mentor engineers, and sync daily with founders. Thrive on bleeding-edge problems and fast iteration.`

export const EXPERIENCE = [
  {
    id: 'omni-rpa',
    company: 'Omni RPA Inc / Agentic Solutions Pvt Ltd',
    location: 'San Jose / Hyderabad',
    position: 'Founding Software Engineer — AI & Backend Systems',
    period: 'Jan 2025 – Present',
    periodShort: '2025–Pres',
    description: [
      'Built core AI backend from scratch for a platform replacing cloud architects — users configure AWS/Azure/GCP infrastructure via chat while context graph and cost calculator update live; one-click deployment. Onboarded first enterprise client (Arrcus Cloud); launching publicly in weeks.',
      'Architected 20+ agent system: main orchestration agent coordinates tool calling, function execution, and RAG retrieval while ambient agents maintain shared context graph consistency across all user interactions in real-time.',
      'Built "hive mind" sync layer — websockets and event-driven architecture keep chat, context graph, live cost calculator, and UI synchronized; sub-second latency throughout.',
      'Designed hybrid graph architecture (Neo4j + FalkorDB) powering millions of nodes with sub-2s query latency; built orchestration layer over cloud SKU pricing APIs serving millions of data points to agents.',
      'Built async document ingestion pipeline (Python, NATS JetStream) processing hundreds of thousands of PDF pages into searchable knowledge graph for RAG; manage Supabase for session storage; built custom eval framework.',
      'Own 3-5 repositories end-to-end: manage all PRs/issues, containerize and ship to production, on-call for incidents. Debugged through countless production issues to reach stable operation.',
      'Lead cross-functional work across every team (frontend, data, Java backend, DevOps); mentored 2 interns, onboarded engineers, write technical specs. Demo to clients; sync daily with founders.',
    ],
  },
] as const

export const PROJECTS = [
  {
    id: 'ctoken',
    title: 'ctoken',
    url: 'https://github.com/o1x3/ctoken',
    description: 'OpenAI API cost estimation library published on PyPI. Supports all models, streaming, caching breakdown. MIT licensed, CI/CD, full test suite.',
  },
  {
    id: 'ios-apps',
    title: 'iOS Apps (In Development)',
    description: 'Building two apps with on-device AI using Apple Foundation Models: health/fitness tracker and personal finance manager. Shipping Q1 2026.',
  },
  {
    id: 'crop-detection',
    title: 'Crop Ripeness Detection (Research Intern)',
    description: 'Built real-time detection system using YOLOv8 fine-tuned on proprietary agricultural dataset; deployed to production at Digital University of Kerala.',
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
  certifications: {
    label: 'Certifications',
    items: ['AWS Certified Cloud Practitioner', 'Microsoft Azure Administrator (AZ-104)'],
  },
  languages: {
    label: 'Languages',
    items: ['Python', 'SQL', 'C', 'C++', 'Java', 'Swift (learning)'],
  },
  aiml: {
    label: 'AI/ML',
    items: ['Multi-Agent Systems', 'LLM Orchestration', 'Tool/Function Calling', 'RAG', 'Eval Frameworks', 'MCP', 'PyTorch'],
  },
  backend: {
    label: 'Backend',
    items: ['Async Python', 'Websockets', 'Event-Driven', 'FastAPI', 'NATS', 'Neo4j', 'FalkorDB', 'Supabase', 'Redis'],
  },
  cloud: {
    label: 'Cloud & DevOps',
    items: ['AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'CI/CD'],
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
