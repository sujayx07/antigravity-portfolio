import type { Metadata } from "next";
import Script from "next/script";
import { Cormorant_Garamond, Syne, DM_Mono } from "next/font/google";
import "./globals.css";
import {
  personalProfile,
  profileLinks,
  projects,
  skillCategories,
} from "@/lib/data";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-dm-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sujayx07.xyz"),
  applicationName: "Sujay Dey Portfolio",
  title: {
    default: "Sujay Dey | Full-Stack Developer Portfolio | sujayx07",
    template: "%s | Sujay Dey",
  },
  description:
    "Portfolio of Sujay Dey (sujayx07), a Creative Frontend Developer and Full-Stack Engineer from Kolkata. SIH 2025 National Winner, Google Gemini Campus Ambassador, and multiple hackathon champion building scalable AI-powered web products.",
  keywords: [
    "Sujay Dey",
    "sujayx07",
    "Sujay Dey portfolio",
    "Full-Stack Developer",
    "Creative Frontend Developer",
    "Software Developer Portfolio",
    "Frontend Developer",
    "Software Engineer Kolkata",
    "AI Developer India",
    "Hackathon Champion",
    "SIH 2025 Winner",
    "Google Gemini Campus Ambassador",
    "Campus Expert, Google",
     "Open Source Contributor",
     "Web Developer Portfolio",
     "React Developer Portfolio",
     "Next.js Developer Portfolio",
    "React Developer",
    "Next.js Developer",
    "TypeScript Developer",
  ],
  authors: [{ name: "Sujay Dey (sujayx07)", url: personalProfile.linkedin }],
  creator: personalProfile.name,
  publisher: personalProfile.name,
  category: "technology",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: personalProfile.website,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Sujay Dey (sujayx07) | Full-Stack Developer Portfolio",
    description:
      "Explore projects, achievements, and engineering work by Sujay Dey: SIH 2025 National Winner, Gemini Campus Ambassador, and full-stack developer.",
    url: personalProfile.website,
    siteName: "Sujay Dey Portfolio",
    images: [
      {
        url: "/og-image.jpeg",
        width: 1200,
        height: 630,
        alt: "Sujay Dey (sujayx07) - Creative Developer & Full-Stack Engineer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sujay Dey (sujayx07) | Full-Stack Developer",
    description:
      "Creative Frontend Developer and Full-Stack Engineer building AI-powered web products.",
    images: ["/og-image.jpeg"],
    creator: "@sujayx07",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const knowsAbout = [
    ...skillCategories.languages,
    ...skillCategories.frameworks,
    ...skillCategories.technologies,
    ...skillCategories.core,
  ];

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: personalProfile.name,
    url: personalProfile.website,
    email: personalProfile.email,
    telephone: personalProfile.phone,
    jobTitle: personalProfile.headline,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kolkata",
      addressRegion: "West Bengal",
      addressCountry: "IN",
    },
    sameAs: [
      personalProfile.linkedin,
      personalProfile.github,
      personalProfile.x,
      profileLinks.resumeUrl,
    ],
    knowsAbout,
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Sujay Dey Portfolio",
    url: personalProfile.website,
    inLanguage: "en-IN",
    publisher: {
      "@type": "Person",
      name: personalProfile.name,
    },
  };

  const projectSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Featured Projects by Sujay Dey",
    itemListElement: projects.map((project, index) => ({
      "@type": "CreativeWork",
      position: index + 1,
      name: project.title,
      description: project.description,
      url: project.link,
      datePublished: `${project.year}-01-01`,
      keywords: project.techStack.join(", "),
      creator: personalProfile.name,
    })),
  };

  return (
    <html
      lang="en-IN"
      className={`${cormorant.variable} ${syne.variable} ${dmMono.variable}`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        <Script
          id="person-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personSchema).replace(/</g, "\\u003c"),
          }}
        />
        <Script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema).replace(/</g, "\\u003c"),
          }}
        />
        <Script
          id="projects-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(projectSchema).replace(/</g, "\\u003c"),
          }}
        />
        {children}
      </body>
    </html>
  );
}
