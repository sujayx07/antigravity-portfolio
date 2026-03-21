"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import SectionTransition from "@/components/ui/SectionTransition";

// 21st.dev Text Reveal — "Split by lines" pattern
function TextRevealLine({
  children,
  delay = 0,
  isItalic = false,
  isLarge = false,
}: {
  children: React.ReactNode;
  delay?: number;
  isItalic?: boolean;
  isLarge?: boolean;
}) {
  return (
    <div className="overflow-hidden">
      <motion.div
        initial={{ y: "110%" }}
        animate={{ y: "0%" }}
        transition={{
          duration: 0.9,
          ease: [0.77, 0, 0.175, 1],
          delay,
        }}
        className={`${isItalic ? "italic" : ""} ${isLarge ? "text-[1.1em]" : ""}`}
      >
        {children}
      </motion.div>
    </div>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Parallax: headline moves at 0.4x
  const headlineY = useTransform(scrollYProgress, [0, 1], [0, -200]);
  // Sub-tagline at 0.6x
  const subY = useTransform(scrollYProgress, [0, 1], [0, -300]);
  // HR at 0.8x + fade + slide left
  const hrY = useTransform(scrollYProgress, [0, 1], [0, -400]);
  const hrOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const hrX = useTransform(scrollYProgress, [0, 0.5], [0, -200]);

  const lines = [
    { text: "Hi, I'm", delay: 1.0 },
    { text: "Sujay Dey.", delay: 1.08 },
    { text: "A developer dedicated", delay: 1.16 },
    { text: "to crafting ", delay: 1.24, hasScalable: true },
    { text: "full-stack applications.", delay: 1.32 },
  ];

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="section-white relative min-h-screen flex items-center overflow-hidden"
    >
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-10 py-20">
        <motion.div style={{ y: headlineY }} className="max-w-[900px]">
          <h1 className="font-display" style={{ fontSize: "clamp(2.6rem, 9vw, 7rem)", lineHeight: 1.05 }}>
            {lines.map((line, i) => (
              <TextRevealLine key={i} delay={line.delay}>
                {line.hasScalable ? (
                  <>
                    to crafting{" "}
                    <span className="italic" style={{ fontSize: "1.05em" }}>scalable</span>
                  </>
                ) : (
                  line.text
                )}
              </TextRevealLine>
            ))}
          </h1>
        </motion.div>

        {/* Sub-tagline */}
        <motion.div style={{ y: subY }}>
          <motion.p
            className="font-mono text-xs md:text-sm tracking-[0.12em] text-gray-400 mt-8 md:mt-12 max-w-[650px] leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2, duration: 1, ease: [0.19, 1, 0.22, 1] }}
          >
            Google Gemini Campus Ambassador · SIH&apos;25 Winner · 6× Hackathon
            Champion
          </motion.p>
          
          {/* Mobile-only CTA */}
          <motion.a
            href="#about"
            className="md:hidden inline-flex items-center gap-3 mt-8 group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.5, duration: 0.8 }}
          >
            <span className="font-mono text-xs tracking-[0.15em] uppercase text-gray-600 group-active:text-gray-900 transition-colors">See My Work</span>
            <motion.span
              className="font-mono text-base text-gray-400"
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              ↓
            </motion.span>
          </motion.a>
        </motion.div>

        {/* HR line */}
        <motion.div
          className="mt-12 md:mt-16"
          style={{ y: hrY, opacity: hrOpacity, x: hrX }}
        >
          <motion.div
            className="h-px bg-black/20 w-full max-w-[400px]"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{
              delay: 2.2,
              duration: 1,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{ transformOrigin: "left" }}
          />
        </motion.div>
      </div>

      {/* Scroll indicator - hidden on smaller phones */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 hidden sm:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 0.8 }}
      >
        <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-gray-500">
          Scroll
        </span>
        <motion.div
          className="w-px h-8 bg-black/30"
          animate={{ scaleY: [1, 0.3, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "top" }}
        />
      </motion.div>

      <SectionTransition from="white" to="black" />
    </section>
  );
}
