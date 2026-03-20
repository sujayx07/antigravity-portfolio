"use client";

import { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import PageLoader from "@/components/ui/PageLoader";
import ScrollProgress from "@/components/ui/ScrollProgress";
import Navbar from "@/components/ui/Navbar";
import CustomCursor from "@/components/ui/CustomCursor";
import BackToTop from "@/components/ui/BackToTop";

// Lazy load sections for performance
const Hero = dynamic(() => import("@/components/sections/Hero"), {
  ssr: false,
});
const About = dynamic(() => import("@/components/sections/About"), {
  ssr: false,
});
const Projects = dynamic(() => import("@/components/sections/Projects"), {
  ssr: false,
});
const Skills = dynamic(() => import("@/components/sections/Skills"), {
  ssr: false,
});
const Achievements = dynamic(
  () => import("@/components/sections/Achievements"),
  { ssr: false }
);
const Contact = dynamic(() => import("@/components/sections/Contact"), {
  ssr: false,
});

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  const handleLoadComplete = useCallback(() => {
    setIsLoading(false);
    // Small delay before showing content for smooth transition
    setTimeout(() => setShowContent(true), 200);
  }, []);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    if (!showContent) return;

    let lenis: any;
    let rafId: number;

    const initLenis = async () => {
      try {
        const Lenis = (await import("lenis")).default;
        lenis = new Lenis({
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
        });

        function raf(time: number) {
          lenis.raf(time);
          rafId = requestAnimationFrame(raf);
        }

        rafId = requestAnimationFrame(raf);
      } catch (e) {
        console.warn("Lenis not available, using native scroll");
      }
    };

    // Tiny delay for DOM stabilization
    const timer = setTimeout(initLenis, 100);

    return () => {
      clearTimeout(timer);
      if (rafId) cancelAnimationFrame(rafId);
      if (lenis) lenis.destroy();
    };
  }, [showContent]);

  return (
    <>
      {isLoading && <PageLoader onComplete={handleLoadComplete} />}

      {showContent && (
        <>
          <CustomCursor />
          <ScrollProgress />
          <Navbar />
          <BackToTop />

          <main>
            <Hero />
            <About />
            <Projects />
            <Skills />
            <Achievements />
            <Contact />
          </main>
        </>
      )}
    </>
  );
}

