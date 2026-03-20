export interface Project {
  id: number;
  number: string;
  title: string;
  description: string;
  techStack: string[];
  role: string;
  achievement: string;
  year: string;
}

export interface Achievement {
  year: string;
  title: string;
  event: string;
  org: string;
  detail: string;
  image: string;
  side: "left" | "right";
}

export interface Experience {
  title: string;
  period: string;
  org: string;
  detail: string;
}

export const projects: Project[] = [
  {
    id: 1,
    number: "01",
    title: "TruthScope",
    description:
      "Real-time AI-powered fake news detection browser extension. Achieves 98.6% accuracy in credibility scoring using Google Gemini and NLP pipelines.",
    techStack: ["Gemini API", "NLP", "Chrome Extension", "JavaScript", "Python"],
    role: "Team Lead & Developer",
    achievement: "4th Place · Smart Bengal Hackathon 2025 · RCCIIT Grand Finals",
    year: "2025",
  },
  {
    id: 2,
    number: "02",
    title: "CipherClash",
    description:
      "Competitive real-time Bulls & Cows logic puzzle game with ELO leaderboard, PvP/PvE modes, Redis-backed room persistence and NextAuth OAuth.",
    techStack: ["Next.js 15", "Socket.io", "Redis", "Supabase", "Framer Motion", "Zustand"],
    role: "Full-Stack Developer",
    achievement: "AntiGravity Hackathon · 2026",
    year: "2026",
  },
  {
    id: 3,
    number: "03",
    title: "InsightAI",
    description:
      "Conversational AI for instant Business Intelligence. Type plain English, get interactive dashboards powered by Google Gemini.",
    techStack: ["Next.js", "Google Gemini", "Tailwind", "Chart.js"],
    role: "Senior Frontend Lead",
    achievement: "AntiGravity Hackathon · 2026",
    year: "2026",
  },
  {
    id: 4,
    number: "04",
    title: "Decentralized Donation Platform",
    description:
      "Web3 platform for transparent donation campaigns on Ethereum blockchain with smart contract-based fund management.",
    techStack: ["Ethereum", "Web3.js", "React", "Smart Contracts", "Solidity"],
    role: "Full-Stack & Blockchain Developer",
    achievement: "1st Place · TMSL Hackathon 2024 · Hack-ur-way",
    year: "2024",
  },
  {
    id: 5,
    number: "05",
    title: "Community E-Commerce",
    description:
      "Platform connecting local sellers with international markets featuring AI/ML-based product recommendations and India Post shipping integration.",
    techStack: ["MERN Stack", "ML/AI", "REST APIs", "Node.js", "MongoDB"],
    role: "Full-Stack Developer & Team Lead",
    achievement: "1st Place · E-Summit 2024 National Finals · Jadavpur University",
    year: "2024",
  },
  {
    id: 6,
    number: "06",
    title: "Space Weather Prediction",
    description:
      "AI-powered space weather prediction system for satellite protection using ML models and real-time solar activity data feeds.",
    techStack: ["Python", "ML/AI", "React", "Data Visualization", "APIs"],
    role: "ML & Frontend Developer",
    achievement: "Hackathon Project · 2025",
    year: "2025",
  },
];

