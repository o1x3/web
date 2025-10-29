// Portfolio Data Constants
// Single source of truth for all portfolio content

export const BREAKPOINTS = {
  MOBILE: 768,
} as const

export const PERSONAL_INFO = {
  name: 'Karthik Vinayan',
  title: 'Founding Software Engineer',
  currentCompany: 'Omni RPA Inc',
  email: 'karthikvinayan57@gmail.com',
  location: 'Hyderabad, IN',
  linkedin: {
    url: 'https://linkedin.com/in/karthik-vinayan',
    display: 'linkedin.com/in/karthik-vinayan',
  },
  website: 'o1x3.com',
} as const

export const EXPERIENCE = [
  {
    id: 'omni-rpa',
    company: 'Omni RPA Inc',
    position: 'Founding Software Engineer',
    location: 'San Jose, CA',
    period: 'Jun 2024 - Present',
    periodShort: '2024-Present',
    description: [
      'Built agentic AI systems with LLMs and NebulaGraph-based Knowledge Graph for CSP-focused automation',
      'Developed large-scale Knowledge Graphs with custom ETL pipelines and optimized graph query performance',
      'Designed RESTful APIs and MCP servers to coordinate multi-agent workflows and backend systems',
      'Led DevOps: Docker containerization, Kubernetes deployments, CI/CD pipelines for testing and versioning',
      'Architected end-to-end enterprise automation platforms with technical proposals and PoC demos',
    ],
    descriptionShort: 'Agentic AI with LLMs, Knowledge Graphs, and enterprise automation',
  },
  {
    id: 'duk',
    company: 'Digital University of Kerala',
    position: 'Research Intern',
    location: 'Thiruvananthapuram, IN',
    period: 'Oct 2023 - Dec 2023',
    periodShort: '2023',
    description: [
      'Engineered YOLOv8 model for real-time tomato ripeness detection in production environment',
    ],
    descriptionShort: 'YOLOv8 computer vision for tomato detection',
  },
] as const

export const EDUCATION = [
  {
    id: 'vit',
    institution: 'Vellore Institute of Technology',
    institutionShort: 'VIT Chennai',
    degree: 'B.Tech Computer Science and Engineering',
    degreeShort: 'B.Tech CS - AI & ML',
    specialization: 'Artificial Intelligence and Machine Learning',
    location: 'Chennai, IN',
    period: 'Sep 2021 - Aug 2025',
  },
  {
    id: 'stcs',
    institution: 'St. Thomas Central School',
    institutionShort: 'STCS',
    degree: 'AISSCE - PCM with Computer Science',
    degreeShort: 'AISSCE - PCM with CS',
    location: 'Thiruvananthapuram, IN',
    period: 'Jun 2009 - Mar 2021',
  },
] as const

export const SKILLS = {
  programming: {
    label: 'Languages',
    items: ['Python (Pandas, NumPy, TensorFlow, PyTorch)', 'C', 'C++', 'Java', 'SQL'],
  },
  aiml: {
    label: 'AI/ML',
    items: ['TensorFlow', 'PyTorch', 'LLMs', 'Computer Vision', 'Machine Learning'],
  },
  cloud: {
    label: 'Data & Cloud',
    items: ['BigQuery', 'AWS', 'Azure (AZ-104)', 'GCP'],
  },
  tools: {
    label: 'Dev Tools',
    items: ['Git', 'Docker', 'RESTful APIs', 'Flask', 'RAG', 'GraphDBs'],
  },
} as const

export const CERTIFICATIONS = [
  'Azure AZ-104 Administrator',
  'AWS Cloud Practitioner',
] as const

export const SIDEQUESTS = [
  {
    id: 'data-eng',
    title: 'Python Data Engineering Consultant',
    items: [
      'Custom web scraping pipelines + Flask REST APIs for client integration',
      'Pandas-based ETL pipelines for data cleaning and transformation',
      'Automated deployment with continuous data synchronization',
    ],
  },
  {
    id: 'adas',
    title: 'ADAS Prototype Development',
    items: [
      'Led team building Raspberry Pi-based ADAS buggy with lane following and object detection',
      'Adapted technology for hospital environment (publication pending)',
    ],
  },
  {
    id: 'ai-experiments',
    title: 'ML & AI Experiments',
    items: [
      'Loan default prediction with feature engineering + AWS deployment',
      'Neural style transfer with GPU-accelerated CUDA processing',
      'Multi-agent chat platform with vector DB and real-time WebSockets',
    ],
  },
] as const

export const QUICK_INFO = {
  stack: 'Python • ML • Cloud',
  experience: '1.5+ Years',
  location: PERSONAL_INFO.location,
} as const

export const RECENT_WORK = [
  {
    id: 'llm-agents',
    title: 'LLM Agent Workflows',
    description: 'NebulaGraph + contextual adaptation',
  },
  {
    id: 'cv',
    title: 'Computer Vision',
    description: 'YOLOv8 tomato detection',
  },
] as const
