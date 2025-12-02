// Portfolio Data Constants
// Single source of truth for all portfolio content - sourced from main.tex

export const BREAKPOINTS = {
  MOBILE: 768,
} as const

export const PERSONAL_INFO = {
  name: 'Karthik Vinayan',
  title: 'Founding Software Engineer',
  currentCompany: 'Omni RPA Inc',
  companyLocation: 'San Jose, California',
  email: 'karthikvinayan57@gmail.com',
  location: 'Hyderabad, IN',
  linkedin: {
    url: 'https://linkedin.com/in/karthik-vinayan',
    display: 'linkedin.com/in/karthik-vinayan',
  },
  website: {
    url: 'https://o1x3.com',
    display: 'o1x3.com',
  },
} as const

export const EXPERIENCE = [
  {
    id: 'omni-rpa',
    company: 'Omni RPA Inc',
    position: 'Founding Software Engineer',
    location: 'San Jose, California',
    period: 'June 2024 – Present',
    periodShort: '2024–Present',
    description: [
      'Built and deployed agentic AI systems using LLMs and a NebulaGraph-based Knowledge Graph; enabled dynamic retrieval, reasoning, and contextual handling for CSP-focused automation use cases.',
      'Developed and maintained large-scale Knowledge Graphs with custom ETL pipelines; mapped structured/unstructured data and optimized graph query performance for real-time applications.',
      'Designed RESTful APIs and backend services around LLM agents and Knowledge Graphs; implemented MCP servers to coordinate multi-agent workflows and backend data systems.',
      'Led DevOps efforts; containerized services with Docker, managed Kubernetes deployments, and set up CI/CD pipelines for testing, versioning, and environment rollouts.',
      'Architected end-to-end system designs for enterprise automation platforms; collaborated with stakeholders to define requirements, created technical proposals and architecture diagrams, and delivered proof-of-concept demos to support client pitches and business development.',
    ],
  },
  {
    id: 'duk',
    company: 'Digital University of Kerala',
    position: 'Research Intern',
    location: 'Thiruvananthapuram, IN',
    period: 'Oct 2023 – Dec 2023',
    periodShort: '2023',
    description: [
      'Engineered an innovative computer vision solution, employing a YOLOv8 model finely tuned on a proprietary dataset, showcasing real-time tomato ripeness detection in a production environment.',
    ],
  },
] as const

export const EDUCATION = [
  {
    id: 'vit',
    institution: 'Vellore Institute of Technology',
    institutionShort: 'VIT Chennai',
    degree: 'B.Tech Computer Science and Engineering',
    degreeShort: 'B.Tech CSE',
    specialization: 'Artificial Intelligence and Machine Learning',
    location: 'Chennai, IN',
    period: 'Sep 2021 – Aug 2025',
  },
  {
    id: 'stcs',
    institution: 'St. Thomas Central School',
    institutionShort: 'STCS',
    degree: 'AISSCE - PCM with Computer Science',
    degreeShort: 'AISSCE - PCM + CS',
    location: 'Thiruvananthapuram, IN',
    period: 'Jun 2009 – Mar 2021',
  },
] as const

export const PROJECTS = [
  {
    id: 'data-eng',
    title: 'Python-Powered Data Engineering Consultant',
    items: [
      'Developed custom web scraping pipelines to extract valuable data from various sources, including websites, APIs, and databases. Designed and implemented RESTful APIs using Flask to seamlessly integrate scraped data into client systems.',
      'Designed and implemented robust data pipelines for data cleaning, transformation, and validation, leveraging Pandas and other Python libraries.',
      'Built and deployed automated web servers to ensure continuous data updates and accessibility.',
    ],
  },
  {
    id: 'adas',
    title: 'Advanced Driver Assistance System (ADAS) Development',
    items: [
      'Led a team in the design and development of an ADAS prototype buggy leveraging Raspberry Pi implementing core ADAS features such as lane following assistance, automatic lane changing, and object detection using computer vision and machine learning techniques in Python.',
      'Successfully adapted the ADAS technology for a hospital setup, pending publication, demonstrating adaptability and innovative problem-solving.',
    ],
  },
] as const

export const SKILLS = {
  programming: {
    label: 'Programming Languages',
    items: ['Python (Pandas, NumPy, TensorFlow, Pytorch)', 'C', 'C++', 'Java', 'SQL'],
  },
  aiml: {
    label: 'AI/ML Technologies',
    items: ['TensorFlow', 'PyTorch', 'Large Language Models (LLMs)', 'Computer Vision', 'Machine Learning'],
  },
  cloud: {
    label: 'Data & Cloud',
    items: ['BigQuery', 'AWS (Cloud Practitioner)', 'Azure (AZ-104 Certified Administrator)', 'GCP'],
  },
  tools: {
    label: 'Development Tools',
    items: ['Git', 'Docker', 'RESTful APIs', 'Flask', 'RAG', 'GraphDBs'],
  },
  languages: {
    label: 'Languages',
    items: ['English (Fluent)', 'Malayalam (Native)', 'Hindi (Conversational)', 'Tamil (Conversational)'],
  },
  extracurricular: {
    label: 'Clubs & Extra-Curricular',
    items: ['IEEE Computer Society', 'Core organizer for Vibrance\'23 and Technovit\'23'],
  },
} as const

export const CERTIFICATIONS = [
  'Azure AZ-104 Certified Administrator',
  'AWS Cloud Practitioner',
] as const

export const TERMINAL_COMMANDS = {
  whoami: 'karthik.vinayan',
  pwd: '/home/karthik/career',
  status: 'building_the_future',
} as const
