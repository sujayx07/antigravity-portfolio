"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { projects } from "@/lib/data";
import SectionTransition from "@/components/ui/SectionTransition";

// 3D Tilt card (21st.dev TiltCard pattern)
function TiltCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, { stiffness: 150, damping: 20 });
  const springRotateY = useSpring(rotateY, { stiffness: 150, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    rotateX.set((e.clientY - centerY) * -0.015);
    rotateY.set((e.clientX - centerX) * 0.015);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformPerspective: 1000,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );
}

function ProjectPanel({
  project,
  direction,
}: {
  project: (typeof projects)[0];
  direction: number;
}) {
  const isMobile = direction === 0;

  if (isMobile) {
    return (
      <div className="relative h-full flex flex-col justify-center">
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0 z-50 rounded-xl"
            aria-label={`Visit project ${project.title}`}
          />
        )}

        <motion.span
          className="absolute top-0 right-0 font-display text-[22vw] font-light text-black/[0.05] leading-none select-none pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {project.number}
        </motion.span>

        <motion.h3
          className="font-display text-[12vw] font-light leading-[1.05] mb-5 pr-4"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          key={project.id + "-title-mobile"}
        >
          {project.title}
        </motion.h3>

        <motion.p
          className="font-mono text-sm leading-relaxed text-black/60 mb-7"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.35 }}
          key={project.id + "-desc-mobile"}
        >
          {project.description}
        </motion.p>

        <motion.div
          className="flex flex-wrap gap-2 mb-6"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.35 }}
          key={project.id + "-tech-mobile"}
        >
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="font-mono text-[11px] px-2.5 py-1.5 border border-black/20 rounded-full"
            >
              {tech}
            </span>
          ))}
        </motion.div>

        <motion.span
          className="font-ui text-[11px] uppercase tracking-[0.15em] text-black/50 mb-3 block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.25 }}
          key={project.id + "-role-mobile"}
        >
          {project.role}
        </motion.span>

        {project.achievement && (
          <motion.div
            className="flex items-center gap-2"
            initial={{ x: 14, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            key={project.id + "-achievement-mobile"}
          >
            <span className="text-base">🏆</span>
            <span className="font-mono text-[11px] text-black/60 leading-relaxed">
              {project.achievement}
            </span>
          </motion.div>
        )}
      </div>
    );
  }

  return (
    <TiltCard className="relative h-full flex flex-col justify-center cursor-pointer group">
      {/* Invisible Link Overlay */}
      {project.link && (
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0 z-50 rounded-xl"
          data-cursor-label="VISIT" // Shows VISIT on custom cursor when hovered
          aria-label={`Visit project ${project.title}`}
        />
      )}
      {/* Large ghost number */}
      <motion.span
        className="absolute top-0 right-0 font-display text-[15vw] md:text-[10vw] font-light text-black/[0.06] leading-none select-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {project.number}
      </motion.span>

      {/* Title */}
      <motion.h3
        className="font-display text-[8vw] md:text-[5vw] font-light leading-[1.1] mb-6"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -40, opacity: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        key={project.id + "-title"}
      >
        {project.title}
      </motion.h3>

      {/* Description */}
      <motion.p
        className="font-mono text-sm leading-relaxed text-black/60 max-w-[500px] mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        key={project.id + "-desc"}
      >
        {project.description}
      </motion.p>

      {/* Tech tags */}
      <motion.div
        className="flex flex-wrap gap-2 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        key={project.id + "-tech"}
      >
        {project.techStack.map((tech) => (
          <span
            key={tech}
            className="font-mono text-xs px-3 py-1.5 border border-black/20 rounded-full"
          >
            {tech}
          </span>
        ))}
      </motion.div>

      {/* Role */}
      <motion.span
        className="font-ui text-xs uppercase tracking-[0.15em] text-black/50 mb-3 block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        key={project.id + "-role"}
      >
        {project.role}
      </motion.span>

      {/* Achievement */}
      {project.achievement && (
        <motion.div
          className="flex items-center gap-2"
          initial={{ x: 30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          key={project.id + "-achievement"}
        >
          <span className="text-lg">🏆</span>
          <span className="font-mono text-xs text-black/60">
            {project.achievement}
          </span>
        </motion.div>
      )}
    </TiltCard>
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Ribbon rotation: full 360 degrees over section scroll
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });
  const ribbonRotateY = useTransform(smoothProgress, [0, 1], [0, 360]);
  const ribbonY = useTransform(smoothProgress, [0, 1], [0, -100]);

  // Map progress to index with extra "wait" time at each project
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) => {
      const total = projects.length;
      const step = 1 / total;

      // Calculate current project index with a small buffer
      let index = Math.floor(v / step);
      index = Math.max(0, Math.min(index, total - 1));

      setActiveIndex(index);
    });
    return unsubscribe;
  }, [scrollYProgress, projects.length]);

  return (
    <section ref={sectionRef} id="projects" className="section-white relative">
      <style jsx>{`
        section {
          height: auto;
        }
        @media (min-width: 768px) {
          section {
            height: ${projects.length *
            75}vh !important; /* 75vh per project = 50% less total scroll */
          }
        }
      `}</style>

      {/* Sticky container */}
      <div className="md:sticky top-0 h-auto md:h-screen flex items-center overflow-hidden">
        {/* Section heading */}
        <motion.h2
          className="absolute top-10 left-6 md:left-12 text-section-title font-display italic text-black/90 z-20"
          initial={{ x: -40, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          Projects.
        </motion.h2>

        <div className="hidden md:grid w-full max-w-[1400px] mx-auto px-6 md:px-12 grid-cols-2 gap-20 items-center">
          {/* Left: 3D Card Stack (21st.dev Cinematic Pattern) */}
          <div
            className="flex items-center justify-center p-4 md:p-10 h-full w-full"
            style={{ perspective: "1500px" }}
          >
            <div
              className="relative w-[280px] h-[360px] md:w-[320px] md:h-[440px]"
              style={{ transformStyle: "preserve-3d" }}
            >
              {projects.map((project, i) => {
                const indexDiff = i - activeIndex;
                const isPast = indexDiff < 0;

                // Randomize stack angles organically, but deterministically
                const rotateZSeed = (i % 2 === 0 ? 1 : -1) * ((i % 3) + 1) * 2;

                return (
                  <motion.div
                    key={project.id}
                    className={`absolute inset-0 rounded-[24px] md:rounded-[32px] p-8 flex flex-col justify-between shadow-[0_30px_60px_rgba(0,0,0,0.12)] transition-colors duration-500 overflow-hidden ${
                      indexDiff === 0
                        ? "bg-black text-white border border-white/10"
                        : "bg-gray-50 text-black border border-black/5"
                    }`}
                    initial={false}
                    animate={{
                      z: isPast ? 400 : -Math.abs(indexDiff * 80),
                      y: isPast ? -800 : indexDiff * 30,
                      rotateX: isPast ? 45 : indexDiff * 5,
                      rotateZ: isPast ? -25 : indexDiff === 0 ? 0 : rotateZSeed,
                      opacity: isPast ? 0 : 1 - indexDiff * 0.15,
                      scale: isPast ? 1.4 : 1,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 160,
                      damping: 18,
                      mass: 0.8,
                    }}
                    style={{
                      transformOrigin: "bottom center",
                    }}
                  >
                    {/* Inner Card Content */}
                    <div className="flex justify-between items-start z-10">
                      <span
                        className={`font-display italic text-6xl md:text-7xl leading-none ${indexDiff === 0 ? "text-white/40" : "text-black/20"}`}
                      >
                        {project.number}
                      </span>
                      {indexDiff === 0 && (
                        <motion.div
                          className="w-3 h-3 rounded-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)] mt-2"
                          initial={{ scale: 0 }}
                          animate={{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }}
                          transition={{
                            repeat: Infinity,
                            duration: 2.5,
                            ease: "easeInOut",
                          }}
                        />
                      )}
                    </div>

                    <div className="space-y-4 z-10">
                      <h4 className="font-ui uppercase tracking-widest text-2xl font-bold leading-[1.1]">
                        {project.title}
                      </h4>
                      <div
                        className={`h-px w-full ${indexDiff === 0 ? "bg-white/20" : "bg-black/10"}`}
                      />
                      <p
                        className={`font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] ${indexDiff === 0 ? "text-white/60" : "text-black/40"}`}
                      >
                        {project.year} • {project.role.split(" ")[0]}
                      </p>
                    </div>

                    {/* Noise texture overlay for a premium print feel */}
                    <div
                      className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay"
                      style={{
                        backgroundImage:
                          'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/%3E%3C/svg%3E")',
                      }}
                    />
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right: Project detail panel */}
          <div className="min-h-[600px] flex items-center relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 20, scale: 0.98 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -20, scale: 0.98 }}
                transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
                className="w-full"
              >
                <ProjectPanel project={projects[activeIndex]} direction={1} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile: Project cards stacked */}
        <div className="md:hidden w-full px-6 pt-32 pb-20">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              className="mb-16 pb-16 border-b border-black/5 last:border-0"
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 0.6,
                delay: (i % 3) * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <ProjectPanel project={project} direction={0} />
            </motion.div>
          ))}
        </div>

        {/* Project counter (Desktop only) */}
        <div className="hidden md:block absolute bottom-8 right-10 font-mono text-xs text-black/40 tracking-widest">
          <span className="text-black">
            {String(activeIndex + 1).padStart(2, "0")}
          </span>
          <span> / {String(projects.length).padStart(2, "0")}</span>
        </div>
      </div>

      <SectionTransition from="white" to="black" />
    </section>
  );
}
