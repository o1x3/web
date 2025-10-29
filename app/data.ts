// Portfolio Data Constants
// Single source of truth for all portfolio content

export const BREAKPOINTS = {
  MOBILE: 768,
} as const

export const PERSONAL_INFO = {
  name: 'Karthik Vinayan',
  title: 'Software Engineer - AI/ML',
  currentCompany: 'Omni RPA Inc',
  email: 'karthikvinayan57@gmail.com',
  location: 'Hyderabad, IN',
  linkedin: {
    url: 'https://linkedin.com/in/karthik-vinayan',
    display: 'linkedin.com/in/karthik-vinayan',
  },
} as const

export const EXPERIENCE = [
  {
    id: 'omni-rpa',
    company: 'Omni RPA Inc',
    position: 'Software Engineer - AI/ML',
    location: 'San Jose, CA',
    period: 'Jul 2023 - Present',
    periodShort: '2023-Present',
    description: [
      'Custom agentic AI solutions with LLM agents + Knowledge Graph',
      'Modular workflows with domain-specific LLM agents',
    ],
    descriptionShort: 'LLM agents with Knowledge Graph (NebulaGraph)',
  },
  {
    id: 'duk',
    company: 'Digital University of Kerala',
    position: 'Research Intern',
    location: 'Thiruvananthapuram, IN',
    period: 'Oct 2023 - Dec 2023',
    periodShort: '2023',
    description: [
      'YOLOv8 computer vision for real-time tomato ripeness detection',
    ],
    descriptionShort: 'YOLOv8 computer vision for tomato detection',
  },
] as const

export const EDUCATION = [
  {
    id: 'vit',
    institution: 'Vellore Institute of Technology',
    institutionShort: 'VIT Chennai',
    degree: 'B.Tech Computer Science - AI & Machine Learning',
    degreeShort: 'B.Tech CS - AI & Machine Learning',
    location: 'Chennai, IN',
    period: '2021 - 2025',
  },
  {
    id: 'stcs',
    institution: 'St. Thomas Central School',
    degree: 'AISSCE - PCM with CS',
    location: 'Thiruvananthapuram, IN',
    period: '2009 - 2021',
  },
] as const

export const SKILLS = {
  programming: {
    label: 'Programming',
    items: ['Python', 'C++', 'Java', 'SQL'],
  },
  aiml: {
    label: 'AI/ML',
    items: ['TensorFlow', 'PyTorch', 'LLMs', 'Computer Vision'],
  },
  cloud: {
    label: 'Cloud',
    items: ['AWS', 'Azure (AZ-104)', 'GCP', 'BigQuery'],
  },
  tools: {
    label: 'Tools',
    items: ['Docker', 'Git', 'Flask', 'GraphDBs'],
  },
} as const

export const CERTIFICATIONS = [
  'Azure AZ-104',
  'AWS Solutions Architect',
  'TensorFlow Developer',
  'Google Cloud Professional',
] as const

export const PROJECTS = [
  {
    id: 'loan-default',
    title: 'Loan Default Prediction',
    items: [
      'ML model with feature engineering',
      'Credit risk scoring system',
      'AWS deployment with real-time API',
    ],
  },
  {
    id: 'data-eng',
    title: 'Data Engineering Consultant',
    items: [
      'Web scraping pipelines with Flask APIs',
      'Data cleaning and transformation',
      'Automated web servers',
    ],
  },
  {
    id: 'adas',
    title: 'ADAS Development',
    items: [
      'Raspberry Pi lane following prototype',
      'Hospital adaptation (pending publication)',
      'Real-time CV processing at 30fps',
    ],
  },
  {
    id: 'ai-chat',
    title: 'AI Chat Platform',
    items: [
      'Multi-agent conversation system',
      'Vector database integration',
      'WebSocket real-time communication',
    ],
  },
  {
    id: 'blockchain',
    title: 'Blockchain Analytics',
    items: [
      'Smart contract interaction analysis',
      'Transaction pattern detection',
      'Real-time monitoring dashboard',
    ],
  },
  {
    id: 'neural-style',
    title: 'Neural Style Transfer',
    items: [
      'CNN-based artistic style transfer',
      'GPU-accelerated CUDA processing',
      'Interactive web interface',
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
