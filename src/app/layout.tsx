import type { Metadata } from "next";
import { Cormorant_Garamond, Syne, DM_Mono } from "next/font/google";
import "./globals.css";

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
  title: {
    default: "Sujay Dey | sujayx07-Creative Developer & Full-Stack Engineer",
    template: "%s | Sujay Dey"
  },
  description:
    "Portfolio of Sujay Dey (sujayx07) — Creative Frontend Developer, Full-Stack Engineer, 6× Hackathon Champion, SIH 2025 National Champion, and Google Gemini Campus Ambassador. Building scalable full-stack web applications and seamless UX/UI designs.",
  keywords: [
    "Sujay Dey",
    "sujayx07",
    "Sujay Dey portfolio",
    "Creative Developer",
    "Full-Stack Engineer",
    "Frontend Developer",
    "Software Engineer India",
    "Hackathon Champion",
    "SIH 2025 Winner",
    "Google Gemini Campus Ambassador",
    "React Developer",
    "Next.js Expert"
  ],
  authors: [{ name: "Sujay Dey (sujayx07)", url: "https://linkedin.com/in/sujayx07" }],
  creator: "Sujay Dey",
  publisher: "Sujay Dey",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Sujay Dey (sujayx07) — Full-Stack Engineer",
    description:
      "A Creative Developer Dedicated to Crafting Scalable Full Stack Applications & Award-Winning Digital Experiences.",
    url: "https://sujayx07.xyz",
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
    title: "Sujay Dey (sujayx07) — Creative Developer",
    description: "Creative Frontend Developer & Full-Stack Engineer. 6× Hackathon Champion.",
    images: ["/og-image.jpeg"],
    creator: "@sujayx07", // Update this to actual twitter handle if known, or user can replace
  },
  alternates: {
    canonical: "https://sujayx07.xyz",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${syne.variable} ${dmMono.variable}`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
