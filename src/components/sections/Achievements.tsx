"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { achievements } from "@/lib/data";
import SectionTransition from "@/components/ui/SectionTransition";

// Achievement card with shimmer title
function AchievementCard({
  achievement,
  index,
}: {
  achievement: typeof achievements[0];
  index: number;
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
        className={`relative z-10 w-full md:w-[45%] border border-black/15 rounded-2xl p-6 md:p-8 bg-white group ${
          isLeft ? "md:mr-auto" : "md:ml-auto"
        }`}
        initial={{ x: isLeft ? -60 : 60, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
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
        data-cursor-label="OPEN"
      >
        {/* Year badge */}
        <span className="font-mono text-[10px] tracking-widest text-black/40 uppercase">
          {achievement.year}
        </span>

        {/* Title with shimmer on hover */}
        <h3 className="font-display text-xl md:text-2xl font-light mt-2 mb-2 group-hover:shimmer-text transition-all duration-300">
          {achievement.title}
        </h3>

        {/* Event */}
        <p className="font-ui text-xs uppercase tracking-[0.12em] text-black/60 mb-1">
          {achievement.event}
        </p>

        {/* Org */}
        <p className="font-mono text-xs text-black/40 mb-3">{achievement.org}</p>

        {/* Detail */}
        <p className="font-mono text-xs text-black/50 leading-relaxed">
          {achievement.detail}
        </p>
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

  return (
    <section
      ref={sectionRef}
      id="achievements"
      className="section-white relative py-20 md:py-32 overflow-hidden"
    >
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

                <AchievementCard achievement={achievement} index={i} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <SectionTransition from="white" to="black" />
    </section>
  );
}
