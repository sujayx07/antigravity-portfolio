"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useCounter } from "@/lib/utils";
import SectionTransition from "@/components/ui/SectionTransition";
import { ShootingStars } from "@/components/ui/shooting-stars";
import KolkataTimeCard from "@/components/ui/KolkataTimeCard";

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
  delay = 0,
  duration = 20,
  radius = 110,
}: {
  label: string;
  delay?: number;
  duration?: number;
  radius?: number;
}) {
  const startAngle = (delay / duration) * 360;

  return (
    <>
      {/* 🟢 VISIBLE SECRETE ORBIT RING */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.04] pointer-events-none"
        style={{ width: radius * 2, height: radius * 2 }}
      />
      
      {/* 🔵 ROTATING PIVOT CONTAINER */}
      <motion.div
        className="absolute top-1/2 left-1/2 flex items-center justify-start pointer-events-none z-10"
        style={{ width: radius * 2, height: 1, marginLeft: -radius }}
        initial={{ rotate: startAngle }}
        animate={{ rotate: [startAngle, startAngle + 360] }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
      >
        {/* 🟣 THE TAG ITSELF (COUNTER-ROTATING to stay completely level!) */}
        <motion.div
          className="absolute left-0 w-0 h-0 flex items-center justify-center -translate-x-1/2 pointer-events-none"
          initial={{ rotate: -startAngle }}
          animate={{ rotate: [-startAngle, -(startAngle + 360)] }}
          transition={{ duration, repeat: Infinity, ease: "linear" }}
        >
          <div className="bg-black/95 backdrop-blur-xl px-4 py-2 font-mono text-[10px] md:text-xs tracking-widest uppercase text-white/90 whitespace-nowrap rounded-full border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.8)] flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#00ffc3]/80 shadow-[0_0_10px_rgba(0,255,195,0.6)]" />
            {label}
          </div>
        </motion.div>
      </motion.div>
    </>
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
        <div className="grid grid-cols-1 md:grid-cols-12 auto-rows-[250px] md:auto-rows-[160px] gap-4 md:gap-6 mt-12 w-full">
          {/* Top Left: Main Bio Card */}
          <SpotlightCard className="md:col-span-7 md:row-span-2 flex flex-col justify-end w-full h-full p-8 md:p-10">
            <h3 className="font-display italic text-4xl md:text-5xl tracking-wide text-white mb-3">
              Sujay Dey
            </h3>
            <p className="font-mono text-xs md:text-sm text-[#00ffc3]/80 tracking-widest mb-8 md:mb-12 uppercase font-bold">
              Creative Frontend Developer &middot; Full-Stack Engineer
            </p>
            <div className="font-sans font-light text-lg md:text-xl text-white/80 leading-relaxed max-w-2xl">
              <BlurReveal text="B.Tech CSE (IoT) student at Techno Main Salt Lake. Full-Stack Developer obsessed with building experiences that feel alive. Google Gemini Campus Ambassador. 6x Hackathon winner. Open source contributor. I write code that ships." />
            </div>
          </SpotlightCard>

          {/* Top Right: KolkataTimeCard */}
          <SpotlightCard className="md:col-span-5 md:row-span-2 w-full h-full relative !p-0">
            <KolkataTimeCard />
          </SpotlightCard>

          {/* Bottom Left: Skill Orbit Constellation */}
          <SpotlightCard className="md:col-span-5 md:row-span-2 w-full h-full flex flex-col items-center justify-center relative overflow-hidden p-0">
            <div className="absolute inset-0 w-full h-full flex items-center justify-center scale-[0.60] sm:scale-75 md:scale-[0.80] lg:scale-95">
              <div className="absolute w-40 h-40 rounded-full bg-[#00ffc3]/5 blur-[60px]" />
              
              {/* Calculate exact mathematical delays so they orbit perfectly spaced like spokes on a wheel */}
              {skillTags.map((tag, i) => (
                <OrbitTag
                  key={tag}
                  label={tag}
                  delay={i * (24 / skillTags.length)}  // e.g., 0, 4.8, 9.6...
                  duration={24}  // 24 seconds for one full slow loop
                  radius={100 + i * 36} // 100, 136, 172, 208, 244
                />
              ))}

              {/* Central CORE star */}
              <span className="shrink-0 font-mono text-[10px] md:text-xs font-bold text-[#00ffc3]/80 tracking-[0.4em] uppercase z-20 border border-[#00ffc3]/20 rounded-full w-20 h-20 md:w-24 md:h-24 flex items-center justify-center bg-black/60 backdrop-blur-md shadow-[0_0_50px_rgba(0,255,195,0.15)] pl-1 pointer-events-none">
                CORE
              </span>
            </div>
          </SpotlightCard>

          {/* Bottom Middle: Stats */}
          <SpotlightCard className="md:col-span-3 md:row-span-2 w-full h-full flex flex-col items-center justify-center gap-6 md:gap-8 p-6">
             <div className="w-full flex md:flex-col items-center justify-between md:justify-center gap-4 md:gap-8 mt-auto md:mt-0">
               <CounterCard target={10} label="Hackathons" />
               <div className="w-px h-12 md:w-16 md:h-px bg-gradient-to-b md:bg-gradient-to-r from-transparent via-white/20 to-transparent" />
               <CounterCard target={6} label="First Places" />
             </div>
          </SpotlightCard>

          {/* Bottom Right: Roles & Currently building */}
          <SpotlightCard className="md:col-span-4 md:row-span-2 w-full h-full flex flex-col justify-between pt-6 pb-6 md:pt-8 md:pb-8 px-6 md:px-8">
            <div className="w-full">
              <p className="font-mono text-[11px] md:text-xs text-white/40 tracking-[0.25em] uppercase font-bold mb-4 flex items-center gap-3">
                <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-sm bg-[#00ffc3]/40" />
                Active Roles
              </p>
              <div className="flex flex-col gap-3">
                {[
                  "Google Gemini Campus Ambassador",
                  "Tech Co-Lead @ Samarth",
                ].map((role) => (
                  <div key={role} className="flex items-center gap-3 group cursor-default">
                    <span className="text-white/20 group-hover:text-[#00ffc3] transition-colors duration-300 font-mono text-sm">▹</span>
                    <span className="font-sans font-light text-[14px] md:text-[15px] tracking-wide text-white/70 group-hover:text-white transition-colors duration-300">
                      {role}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="w-full mt-auto pt-6 md:pt-8">
              <p className="font-mono text-[11px] md:text-xs text-white/40 tracking-[0.25em] uppercase font-bold mb-4 flex items-center gap-3">
                <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-sm bg-[#00ffc3]/40" />
                Currently Building
              </p>
              <div className="flex flex-col gap-3">
                {["CipherClash", "InsightAI"].map((project) => (
                  <div
                    key={project}
                    className="flex justify-between items-center group cursor-default px-4 py-3 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.06] hover:border-white/10 transition-all duration-300"
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative flex h-2 w-2 shadow-[0_0_8px_rgba(0,255,195,0.8)] rounded-full">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00ffc3] opacity-50"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00ffc3]"></span>
                      </div>
                      <span className="font-display text-[1.15rem] md:text-xl tracking-wide text-white/80 group-hover:text-white transition-colors duration-300 italic">
                        {project}
                      </span>
                    </div>
                    {/* Minimalist reveal arrow */}
                    <div className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out">
                       <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-[#00ffc3]/80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </SpotlightCard>
        </div>
      </div>

      <SectionTransition from="black" to="white" />
    </section>
  );
}
