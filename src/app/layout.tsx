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
  title: "Sujay Dey — Creative Developer & Full-Stack Engineer",
  description:
    "Portfolio of Sujay Dey — Creative Frontend Developer, Full-Stack Engineer, 6× Hackathon Champion, SIH 2025 National Champion, and Google Gemini Campus Ambassador. Building scalable full-stack applications.",
  keywords: [
    "Sujay Dey",
    "portfolio",
    "full-stack developer",
    "frontend developer",
    "hackathon champion",
    "SIH 2025",
    "Google Gemini",
    "Next.js",
    "React",
  ],
  authors: [{ name: "Sujay Dey", url: "https://linkedin.com/in/sujayx07" }],
  openGraph: {
    title: "Sujay Dey — Creative Developer",
    description:
      "A Developer Dedicated to Crafting Scalable Full Stack Applications",
    type: "website",
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
