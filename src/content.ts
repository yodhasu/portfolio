import type { LucideIcon } from "lucide-react";
import {
  BookOpenCheck,
  BrainCircuit,
  BriefcaseBusiness,
  Code2,
  Database,
  GraduationCap,
  Layers3,
  Mail,
  Palette,
  Rocket,
  Sparkles,
  TerminalSquare
} from "lucide-react";

export type Project = {
  name: string;
  role: string;
  year: string;
  stack: string[];
  summary: string;
  proof: string;
  href: string;
  detailHref?: string;
  tone: "research" | "product" | "backend" | "creative";
  status?: string;
};

export type Experience = {
  title: string;
  org: string;
  period: string;
  summary: string;
  details?: string[];
  icon: LucideIcon;
};

export const profile: {
  name: string;
  shortName: string;
  location: string;
  email: string;
  phone?: string;
  github: string;
  linkedin: string;
  avatar: string;
  cvPath: string;
  headline: string;
  intro: string;
  gpa: string;
  education: {
    institution: string;
    degree: string;
    period: string;
    gpa: string;
  }[];
  languages: string[];
  githubRepos: number;
} = {
  name: "Alethea Agung Yodha Pratama",
  shortName: "Yodha",
  location: "Jakarta, Indonesia",
  email: "yodha.pratama@gmail.com",
  github: "https://github.com/yodhasu",
  linkedin: "https://linkedin.com/in/yodhapratama",
  avatar: "https://avatars.githubusercontent.com/u/127666231?v=4",
  cvPath: "/ATS_Friendly_Technical_Resume-5.pdf",
  headline: "I build web systems, AI experiments, and creative learning tools.",
  intro:
    "Computer Science undergraduate at BINUS University with hands-on work across enterprise web workflows, QA/UAT validation, backend APIs, AI/ML research, and creative teaching.",
  gpa: "3.44/4.00",
  education: [
    {
      institution: "Bina Nusantara University (Tangerang, ID)",
      degree: "Bachelor of Science in Computer Science",
      period: "Aug 2022 - Present",
      gpa: "3.44/4.00"
    },
    {
      institution: "University of Malaya (Kuala Lumpur, MY)",
      degree: "Exchange Student, Computer Science",
      period: "Mar 2025 - Aug 2025",
      gpa: "N/A"
    }
  ],
  languages: [
    "Indonesian (Native)",
    "English (IELTS Band 7.5)",
    "Japanese (NAT N5 Equivalent)"
  ],
  githubRepos: 31
};

export const navItems = [
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Creative", href: "#creative" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" }
] as const;

export const featuredProjects: Project[] = [
  {
    name: "ReINE",
    role: "Research project",
    year: "2026",
    stack: ["Python", "PyTorch", "Hugging Face"],
    summary:
      "Residual Information Network Editing explores persona steering on a frozen language model using lightweight residual MicroAdapters.",
    proof:
      "Built experiment scripts, training configs, adapter hooks, and evidence notes comparing a small adapter approach against a larger LoRA baseline.",
    href: "https://github.com/yodhasu/ReINE",
    detailHref: "/reine",
    tone: "research",
    status: "DOI: TBA (In Submission)"
  },
  {
    name: "Pasraman LMS",
    role: "Full-stack prototype",
    year: "2026",
    stack: ["Next.js", "TypeScript", "Supabase", "Tailwind"],
    summary:
      "A learning management system prototype for class management, learning materials, authentication, and role-aware access patterns.",
    proof:
      "Focused on database-backed workflows, permission-aware user journeys, and deployment-ready Supabase/PostgreSQL integration.",
    href: "https://github.com/yodhasu/LMS-pasraman",
    tone: "product"
  },
  {
    name: "kost-simple-laravel",
    role: "Web application",
    year: "2026",
    stack: ["Laravel", "Vue", "MySQL", "JavaScript"],
    summary:
      "A simple kost management application implemented in Laravel and used in production.",
    proof:
      "Useful proof of pragmatic PHP/Laravel delivery in production alongside Vue dynamic interfaces and performance tuning.",
    href: "https://github.com/yodhasu/kost-simple-laravel",
    tone: "product"
  },
  {
    name: "enlive",
    role: "Creative AI runtime",
    year: "2026",
    stack: ["Python", "FastAPI", "WebSocket", "Live2D", "MCP"],
    summary:
      "A local companion AI runtime that lets an agent control Live2D model expressions through MCP-style tools.",
    proof:
      "Connects AI-agent control, local runtime design, WebSocket updates, and expressive UI experimentation.",
    href: "https://github.com/yodhasu/enlive",
    tone: "creative"
  },
  {
    name: "DreamConnectNew",
    role: "AI interaction experiment",
    year: "2024",
    stack: ["Python", "AI chat", "Backend"],
    summary:
      "An exploratory companion AI project that informed later thinking around local embodiment and expressive agent interaction.",
    proof:
      "Shows self-directed curiosity around AI products beyond classroom assignments.",
    href: "https://github.com/yodhasu/DreamConnectNew",
    tone: "creative"
  }
];

