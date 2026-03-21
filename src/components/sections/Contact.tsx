"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { experiences } from "@/lib/data";
import { ShootingStars } from "@/components/ui/shooting-stars";

// Wave hover effect on email text
function WaveEmail({ email }: { email: string }) {
  const [isHovered, setIsHovered] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [email]);

  return (
    <motion.button
      className="font-mono text-lg md:text-2xl tracking-wider text-white/80 hover:text-white transition-colors"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCopy}
      data-cursor-label={copied ? "✓" : "COPY"}
    >
      {email.split("").map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          animate={
            isHovered
              ? {
                  y: [0, -5, 0],
                }
              : { y: 0 }
          }
          transition={{
            duration: 0.3,
            delay: i * 0.02,
            ease: "easeOut",
          }}
        >
          {char}
        </motion.span>
      ))}
      {copied && (
        <motion.span
          className="ml-3 text-sm text-white/60"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
        >
          Copied!
        </motion.span>
      )}
    </motion.button>
  );
}

// Social link with underline draw
function SocialLink({ label, href }: { label: string; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="underline-draw font-ui text-sm uppercase tracking-[0.15em] text-white/60 hover:text-white active:text-white transition-colors py-3 px-2 min-h-[44px] flex items-center"
      data-cursor-expand
    >
      {label}
    </a>
  );
}

export default function Contact() {
  const headlineLines = ["Let's build", "something", "remarkable."];

  return (
    <section
      id="contact"
      className="section-black relative py-20 md:py-32 min-h-screen flex flex-col justify-center overflow-hidden"
    >
      {/* Background with shooting stars and a teal radial gradient */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,255,195,0.06)_0%,rgba(0,0,0,0)_70%)]" />
        <div 
          className="absolute inset-0 opacity-40 mix-blend-screen" 
          style={{
            backgroundImage: `radial-gradient(1px 1px at 20px 30px, #fff, rgba(0,0,0,0)), radial-gradient(1px 1px at 40px 70px, rgba(255,255,255,0.5), rgba(0,0,0,0)), radial-gradient(1.5px 1.5px at 150px 160px, rgba(255,255,255,0.8), rgba(0,0,0,0)), radial-gradient(1px 1px at 90px 40px, #fff, rgba(0,0,0,0)), radial-gradient(2px 2px at 130px 80px, rgba(0,255,195,0.8), rgba(0,0,0,0)), radial-gradient(1px 1px at 160px 120px, rgba(255,255,255,0.6), rgba(0,0,0,0))`,
            backgroundRepeat: "repeat",
            backgroundSize: "200px 200px"
          }}
        />
        <ShootingStars
          starColor="#00ffc3"
          trailColor="rgba(255, 255, 255, 0.2)"
          minSpeed={15}
          maxSpeed={35}
          minDelay={1000}
          maxDelay={3000}
        />
        <ShootingStars
          starColor="#ffffff"
          trailColor="#00ffc3"
          minSpeed={20}
          maxSpeed={40}
          minDelay={2000}
          maxDelay={5000}
        />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 w-full relative z-10">
        {/* Experience cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16 md:mb-32">
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              className="border border-white/10 rounded-2xl p-6 md:p-8 bg-black"
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
                type: "spring",
                stiffness: 200,
                damping: 20,
              }}
            >
              <h3 className="font-display text-lg text-white italic mb-2">
                {exp.title}
              </h3>
              <p className="font-mono text-[11px] text-white/40 tracking-wider mb-1">
                {exp.period} · {exp.org}
              </p>
              <p className="font-mono text-xs text-white/50 leading-relaxed mt-3">
                {exp.detail}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Contact headline — cinematic reveal (white on black) */}
        <div className="text-center mb-16 md:mb-24 px-4 h-auto min-h-[30vh] flex flex-col justify-center">
          {headlineLines.map((line, i) => (
            <div key={i} className="overflow-visible md:overflow-hidden h-auto py-3">
              <motion.h2
                className="font-display italic text-white leading-[1.1]" style={{ fontSize: 'clamp(2.4rem, 11vw, 6rem)' }}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
                transition={{
                  duration: 1.4,
                  ease: [0.19, 1, 0.22, 1],
                  delay: i * 0.12,
                }}
              >
                {line}
              </motion.h2>
            </div>
          ))}
        </div>

        {/* Email with wave hover */}
        <div className="text-center mb-12 py-4">
          <WaveEmail email="sujayx07@gmail.com" />
        </div>

        {/* Social links */}
        <motion.div
          className="flex items-center justify-center gap-10 md:gap-12 mb-16 md:mb-20 flex-wrap"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <SocialLink label="GitHub" href="https://github.com/sujayx07" />
          <SocialLink
            label="LinkedIn"
            href="https://linkedin.com/in/sujayx07"
          />
          <SocialLink label="Twitter / X" href="https://x.com/sujayx07" />
        </motion.div>

        {/* Footer */}
        <motion.div
          className="text-right"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <p className="font-mono text-[11px] text-white/30 tracking-wider">
            © 2025 sujayx07 · Built with obsession.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
