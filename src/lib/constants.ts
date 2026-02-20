// ========================================
// PERSONAL DATA - RAHUL RAJ
// ========================================

export const PERSONAL_INFO = {
  name: "Rahul Raj",
  fullName: "Rahul Raj Pallathuparambil",
  title: "AI-Focused Software Engineer",
  tagline: "LLM Systems,",
  taglineHighlight: "Production-Grade Engineering",
  subtitle: "An engineer building end-to-end AI products",
  currentRole: "M.Sc. Artificial Intelligence Student (BTU Cottbus)",
  university: "Brandenburg University of Technology",
  location: "Cottbus, Germany",
  email: "rahulrajp.germany@gmail.com",
  phone: "+49 17659942429",
  linkedin: "https://linkedin.com/in/rahulraj013",
  github: "https://github.com/kenshiro-17",
  bio: `AI-focused software engineer and M.Sc. Artificial Intelligence student delivering end-to-end systems across LLM applications, backend engineering, test automation, and data pipelines. Hands-on with RAG workflows, embeddings, vector retrieval, prompt engineering, model evaluation, and secure AI orchestration.`,
} as const;

// ========================================
// WORK EXPERIENCE
// ========================================

export const WORK_EXPERIENCE = [
  {
    id: 1,
    title: "Systems Engineer",
    company: "Infosys Pvt Ltd",
    location: "Bangalore, India",
    period: "06/2021 - 07/2022",
    description:
      "Architected SQL/Python ETL workflows processing 2M+ records daily, improved throughput by 18%, and safeguarded reliability through validation rules, exception control, and tuning routines.",
    highlights: [
      "2M+ records daily",
      "18% faster throughput",
      "99.5% data integrity",
    ],
    icon: "rocket",
    color: "#8b5cf6",
  },
  {
    id: 2,
    title: "Front End Development Intern",
    company: "Nexotech Solutions",
    location: "India",
    period: "05/2020 - 03/2021",
    description:
      "Crafted scalable TypeScript/JavaScript modules for production UI features, integrated REST endpoints, and reduced production defect volume by 35% using structured debugging and automated tests.",
    highlights: ["TypeScript modules", "REST integration", "35% fewer bugs"],
    icon: "chart",
    color: "#ec4899",
  },
  {
    id: 3,
    title: "Unity Developer Intern",
    company: "PaceLab",
    location: "Hyderabad, India",
    period: "04/2019 - 07/2019",
    description:
      "Prototyped a VR racing simulator with real-time physics and modular control logic, and integrated telemetry-style logging for repeatable diagnostics and result comparison.",
    highlights: ["VR simulation", "Telemetry logging", "Real-time physics"],
    icon: "gamepad",
    color: "#3b82f6",
  },
] as const;

// ========================================
// PROJECTS
// ========================================

