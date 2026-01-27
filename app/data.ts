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

export const SUMMARY = `Building an AI platform that replaces cloud architects. 20-agent system, real-time sync, shipping soon.`

export const EXPERIENCE = [
  {
    id: 'omni-rpa',
    companies: [
      { name: 'Omni RPA Inc', location: 'San Jose' },
      { name: 'Agentic Solutions Pvt Ltd', location: 'Hyderabad' },
    ],
    position: 'Founding Software Engineer',
    focus: 'AI & Backend Systems',
    period: 'Jan 2025 – Present',
    description: [
      {
        short: 'Core AI backend for chat-to-infrastructure',
        full: 'Core AI backend for chat-to-infrastructure — configure AWS/Azure/GCP via conversation, deploy in one click. First enterprise client onboarded.',
      },
      {
        short: '20+ agent orchestration system',
        full: '20+ agent orchestration: tool calling, RAG retrieval, shared context graph synced across all sessions.',
      },
      {
        short: 'Real-time sync layer with websockets',
        full: 'Real-time sync layer — websockets keep chat, cost calculator, and UI in lockstep. Sub-second latency.',
      },
      {
        short: 'Hybrid graph DB and async doc pipeline',
        full: 'Hybrid graph DB (Neo4j + FalkorDB), async doc pipeline processing 100k+ PDFs, custom eval framework.',
      },
      {
        short: 'Own 3-5 repos, lead cross-team work',
        full: 'Own 3-5 repos end-to-end. Lead cross-team work, mentor engineers, demo to clients, sync with founders daily.',
      },
    ],
  },
] as const

export const PROJECTS = [
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
