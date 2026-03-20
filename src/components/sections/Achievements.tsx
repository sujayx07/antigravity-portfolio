"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring, useVelocity } from "framer-motion";
import { achievements } from "@/lib/data";
import SectionTransition from "@/components/ui/SectionTransition";

// Achievement card with shimmer title
function AchievementCard({
  achievement,
  index,
  setHoveredImage,
}: {
  achievement: typeof achievements[0];
  index: number;
  setHoveredImage: (img: string | null) => void;
}) {
  const isLeft = achievement.side === "left";

  return (
    <div
      className={`relative flex items-center gap-4 md:gap-8 ${
        isLeft ? "md:flex-row" : "md:flex-row-reverse"
      } flex-row`}
    >
      {/* Year watermark */}
      <div
        className={`hidden md:block absolute top-1/2 -translate-y-1/2 text-watermark font-display select-none pointer-events-none ${
          isLeft ? "left-0" : "right-0"
        }`}
      >
        {achievement.year}
      </div>

      {/* Card */}
      <motion.div
        className={`relative z-10 w-full md:w-[45%] border border-black/15 rounded-2xl p-6 md:p-8 bg-white group cursor-none overflow-hidden ${
          isLeft ? "md:mr-auto" : "md:ml-auto"
        }`}
        onMouseEnter={() => setHoveredImage(achievement.image)}
        onMouseLeave={() => setHoveredImage(null)}
        initial={{ x: isLeft ? -60 : 60, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1],
          delay: index * 0.05,
          type: "spring",
          stiffness: 200,
          damping: 20,
          mass: 0.8,
        }}
        whileHover={{ scale: 1.02, y: -4 }}
      >
        {/* Cool Purplish Hover Gradient Underlay */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl bg-gradient-to-br from-violet-600/10 via-fuchsia-600/5 to-transparent pointer-events-none z-0" />
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl border border-violet-500/30 pointer-events-none z-0 shadow-[0_0_40px_rgba(139,92,246,0.15)]" />

        <div className="relative z-10">
          {/* Year badge */}
          <span className="font-mono text-[10px] tracking-widest text-[#00ffc3] bg-black px-3 py-1 rounded-full uppercase">
            {achievement.year}
          </span>

          {/* Title with shimmer on hover */}
          <h3 className="font-display text-xl md:text-2xl font-light mt-4 mb-2 -tracking-wider group-hover:text-violet-900 transition-colors duration-300">
            {achievement.title}
          </h3>

          {/* Event */}
          <p className="font-ui text-xs uppercase tracking-[0.12em] text-black/60 mb-1">
            {achievement.event}
          </p>

          {/* Org */}
          <p className="font-mono text-xs text-violet-600/80 mb-3 font-semibold">{achievement.org}</p>

          {/* Detail */}
          <p className="font-mono text-xs text-black/50 leading-relaxed max-w-[90%]">
            {achievement.detail}
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default function Achievements() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"],
  });

  // Timeline line scaleY
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Floating Cursor Image Logic
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Velocity-based rotation!
  const mouseVelocity = useVelocity(mouseX);
  const smoothVelocity = useSpring(mouseVelocity, { damping: 50, stiffness: 400 });
  const tiltAngle = useTransform(smoothVelocity, [-2000, 2000], [-15, 15], { clamp: true });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Offset by half dimensions to perfectly center the image
      mouseX.set(e.clientX - 160);
      mouseY.set(e.clientY - 100);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section
      ref={sectionRef}
      id="achievements"
      className="section-white relative py-20 md:py-32 overflow-hidden"
    >
      {/* Floating Image Portal */}
      <motion.img
        src={hoveredImage || "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"}
        className="fixed top-0 left-0 pointer-events-none z-[100] w-auto h-auto max-w-[280px] md:max-w-[350px] max-h-[350px] rounded-xl object-contain shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-2 border-white/50 bg-black/80 p-1 mix-blend-normal"
        style={{
          x: smoothX,
          y: smoothY,
          opacity: hoveredImage ? 1 : 0,
          scale: hoveredImage ? 1 : 0.8,
          rotate: tiltAngle, // Tied to physics velocity!
        }}
        transition={{ 
          opacity: { duration: 0.2 }, 
          scale: { duration: 0.3, type: "spring" } 
        }}
      />

      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Section heading */}
        <motion.h2
          className="text-section-title font-display italic text-black mb-16 md:mb-24"
          initial={{ x: -60, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          Achievements.
        </motion.h2>

        {/* Timeline container */}
        <div className="relative">
          {/* Center vertical line (desktop only) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2">
            <motion.div
              className="w-full h-full bg-black/15 origin-top"
              style={{ scaleY: lineScaleY }}
            />
          </div>

          {/* Achievement cards */}
          <div className="space-y-8 md:space-y-16">
            {achievements.map((achievement, i) => (
              <div key={i} className="relative">
                {/* Active dot (desktop) */}
                <div className="hidden md:flex absolute left-1/2 top-8 -translate-x-1/2 z-20 items-center justify-center">
                  <motion.div
                    className="w-3 h-3 rounded-full bg-white border-2 border-black"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, type: "spring" }}
                  />
                  {/* Ripple */}
                  <motion.div
                    className="absolute w-3 h-3 rounded-full border border-black/30"
                    animate={{ scale: [1, 2.5], opacity: [0.6, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeOut",
                    }}
                  />
                </div>

                <AchievementCard 
                  achievement={achievement} 
                  index={i} 
                  setHoveredImage={setHoveredImage} 
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <SectionTransition from="white" to="black" />
    </section>
  );
}