export const PROJECTS = [
  {
    id: 1,
    title: "AI Matchmaking Platform (Proof of Talk)",
    subtitle: "Scalable Matching + LLM Personalization",
    description:
      "Directed architecture for a scalable matching engine combining rule-based ranking with LLM-assisted personalization. Orchestrated bulk ingestion for 3,000+ records with schema checks, logging, and failure-resilient processing.",
    tech: ["Python", "LLM", "Data Ingestion", "API Design"],
    metrics: ["3,000+ records", "Stress tested", "Secure access control"],
    image: "/textures/project-tagging.jpg",
    color: "#0f766e",
    githubUrl: "",
  },
  {
    id: 2,
    title: "Aether-AI",
    subtitle: "Local-First AI Assistant",
    description:
      "Constructed a local-first AI assistant using Llama 3.x and LLaVA with long-term RAG memory and agentic web retrieval. Enforced safe autonomy through sandboxed execution, AST validation, and isolated runtime controls.",
    tech: ["Python", "Llama 3.x", "RAG", "Agentic Retrieval"],
    metrics: ["Local-first", "Safe autonomy", "GPU-optimized inference"],
    image: "/textures/project-audio.jpg",
    color: "#8b5cf6",
    githubUrl: "https://github.com/kenshiro-17/Aether-AI",
  },
  {
    id: 3,
    title: "AI Document Assistant",
    subtitle: "RAG-Based Application",
    description:
      "Built a Retrieval-Augmented Generation pipeline with chunking, embeddings, semantic retrieval, and contextual prompting. Added evaluation checkpoints and governance to reduce hallucination risk.",
    tech: ["RAG", "Embeddings", "Semantic Search", "FastAPI"],
    metrics: ["Lower hallucinations", "REST APIs", "Production-ready retrieval"],
    image: "/textures/project-evaluation.jpg",
    color: "#1d4ed8",
    githubUrl: "",
  },
  {
    id: 4,
    title: "Job Application Tracker",
    subtitle: "Cross-Platform Product",
    description:
      "Developed a cross-platform tracker with Python REST APIs and four clients (Electron, WinUI 3, Qt 6.7, macOS). Delivered smart filters, real-time metrics, and maintainable OpenAPI service boundaries.",
    tech: ["Python", "Electron", "Qt", "REST API"],
    metrics: ["4 clients", "OpenAPI docs", "Maintainable architecture"],
    image: "/textures/project-tagging.jpg",
    color: "#10b981",
    githubUrl: "https://github.com/kenshiro-17/JobTrackerWinUI",
  },
  {
    id: 5,
    title: "Discord Music Bot",
    subtitle: "Production-Grade Bot",
    description:
      "Engineered an event-driven, containerized service supporting 100+ concurrent users and maintained 99.9% uptime through resilient asynchronous streaming and API handling.",
    tech: ["Node.js", "Docker", "Discord API", "Async Systems"],
    metrics: ["100+ users", "99.9% uptime", "Linux deployment"],
    image: "/textures/project-evaluation.jpg",
    color: "#3b82f6",
    githubUrl: "https://github.com/kenshiro-17/Discord-Music-Bot",
  },
  {
    id: 6,
    title: "Multi-Model Audio Instrument Classification",
    subtitle: "PyTorch CNN System",
    description:
      "Trained a PyTorch CNN achieving 87% accuracy across 20 instrument classes using Librosa log-mel features. Added hardware-aware training logic with automatic OOM mitigation for stable long runs.",
    tech: ["PyTorch", "CNN", "Librosa", "Python"],
    metrics: ["87% accuracy", "20 classes", "OOM mitigation"],
    image: "/textures/project-audio.jpg",
    color: "#ec4899",
    githubUrl: "",
  },
  {
    id: 7,
    title: "Data Consolidation and BI Dashboard",
    subtitle: "Analytics Case Study",
    description:
      "Consolidated five heterogeneous sales and marketing datasets into analytical tables and KPI dashboards. Produced channel-efficiency and funnel diagnostics with forecasting-ready recommendations.",
    tech: ["BI", "Data Modeling", "Analytics", "Dashboarding"],
    metrics: ["5 datasets", "KPI dashboards", "Funnel diagnostics"],
    image: "/textures/project-sentiment.jpg",
    color: "#f59e0b",
    githubUrl: "",
  },
  {
    id: 8,
    title: "Sentiment Analysis Dashboard",
    subtitle: "Social Media Analytics",
    description:
      "Developed a web-based dashboard to process and visualize social sentiment data. Contributed to data preparation, feature implementation, analytics testing, and end-user documentation.",
    tech: ["Python", "Streamlit", "Plotly", "NLP"],
    metrics: ["Web dashboard", "Visual analytics", "Documented outputs"],
    image: "/textures/project-sentiment.jpg",
    color: "#ef4444",
    githubUrl: "https://github.com/kenshiro-17/sentiment-dashboard",
  },
] as const;

// ========================================
// SKILLS
// ========================================