export const experience: Experience[] = [
  {
    title: "Frontend Developer Intern / Associate Product Intern — Web Systems & Backend Integration",
    org: "PT Global Loyalty Indonesia – IT Corporate",
    period: "Aug 2025 - Jan 2026",
    summary:
      "Developed and validated internal B2B web modules for transport and parking registration workflows, covering frontend implementation, backend/API integration, validation logic, reporting outputs, and UAT handoff.",
    details: [
      "Built transport and parking registration modules using Vue, Vuetify, Tailwind, Flask/FastAPI integration patterns, Oracle client/database access, and REST-style frontend-backend handoff documentation.",
      "Implemented and validated upload flows for SIM/STNK documents, add/edit/mutasi/terminate vehicle workflows, billing, subsidies, and discount-tier rules across role-aware user journeys.",
      "Worked with SSO v3/JWT authentication, API request/response handling, backend validation behavior, Docker deployment planning, and mock backend flows for UAT.",
      "Prepared UAT scripts and functional validation cases across user roles, mock backend scenarios, and finance XLSX/PDF reporting outputs."
    ],
    icon: BriefcaseBusiness
  },
  {
    title: "Independent Software Developer",
    org: "Self-directed and community projects",
    period: "2023 - Present",
    summary:
      "Built full-stack applications, AI chatbot tools, Laravel/PHP web apps, FastAPI backends, and machine learning notebooks across a public GitHub portfolio.",
    details: [
      "Designed and deployed web apps and AI chat tools using TypeScript, Python, Laravel, Vue, FastAPI, SQLite/MySQL, and cloud platforms.",
      "Maintained a public GitHub portfolio spanning Python AI tools, TypeScript LMS prototyping, Laravel web apps, and machine learning notebooks."
    ],
    icon: TerminalSquare
  },
  {
    title: "Digital Drawing and Manga Class Teacher",
    org: "BINUS Nippon Club",
    period: "Oct 2024 - Mar 2025",
    summary:
      "Taught digital drawing workflows and gave structured feedback across workshop sessions, strengthening mentoring and review skills.",
    details: [
      "Taught digital drawing workflows and provided structured feedback across university club workshop sessions.",
      "Strengthened communication, mentoring, and critique skills, helping make feedback actionable."
    ],
    icon: Palette
  },
  {
    title: "Research Paper Author",
    org: "Bina Nusantara University",
    period: "2024",
    summary:
      "Conducted real-time air-pollution forecasting research using IoT sensor data and machine learning ensemble models; presented findings at ICOIACT.",
    details: [
      "Conducted real-time air-pollution forecasting research using IoT sensor data.",
      "Built and compared prediction models using ARIMA, Prophet, MLP, and stacked ensemble configurations.",
      "Presented findings as co-author at the 7th International Conference on Information and Communications Technology (ICOIACT 2024)."
    ],
    icon: GraduationCap
  }
];

export const skillGroups = [
  {
    title: "Programming",
    icon: Code2,
    items: ["Java", "SQL", "Python", "TypeScript", "JavaScript", "PHP", "C/C++", "C#"]
  },
  {
    title: "Web & Backend",
    icon: Layers3,
    items: ["Vue", "Vuetify", "Next.js", "React", "Laravel", "Flask", "FastAPI", "REST APIs", "Tailwind CSS"]
  },
  {
    title: "Database & Delivery",
    icon: Database,
    items: ["Oracle Client Environment", "MySQL", "Supabase", "JWT", "SSO v3", "RBAC", "Docker", "Vercel", "Render"]
  },
  {
    title: "Data & AI",
    icon: BrainCircuit,
    items: ["PyTorch", "TensorFlow", "scikit-learn", "pandas", "NumPy", "OpenCV"]
  }
];

export const credentials = [
  "Alibaba Cloud Certified Associate - Cloud Computing",
  "NVIDIA Certificate of Competency - Fundamentals of Deep Learning",
  "Samsung Innovation Campus Batch 5 - Stage 1 Coding and Programming (Score 91.15)",
  "Presenter at ICOIACT 2024 (Japan)",
  "IELTS Band 7.5",
  "Japanese NAT N5 Equivalent"
];

export const workspacePrinciples = [
  {
    title: "Systems that can be handed off",
    description:
      "I care about validation, documentation, and role-aware flows because software has to survive outside my laptop.",
    icon: BookOpenCheck
  },
  {
    title: "Research with working code",
    description:
      "My AI projects are built around scripts, configs, notes, and repeatable experiments rather than only high-level ideas.",
    icon: BrainCircuit
  },
  {
    title: "Creative tools as technical practice",
    description:
      "Teaching art and building expressive AI tools both sharpen the same skill: making complex ideas easier to use.",
    icon: Sparkles
  }
];

