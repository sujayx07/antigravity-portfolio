export interface Project {
  id: number;
  number: string;
  title: string;
  description: string;
  techStack: string[];
  role: string;
  achievement: string;
  year: string;
  link?: string;
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

export interface PersonalProfile {
  name: string;
  username: string;
  headline: string;
  location: string;
  email: string;
  phone: string;
  website: string;
  linkedin: string;
  github: string;
  x: string;
}

export const personalProfile: PersonalProfile = {
  name: "Sujay Dey",
  username: "sujayx07",
  headline: "Creative Frontend Developer and Full-Stack Engineer",
  location: "Kolkata, West Bengal, India",
  email: "sujayx07@gmail.com",
  phone: "+91-62941-76591",
  website: "https://sujayx07.xyz",
  linkedin: "https://linkedin.com/in/sujayx07",
  github: "https://github.com/sujayx07",
  x: "https://x.com/sujayx07",
};

export const projects: Project[] = [
  {
    id: 1,
    number: "01",
    title: "Krishi Drishti",
    description:
      "Scalable AI and IoT platform for crop residue management. Integrates machine learning and real-time data pipelines to track agricultural machinery, boosting operational efficiency by 70%. Led a team of 6 to architect predictive analytics and live monitoring dashboards.",
    techStack: ["Machine Learning", "IoT", "Data Pipelines", "React", "Python"],
    role: "Team Lead & System Architect",
    achievement: "National Winner – Smart India Hackathon 2025",
    year: "2025",
    link: "https://krishidrishti.vercel.app/"
  },
  {
    id: 2,
    number: "02",
    title: "Bharatiya Decentralized E-Commerce",
    description:
      "Blockchain-powered marketplace driven by smart contracts, currently supporting 1000+ distributed sellers. Engineered secure transaction workflows, transparent authentication, and a fully decentralized web3 architecture to guarantee data integrity.",
    techStack: ["Ethereum", "Solidity", "Web3.js", "React", "Smart Contracts"],
    role: "Team Lead & Blockchain Developer",
    achievement: "1st Rank – E-Summit 2024 National Finals",
    year: "2024",
    link: "https://bharatiya-ecommerce.vercel.app/"
  },
  {
    id: 3,
    number: "03",
    title: "Viz.ai",
    description:
      "Conversational BI Dashboard Generator. Translates plain English queries into interactive data visualizations with 95%+ accuracy. Built a highly scalable Next.js architecture featuring context retention and CSV-agnostic dynamic chart rendering.",
    techStack: ["Next.js", "AI Agent powered by Gemini", "Recharts", "Tailwind", "REST APIs"],
    role: "Full-Stack Developer",
    achievement: "Winner – GFG Kolkata Hackathon 2025",
    year: "2025",
    link: "https://vizlyai.vercel.app/"
  },
  {
    id: 4,
    number: "04",
    title: "InterVue",
    description:
      "AI-driven interview preparation platform utilizing real-time voice processing and NLP to evaluate candidate responses with 90% accuracy. Optimized system latency and engineered automated feedback algorithms to simulate realistic interview environments.",
    techStack: ["NLP", "Voice Processing", "Machine Learning", "React", "Python"],
    role: "Team Lead & AI Developer",
    achievement: "1st Rank – Tech AI 2.0 National Hackathon",
    year: "2025",
    link: "https://intervuexai.vercel.app/"
  },
  {
    id: 5,
    number: "05",
    title: "TruthScope",
    description:
      "Real-time AI-powered fake news detection browser extension. Achieves 98.6% accuracy in credibility scoring using Google Gemini and NLP pipelines.",
    techStack: ["Google Gemini", "NLP", "Chrome Extension", "JavaScript", "Python"],
    role: "Team Lead & Developer",
    achievement: "4th Place · Smart Bengal Hackathon 2025 · RCCIIT Grand Finals",
    year: "2025",
    link: "https://truth-scope-pro.vercel.app/"
  },
  {
    id: 6,
    number: "06",
    title: "CipherClash",
    description:
      "Competitive real-time Bulls & Cows logic puzzle game with ELO leaderboard, PvP/PvE modes, Redis-backed room persistence and NextAuth OAuth.",
    techStack: ["Next.js", "Socket.io", "Redis", "Supabase", "Framer Motion", "Zustand"],
    role: "Full-Stack Developer",
    achievement: "AntiGravity Hackathon · 2026",
    year: "2026",
    link: "https://cipher.sujayx07.xyz/"
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
    title: "Google Campus Expert",
    period: "Aug 2025 – Present",
    org: "Google",
    detail: "Led AI literacy workshops for 900+ students across campus communities.",
  },
  {
    title: "Tech Co-Lead & Full Stack Developer",
    period: "Jan 2024 – Present",
    org: "Samarth Educational Society, TMSL",
    detail: "Drove 30% growth in community traffic and led Pravidhi, Photography, and Graphics teams.",
  },
  {
    title: "Project Admin & Open Source Maintainer",
    period: "May 2024 – Aug 2024",
    org: "Hacktoberfest 2024 (MLH Event)",
    detail: "Managed 250+ participants and improved repository quality by 45%.",
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

export const profileLinks = {
  // Keep this URL stable (e.g. cloud file link) and replace file contents remotely.
  resumeUrl:
    process.env.NEXT_PUBLIC_RESUME_URL ||
    "https://drive.google.com/file/d/1p2Kh6E2puutM6QTOmJQ1ehs-vuJMO4M5/view?usp=drive_link",
  resumeFileName: "Sujay_Dey_Resume.pdf",
};

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
