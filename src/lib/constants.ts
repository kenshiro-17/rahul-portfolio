// ========================================
// PERSONAL DATA - RAHUL RAJ
// ========================================

export const PERSONAL_INFO = {
  name: "Rahul Raj",
  fullName: "Rahul Raj Pallathuparambil",
  title: "Software Engineer & AI Specialist",
  tagline: "AI-Powered Solutions,",
  taglineHighlight: "Human-Centered Design",
  subtitle: "A Developer who builds",
  currentRole: "M.Sc. Artificial Intelligence Student",
  university: "Brandenburg University of Technology",
  location: "Cottbus, Germany",
  email: "rahulrajp.germany@gmail.com",
  phone: "+49 17659942429",
  linkedin: "https://linkedin.com/in/rahulraj013",
  github: "https://github.com/kenshiro-17",
  bio: `A Systems Engineer turned AI specialist with experience in enterprise-grade applications. I build meaningful digital products that bridge machine intelligence with exceptional user experiences, creating equilibrium between cutting-edge technology and human needs.`,
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
    period: "2021 - 2022",
    description:
      "Optimized enterprise-grade AngularJS architectures serving 50,000+ daily users, reducing page load times by 40% through code splitting. Developed automated ETL pipelines processing 2M+ records daily with 99.5% data integrity.",
    highlights: [
      "50K+ daily users",
      "40% faster loads",
      "2M+ records processed",
    ],
    icon: "rocket",
    color: "#8b5cf6",
  },
  {
    id: 2,
    title: "Front End Development Intern",
    company: "Nexotech Solutions",
    location: "Ernakulam, India",
    period: "Jun 2020 - Sep 2020",
    description:
      "Built data-driven analytics dashboards with React and RESTful API integration, delivering real-time metrics to 200+ business users. Reduced production bugs by 35% through systematic testing protocols.",
    highlights: ["200+ users", "35% fewer bugs", "Real-time analytics"],
    icon: "chart",
    color: "#ec4899",
  },
  {
    id: 3,
    title: "Unity Developer Intern",
    company: "PaceLab",
    location: "Hyderabad, India",
    period: "Apr 2019 - Jul 2019",
    description:
      "Developed immersive VR racing simulation incorporating real-time physics engines, complex control systems, and modular data logging modules.",
    highlights: ["VR simulation", "Real-time physics", "Modular systems"],
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
    title: "Aether-AI",
    subtitle: "Local-First AI Assistant",
    description:
      "Private desktop AI assistant with GPU-accelerated inference, agentic web search, and RAG-based long-term memory using Llama 3.3 8B. Implemented zero-trust security architecture and secure code execution sandbox.",
    tech: ["Python", "Llama 3.3", "RAG", "GPU Acceleration"],
    metrics: ["Zero-trust security", "Agentic search", "Local inference"],
    image: "/textures/project-audio.jpg",
    color: "#8b5cf6",
    githubUrl: "https://github.com/kenshiro-17/Aether-AI",
  },
  {
    id: 2,
    title: "Audio Instrument Classifier",
    subtitle: "Multi-Model Classification",
    description:
      "PyTorch-based CNN achieving 87% accuracy classifying 20 musical instruments using Librosa for log-mel spectrograms. Implemented hardware-aware training pipeline reducing training crashes by 100%.",
    tech: ["PyTorch", "CNN", "Librosa", "Python"],
    metrics: ["87% accuracy", "20 instruments", "100% stability"],
    image: "/textures/project-audio.jpg",
    color: "#ec4899",
    githubUrl: "",
  },
  {
    id: 3,
    title: "Discord Music Bot",
    subtitle: "Production-Grade Bot",
    description:
      "Engineered bot with YouTube playback, interactive queue management, and rate limiting. Deployed containerized application with Sentry error tracking for 99.9% uptime.",
    tech: ["Docker", "Sentry", "YouTube API", "Discord API"],
    metrics: ["99.9% uptime", "Containerized", "DoS protection"],
    image: "/textures/project-evaluation.jpg",
    color: "#3b82f6",
    githubUrl: "https://github.com/kenshiro-17/Discord-Music-Bot",
  },
  {
    id: 4,
    title: "Job Application Tracker",
    subtitle: "Cross-Platform System",
    description:
      "Tracking system with 4 frontend implementations (Electron, WinUI 3, Qt 6.7, macOS) and Python REST API. Built Notion-inspired dashboard with smart filtering and real-time statistics.",
    tech: ["Electron", "Qt", "Python", "REST API"],
    metrics: ["4 platforms", "60fps rendering", "Auto-docs"],
    image: "/textures/project-tagging.jpg",
    color: "#10b981",
    githubUrl: "https://github.com/kenshiro-17/JobTrackerWinUI",
  },
  {
    id: 5,
    title: "Desktop Music Player",
    subtitle: "Zero-Auth Streaming",
    description:
      "Lightweight YouTube-powered music player with zero authentication using multi-fallback streaming architecture. Features live search, library management, and MP3 download conversion.",
    tech: ["YouTube API", "Desktop", "Streaming", "MP3"],
    metrics: ["Zero-auth", "Multi-fallback", "System tray"],
    image: "/textures/project-audio.jpg",
    color: "#f59e0b",
    githubUrl: "",
  },
  {
    id: 6,
    title: "Sentiment Analysis Dashboard",
    subtitle: "Social Media Analytics",
    description:
      "Real-time visualization platform processing 10,000+ social media posts. Architected automated data pipelines achieving 95% sentiment classification accuracy using NLP techniques.",
    tech: ["Python", "Streamlit", "Plotly", "NLP"],
    metrics: ["10K+ posts", "95% accuracy", "Automated pipeline"],
    image: "/textures/project-sentiment.jpg",
    color: "#ef4444",
    githubUrl: "https://github.com/kenshiro-17/sentiment-dashboard",
  },
  {
    id: 7,
    title: "Answer Evaluation System",
    subtitle: "AI-Driven Grading",
    description:
      "Automated grading system achieving 92% correlation with human evaluators. Optimized ML evaluation pipeline to process 100+ submissions in under 5 minutes.",
    tech: ["ML", "NLP", "Python", "Automation"],
    metrics: ["92% correlation", "70% faster", "500+ assessments"],
    image: "/textures/project-evaluation.jpg",
    color: "#6366f1",
    githubUrl: "",
  },
  {
    id: 8,
    title: "Question Tagging System",
    subtitle: "Automated Tagging",
    description:
      "Scalable Python-based pipeline for automated question tagging to improve information retrieval efficiency. Optimized data flow architectures for reusable and scalable structures.",
    tech: ["Python", "Data Pipeline", "Information Retrieval"],
    metrics: ["Scalable", "Efficient", "Reusable"],
    image: "/textures/project-tagging.jpg",
    color: "#14b8a6",
    githubUrl: "",
  },
] as const;