export const studioPrinciples = workspacePrinciples;

export const contactActions = [
  { label: "Email", href: `mailto:${profile.email}`, icon: Mail },
  { label: "GitHub", href: profile.github, icon: Code2 },
  { label: "LinkedIn", href: profile.linkedin, icon: BriefcaseBusiness },
  { label: "Download CV", href: profile.cvPath, icon: Rocket, download: true }
];

export const reinePaperDetails = {
  title: "Residual Information Network Editing for Persona Steering in Frozen Language Models",
  authors: [
    "Alethea Agung Yodha Pratama (Computer Science, Bina Nusantara University)",
    "Azka Dhafin Elhan (Computer Science, Bina Nusantara University)",
    "Collin Kliveson (Computer Science, Bina Nusantara University)",
    "Hidayaturrahman (Academic Supervisor, Bina Nusantara University)"
  ],
  abstract:
    "Controlling persona and identity in large language models remains challenging because prompt-only steering is unstable, while fine-tuning can be costly and may disturb useful base behavior. This paper introduces ReINE (Residual Information Network Editing), a lightweight framework that steers frozen causal language models through trainable residual interventions on selected transformer layers. ReINE keeps host-model weights frozen and attaches low-rank MicroAdapters through forward hooks, injecting additive perturbations into hidden states during training and inference. We evaluate ReINE on identity-binding tasks using Alibaba Cloud Qwen3-4B-Thinking as the frozen host model. Results show that adapter placement strongly affects steering quality, with lower-layer intervention producing more stable behavior than broader asymmetric or full-depth configurations. A shallow Lower-5+CoT variant, adapting only layers 0-4 with 409,610 trainable parameters, achieves 30/30 zero-shot identity accuracy, while a standard LoRA baseline trained on the same 665-example dataset reaches 22/30 with 33.0M trainable parameters. These findings suggest that shallow residual intervention can provide compact and effective identity steering, though results remain limited to a single host model and targeted evaluation setting.",
  hyperparameters: {
    rank: 16,
    alpha: 16,
    dropout: 0.1,
    epochs: 5,
    batchSize: 2,
    maxLength: 1024
  },
  modelEvaluated: "Alibaba Cloud Qwen3-4B-Thinking (unsloth/Qwen3-4B-Thinking-2507)",
  results: [
    { config: "ReINE Lower-5 + CoT", layers: "0-4", cot: "Yes", params: "409,610", accuracy: "30/30 (100%)", detail: "Binds identity stably; CoT supervision improves reasoning-handoff completion." },
    { config: "ReINE Lower Third", layers: "0-11", cot: "No", params: "983,064", accuracy: "28/30 (93.3%)", detail: "Strong lower-layer grounding." },
    { config: "ReINE Layer-0 Probe", layers: "0", cot: "Yes", params: "81,922", accuracy: "28/30 (93.3%)", detail: "Early-stage representation shaping, fails under explicit overwrite prompts." },
    { config: "LoRA Baseline", layers: "Various", cot: "No", params: "33,030,144", accuracy: "22/30 (73.3%)", detail: "Weight-space adaptation. Shows partial associations but fails on creator-identity and overwrite prompts." },
    { config: "ReINE Default Asymmetric", layers: "3,4,16,17,27-35", cot: "No", params: "1,064,986", accuracy: "21/30 (70%)", detail: "More prone to base model identity contamination." },
    { config: "ReINE Lower-5", layers: "0-4", cot: "No", params: "409,610", accuracy: "18/30 (60%)", detail: "Without CoT supervision, model often fails through incomplete reasoning handoffs." },
    { config: "ReINE 11-1-1 Lower-Dominant", layers: "0-10,20,27", cot: "No", params: "1,146,908", accuracy: "4/30 (13.3%)", detail: "Wide layer coverage with extra objectives destabilizes generation." }
  ],
  vramFootprint: {
    lora: { params: "33.0M", time: "5.16 min", vram: "8.71 GB", accuracy: "73.3%" },
    reine: { params: "0.4M", time: "4.49 min", vram: "10.34 GB", accuracy: "100%" }
  },
  limitations: [
    "Peak VRAM Usage: ReINE's forward hook architecture requires full intermediate hidden states to remain resident in memory during the forward pass, causing higher GPU memory consumption than LoRA (10.34 GB vs 8.71 GB).",
    "Semantic Leakage: The steered persona's identity markers bleed into factual recall tasks, leading the model to respond to factual queries in the persona's voice.",
    "Methodological Limits: The comparison with the LoRA baseline was not fully isolated. LoRA was trained without CoT, whereas Lower-5+CoT included CoT; a LoRA variant trained with CoT was not tested.",
    "Scope: Proof-of-concept findings are currently limited to a single host model (Qwen3-4B-Thinking) and targeted evaluation benchmarks."
  ]
};
