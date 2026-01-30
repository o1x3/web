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
    period: 'Jan 2024 – Present',
    description: [
      {
        short: 'Core backend from scratch for cloud automation',
        full: 'Built core backend from scratch for cloud automation platform; onboarded first enterprise client pre-launch. Validated 100+ deployment workflows through production testing.',
      },
      {
        short: 'Real-time sync layer with websockets',
        full: 'Designed real-time sync layer using websockets and event-driven architecture; keeps multiple UI components synchronized with sub-second latency.',
      },
      {
        short: 'Hybrid graph DB powering millions of nodes',
        full: 'Architected hybrid graph database system (Neo4j + FalkorDB) powering millions of nodes with sub-second query latency.',
      },
      {
        short: 'Cloud provider SKU pricing orchestration',
        full: 'Built orchestration layer over cloud provider SKU pricing APIs (AWS/Azure/GCP), serving millions of data points to downstream consumers in real-time.',
      },
      {
        short: 'Async doc ingestion pipeline',
        full: 'Built async document ingestion pipeline (Python, NATS JetStream) processing hundreds of thousands of PDF pages into searchable knowledge graph.',
      },
      {
        short: 'Own 3-5 repos, primary on-call engineer',
        full: 'Own 3-5 repositories end-to-end: manage all PRs/issues, containerize services, ship to production. Primary on-call engineer; 2hr worst-case incident recovery.',
      },
      {
        short: 'Infrastructure monitoring with Grafana & PostHog',
        full: 'Manage infrastructure monitoring with Grafana and PostHog (on-premise). Handle Supabase for session storage and Redis for caching.',
      },
      {
        short: 'Lead cross-functional work, mentor engineers',
        full: 'Lead cross-functional work across frontend, data, Java backend, and DevOps teams in a fully remote team of 10. Mentored 2 interns, onboarded engineers, write technical specs.',
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
  languages: {
    label: 'Languages',
    items: ['Python', 'SQL', 'Java', 'C', 'C++'],
  },
  backend: {
    label: 'Backend',
    items: ['Async Python', 'FastAPI', 'Websockets', 'Event-Driven Architecture', 'NATS JetStream'],
  },
  databases: {
    label: 'Databases',
    items: ['Neo4j', 'FalkorDB', 'Supabase (Postgres)', 'Redis'],
  },
  cloud: {
    label: 'Cloud & DevOps',
    items: ['AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'CI/CD', 'Grafana', 'PostHog'],
  },
  certifications: {
    label: 'Certifications',
    items: ['AWS Certified Cloud Practitioner', 'Microsoft Azure Administrator (AZ-104)'],
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