// ========================================
// SKILLS
// ========================================

export const SKILLS = {
  primary: [
    { name: "PyTorch", icon: "pytorch", color: "#EE4C2C" },
    { name: "React", icon: "react", color: "#61DAFB" },
    { name: "Python", icon: "python", color: "#3776AB" },
    { name: "Docker", icon: "docker", color: "#2496ED" },
    { name: "GCP", icon: "gcp", color: "#4285F4" },
    { name: "Azure", icon: "azure", color: "#0078D4" },
    { name: "TypeScript", icon: "typescript", color: "#3178C6" },
  ],
  secondary: [
    { name: "Next.js", icon: "nextjs", color: "#000000" },
    { name: "Git", icon: "git", color: "#F05032" },
    { name: "SQL", icon: "sql", color: "#4479A1" },
    { name: "Linux", icon: "linux", color: "#FCC624" },
    { name: "Streamlit", icon: "streamlit", color: "#FF4B4B" },
    { name: "NumPy", icon: "numpy", color: "#013243" },
    { name: "Pandas", icon: "pandas", color: "#150458" },
  ],
  categories: {
    "AI & ML": [
      "PyTorch",
      "Deep Learning",
      "CNNs",
      "scikit-learn",
      "Librosa",
      "LLM Integration",
    ],
    "Programming": ["Python", "SQL", "JavaScript", "TypeScript", "Pandas", "NumPy"],
    "Cloud & DevOps": ["GCP", "Azure", "Git", "GitHub", "Docker", "Linux", "FastAPI"],
    "Web & Desktop": ["React", "Next.js", "AngularJS", "Electron", "Qt", "WinUI", "Three.js"],
    "Databases": ["SQLite", "Qdrant", "PostgreSQL"],
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
    url: "https://github.com/rahulraj013",
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
    period: "2022 – present",
  },
  {
    degree: "Bachelor of Technology in Computer Science and Engineering",
    institution: "Model Engineering College",
    location: "Kerala, India",
    period: "2017 – 2021",
  },
] as const;

// ========================================
// CERTIFICATIONS
// ========================================

export const CERTIFICATIONS = [
  "Google Cloud Platform Fundamentals: Core Infrastructure",
  "Neural Networks and Deep Learning",
] as const;