export const SKILLS = {
  primary: [
    { name: "Python", icon: "python", color: "#3776AB" },
    { name: "TypeScript", icon: "typescript", color: "#3178C6" },
    { name: "React", icon: "react", color: "#61DAFB" },
    { name: "Docker", icon: "docker", color: "#2496ED" },
    { name: "FastAPI", icon: "fastapi", color: "#0EA5A4" },
    { name: "Node.js", icon: "nodejs", color: "#339933" },
    { name: "RAG", icon: "rag", color: "#6D28D9" },
  ],
  secondary: [
    { name: "Next.js", icon: "nextjs", color: "#000000" },
    { name: "SQL", icon: "sql", color: "#4479A1" },
    { name: "PostgreSQL", icon: "postgres", color: "#336791" },
    { name: "Playwright", icon: "playwright", color: "#2EAD33" },
    { name: "PyTest", icon: "pytest", color: "#0A9EDC" },
    { name: "Git", icon: "git", color: "#F05032" },
    { name: "Linux", icon: "linux", color: "#FCC624" },
    { name: "Pandas", icon: "pandas", color: "#150458" },
    { name: "Polars", icon: "polars", color: "#1E3A8A" },
  ],
  categories: {
    "AI & ML": [
      "LLM",
      "RAG",
      "Embeddings",
      "Vector Search",
      "Prompt Engineering",
      "Model Evaluation",
      "Hallucination Mitigation",
      "NLP",
      "Computer Vision",
      "PyTorch",
      "Agentic AI",
    ],
    "Programming": ["Python", "TypeScript", "JavaScript", "SQL"],
    "Frameworks": ["FastAPI", "Node.js", "React", "Next.js"],
    "Cloud & DevOps": [
      "Docker",
      "Linux",
      "CI/CD",
      "Azure DevOps (basic)",
      "Containerization",
    ],
    "Web & Desktop": ["React", "Next.js", "Electron", "Qt", "WinUI", "macOS"],
    "DevOps & Cloud": [
      "Docker",
      "Linux",
      "CI/CD",
      "Azure DevOps (basic)",
      "Containerization",
    ],
    "Data Engineering": [
      "PostgreSQL",
      "DuckDB",
      "Polars",
      "Pandas",
      "ETL",
      "Data Modeling",
      "Data Validation",
    ],
    "Testing & QA": [
      "Playwright",
      "PyTest",
      "Automated Testing",
      "Performance Benchmarking",
      "System-Level Testing",
    ],
  },
} as const;

// ========================================
// NAVIGATION
// ========================================

export const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
] as const;

// ========================================
// SOCIAL LINKS
// ========================================

export const SOCIAL_LINKS = [
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/rahulraj013",
    icon: "linkedin",
  },
  {
    name: "GitHub",
    url: "https://github.com/kenshiro-17",
    icon: "github",
  },
  {
    name: "Email",
    url: "mailto:rahulrajp.germany@gmail.com",
    icon: "mail",
  },
] as const;

// ========================================
// EDUCATION
// ========================================

export const EDUCATION = [
  {
    degree: "Master of Science Artificial Intelligence",
    institution: "Brandenburg University of Technology",
    location: "Cottbus, Germany",
    period: "10/2022 – present",
  },
  {
    degree: "Bachelor of Technology in Computer Science and Engineering",
    institution: "Model Engineering College",
    location: "Kerala, India",
    period: "08/2017 – 06/2021",
  },
] as const;

// ========================================
// CERTIFICATIONS
// ========================================

export const CERTIFICATIONS = [
  "Google Cloud Platform Fundamentals: Core Infrastructure",
  "Neural Networks and Deep Learning",
] as const;

export const LANGUAGES = [
  { name: "English", level: "Fluent (C1)" },
  { name: "German", level: "A2 (actively improving)" },
] as const;

export const CORE_COMPETENCIES = [
  "Analytical problem-solving and structured execution across AI, data, and software systems",
  "Cross-functional collaboration in Agile/Scrum teams with engineers, analysts, and stakeholders",
  "Rapid upskilling in new tools and frameworks across LLM/RAG, automation, and cloud tooling",
] as const;