export const achievements: Achievement[] = [
  {
    year: "2025",
    title: "SIH'25 Winner",
    event: "Smart India Hackathon 2025",
    org: "National Level Competition",
    detail: "India's largest hackathon — national champions.",
    image: "/achivments/SIH.webp",
    side: "left",
  },
  {
    year: "2025",
    title: "Chancellor's Gold Medal",
    event: "Tech AI Hackathon 2.0",
    org: "Techno India Group",
    detail: "Highest institutional honor for technical excellence.",
    image: "/achivments/TechAI.webp",
    side: "right",
  },
  {
    year: "2025",
    title: "Best Paper Award",
    event: "IEEE ICSAA'25",
    org: "GNIT",
    detail: "ISBN: 978-93-341-6437-4 · Published research paper.",
    image: "/achivments/ieee.webp",
    side: "left",
  },
  {
    year: "2025",
    title: "IDE Bootcamp Offline Finalist",
    event: "National Entrepreneurship Bootcamp",
    org: "AICTE & MoE, Govt. of India",
    detail: "Selected among top national finalists.",
    image: "/achivments/idejpeg.webp",
    side: "right",
  },
  {
    year: "2025",
    title: "Smart Bengal Hackathon — 4th Rank",
    event: "Grand Finals",
    org: "RCCIIT",
    detail: "Project: TruthScope — AI fake news detection.",
    image: "/achivments/sbhjpeg.webp",
    side: "left",
  },
  {
    year: "2024",
    title: "1st Rank — HACK <N> PITCH",
    event: "E-Summit 2024",
    org: "Jadavpur University",
    detail: "Top place in the prestigious Hack n Pitch competition.",
    image: "/achivments/jujpeg.webp",
    side: "right",
  },
  {
    year: "2026",
    title: "GFG Kolkata Hackathon Winner",
    event: "GeeksForGeeks Kolkata Chapter",
    org: "GeeksForGeeks",
    detail: "First place at GFG Kolkata hackathon.",
    image: "/achivments/gfg.webp",
    side: "left",
  },
  {
    year: "2024",
    title: "1st Rank — LAUNCH X",
    event: "E-Summit 2024",
    org: "Jadavpur University",
    detail: "National Finals winner for entrepreneurial pitching.",
    image: "/achivments/lunchX.webp",
    side: "right",
  },
  {
    year: "2024",
    title: "Hult Prize Runner Up",
    event: "On-Campus Competition",
    org: "IIC, TMSL",
    detail: "Global social entrepreneurship competition.",
    image: "/achivments/hultprize.webp",
    side: "left",
  },
  {
    year: "2024",
    title: "1st Rank — HACK-UR-WAY",
    event: "Institution's Innovation Council",
    org: "TMSL",
    detail: "National Level Hackathon Winner.",
    image: "/achivments/hackurway.webp",
    side: "right",
  },
  {
    year: "2024",
    title: "1st Rank — INNOVATION",
    event: "Samarth Techfest",
    org: "TMSL",
    detail: "Winner of the primary innovation showcase event.",
    image: "/achivments/Innovathonjpeg.webp",
    side: "left",
  },
  {
    year: "2024",
    title: "1st Rank — Design Dynamo",
    event: "INTRA College Annual Techfest",
    org: "Geekonix TMSL",
    detail: "Top prize for exceptional UI/UX and design thinking.",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=800&auto=format&fit=crop",
    side: "right",
  },
];

export const experiences: Experience[] = [
  {
    title: "Google Gemini Campus Ambassador",
    period: "Aug 2025 – Present",
    org: "Google Developers Community",
    detail: "Organized workshops for 500+ students · AI literacy initiatives",
  },
  {
    title: "Tech Co-Lead & Full Stack Developer",
    period: "Jan 2024 – Present",
    org: "Samarth Educational Society, TMSL",
    detail: "+30% traffic · Led Pravidhi, Photography & Graphics teams",
  },
  {
    title: "Project Admin & Open Source Maintainer",
    period: "May 2024 – Aug 2024",
    org: "Hacktoberfest 2024 (MLH Event)",
    detail: "250+ participants · 45% repo quality improvement",
  },
];

export const skillIcons = [
  "React",
  "Next.js",
  "Node.js",
  "Express.js",
  "MongoDB",
  "PostgreSQL",
  "JavaScript",
  "TypeScript",
  "Python",
  "Java",
  "C++",
  "Tailwind CSS",
  "Prisma",
  "Auth0",
  "Git",
  "Firebase",
  "Supabase",
  "Socket.io",
  "Redis",
  "Ethereum",
  "NLP/AI",
];

export const marqueeText =
  "REACT · NEXT.JS · NODE.JS · TYPESCRIPT · PYTHON · MONGODB · POSTGRESQL · PRISMA · SOCKET.IO · REDIS · ETHEREUM · WEB3 · MACHINE LEARNING · NLP · TAILWIND · GIT · AUTH0 · SUPABASE · FIREBASE · REST APIs · CHROME EXTENSIONS · SMART CONTRACTS · ";

export const skillCategories = {
  languages: ["C", "C++", "Java", "Python", "JavaScript", "TypeScript", "SQL"],
  frameworks: [
    "React.js",
    "Next.js",
    "Node.js",
    "Express.js",
    "Zustand",
    "Tailwind CSS",
    "MongoDB",
    "PostgreSQL",
    "Prisma",
  ],
  technologies: [
    "REST APIs",
    "Auth0",
    "Git",
    "Blockchain (Ethereum)",
    "Machine Learning",
    "NLP",
    "UI/UX Design",
  ],
  core: [
    "Full-Stack Development",
    "System Design",
    "AI/ML Integration",
    "Team Leadership",
    "Open Source",
  ],
};
