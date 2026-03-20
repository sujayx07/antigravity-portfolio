"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useCounter } from "@/lib/utils";
import SectionTransition from "@/components/ui/SectionTransition";
import { ShootingStars } from "@/components/ui/shooting-stars";

// 21st.dev Word-by-word blur reveal
function BlurReveal({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.3em]"
          initial={{ filter: "blur(8px)", opacity: 0, y: 10 }}
          whileInView={{ filter: "blur(0px)", opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
            delay: i * 0.03,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

// 21st.dev Spotlight Card with Border Glow
function SpotlightCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const div = divRef.current;
    const rect = div.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={`relative overflow-hidden rounded-[24px] border border-white/10 bg-[#060606] p-6 md:p-8 shadow-2xl ${className}`}
      whileHover={{ scale: 0.99 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
    >
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-0"
        style={{
          opacity,
          background: `radial-gradient(500px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.08), transparent 40%)`,
        }}
      />
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay z-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/%3E%3C/svg%3E")' }} />
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
}

// Orbital skill tag perfectly counter-rotating
function OrbitTag({
  label,
  delay,
  duration,
  radius = 110,
}: {
  label: string;
  delay: number;
  duration: number;
  radius?: number;
}) {
  return (
    <motion.div
      className="absolute top-1/2 left-1/2 flex items-center justify-start pointer-events-none z-10"
      style={{
        width: radius * 2,
        height: 2,
        marginLeft: -radius,
        marginTop: -1,
      }}
      animate={{ rotate: [0, 360] }}
      transition={{ duration, repeat: Infinity, ease: "linear", delay }}
    >
      {/* Counter rotation keeps the text upright while orbiting */}
      <motion.div
        className="absolute -left-8 bg-black/80 backdrop-blur-sm px-3 py-1.5 font-mono text-[9px] md:text-[11px] tracking-wider text-white/90 whitespace-nowrap rounded-lg border border-white/10 shadow-[0_4px_12px_rgba(255,255,255,0.05)]"
        animate={{ rotate: [360, 0] }}
        transition={{ duration, repeat: Infinity, ease: "linear", delay }}
      >
        {label}
      </motion.div>
    </motion.div>
  );
}

// 21st.dev Animated Wireframe Globe (Self Contained)
function WireframeGlobe() {
  return (
    <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full border border-white/20 flex items-center justify-center overflow-hidden bg-black/50">
      <motion.div 
        className="absolute w-[200%] h-full border border-white/20 rounded-[50%]"
        animate={{ rotateY: [0, 360] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      />
      <motion.div 
        className="absolute w-[200%] h-full border border-white/20 rounded-[50%]"
        animate={{ rotateY: [60, 420] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      />
      <div className="absolute w-full h-[30%] border-y border-white/20 rounded-[50%]" />
    </div>
  )
}

// Counter card
function CounterCard({
  target,
  label,
  suffix = "+",
}: {
  target: number;
  label: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const count = useCounter(target, inView);

  return (
    <div ref={ref} className="text-center">
      <div className="flex items-baseline justify-center gap-1">
        <span className="font-display text-5xl md:text-6xl font-light italic text-white">
          {count}
        </span>
        <motion.span
          className="font-mono text-lg text-white/60"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 2.2, duration: 0.5 }}
        >
          {suffix}
        </motion.span>
      </div>
      <p className="font-mono text-xs tracking-wider text-white/50 mt-2 uppercase">
        {label}
      </p>
    </div>
  );
}

export default function About() {
  const skillTags = [
    "User Experience",
    "Design Thinking",
    "Creativity",
    "Digital Craft",
    "Creative Solutions",
  ];

  return (
    <section
      id="about"
      className="section-black relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden"
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

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative z-10">
        {/* Section title */}
        <motion.h2
          className="text-section-title font-display italic mb-12 md:mb-20 bg-gradient-to-b from-white to-white/20 bg-clip-text text-transparent"
          initial={{ x: -60, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          About.
        </motion.h2>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 auto-rows-min">
          {/* Cell A — Bio (col 1-7, row 1-2) */}
          <SpotlightCard className="md:col-span-7 md:row-span-2 flex flex-col justify-end">
            <h3 className="font-display italic text-3xl md:text-4xl tracking-wide text-white mb-2">
              Sujay Dey
            </h3>
            <p className="font-mono text-xs text-[#00ffc3]/70 tracking-widest mb-8 uppercase">
              Creative Frontend Developer &middot; Full-Stack Engineer
            </p>
            <div className="font-sans font-light text-base md:text-xl text-white/80 leading-relaxed max-w-2xl">
              <BlurReveal text="B.Tech CSE (IoT) student at Techno Main Salt Lake. Full-Stack Developer obsessed with building experiences that feel alive. Google Gemini Campus Ambassador. 6x Hackathon winner. Open source contributor. I write code that ships." />
            </div>
          </SpotlightCard>

          {/* Cell B — Rotating skill tags (col 7-13, row 1) */}
          <SpotlightCard className="md:col-span-5 min-h-[260px] md:min-h-[300px] flex items-center justify-center">
            <div className="relative w-full h-full flex items-center justify-center scale-90 md:scale-100">
              {/* Inner subtle glow for the orbital center */}
              <div className="absolute w-20 h-20 rounded-full bg-white/5 blur-[30px]" />
              {skillTags.map((tag, i) => (
                <OrbitTag
                  key={tag}
                  label={tag}
                  delay={-(i * 2)}
                  duration={14 + (i % 2) * 6}
                  radius={75 + i * 16}
                />
              ))}
              <span className="font-mono text-[10px] text-[#00ffc3]/50 tracking-[0.3em] uppercase z-0 border border-white/10 rounded-full w-14 h-14 flex items-center justify-center bg-black/80 backdrop-blur-md shadow-[0_0_30px_rgba(0,255,195,0.1)]">
                CORE
              </span>
            </div>
          </SpotlightCard>

          {/* Cell C — Location (col 8-10, row 2) */}
          <SpotlightCard className="md:col-span-3 flex flex-col justify-between min-h-[220px]">
            <div>
              <p className="font-mono text-[10px] text-white/40 tracking-widest uppercase mb-2">
                Location
              </p>
              <p className="font-display text-2xl text-white italic">
                Kolkata, IN
              </p>
              <p className="font-mono text-[10px] text-[#00ffc3]/50 mt-1 uppercase tracking-widest">
                Available Globally
              </p>
            </div>
            <div className="mt-4 flex justify-end">
               <WireframeGlobe />
            </div>
          </SpotlightCard>

          {/* Cell D — Stats (col 10-13, row 2) */}
          <SpotlightCard className="md:col-span-2 flex flex-col items-center justify-center gap-10 min-h-[220px]">
             <div className="w-full h-full flex flex-col items-center justify-center gap-8">
               <CounterCard target={10} label="Hackathons" />
               <div className="w-12 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
               <CounterCard target={6} label="First Places" />
             </div>
          </SpotlightCard>

          {/* Cell E — Role cards (col 1-7, row 3) */}
          <SpotlightCard className="md:col-span-7 flex flex-col justify-center min-h-[200px]">
            <p className="font-mono text-[10px] text-white/40 tracking-widest uppercase mb-6">
              Active Roles & Contributions
            </p>
            <div className="flex flex-wrap gap-3 md:gap-4">
              {[
                "Google Gemini Campus Ambassador",
                "Tech Co-Lead @ Samarth",
                "MLH Open Source Admin",
              ].map((role) => (
                <span
                  key={role}
                  className="font-sans text-xs md:text-sm tracking-wide text-white/90 bg-white/5 border border-white/10 rounded-full px-5 py-2.5 hover:bg-white/10 hover:border-white/20 transition-all duration-300 cursor-default"
                >
                  {role}
                </span>
              ))}
            </div>
          </SpotlightCard>

          {/* Cell F — Currently building (col 7-13, row 3) */}
          <SpotlightCard className="md:col-span-5 flex flex-col justify-center min-h-[200px]">
            <p className="font-mono text-[10px] text-white/40 tracking-widest uppercase mb-6">
              Currently Building
            </p>
            <div className="space-y-4">
              {["CipherClash", "InsightAI"].map((project) => (
                <div
                  key={project}
                  className="flex items-center gap-4 group cursor-default"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-[#00ffc3] shadow-[0_0_10px_rgba(0,255,195,0.6)] group-hover:scale-150 transition-transform duration-300" />
                  <span className="font-display text-2xl text-white/80 group-hover:text-white transition-colors duration-300 italic">
                    {project}
                  </span>
                </div>
              ))}
            </div>
          </SpotlightCard>
        </div>
      </div>

      <SectionTransition from="black" to="white" />
    </section>
  );
}
