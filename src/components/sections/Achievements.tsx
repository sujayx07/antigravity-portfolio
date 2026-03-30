"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { achievements } from "@/lib/data";
import SectionTransition from "@/components/ui/SectionTransition";

type BrowserWithDeviceMemory = Navigator & { deviceMemory?: number };
type WindowWithIdleCallback = Window & {
  requestIdleCallback?: (
    callback: IdleRequestCallback,
    options?: IdleRequestOptions,
  ) => number;
};

// Achievement card with shimmer title
function AchievementCard({
  achievement,
  index,
  onHoverStart,
  onHoverMove,
  onHoverEnd,
  enableImagePreview,
}: {
  achievement: (typeof achievements)[0];
  index: number;
  onHoverStart: (img: string, event: React.MouseEvent<HTMLDivElement>) => void;
  onHoverMove: (event: React.MouseEvent<HTMLDivElement>) => void;
  onHoverEnd: () => void;
  enableImagePreview: boolean;
}) {
  const isLeft = achievement.side === "left";
  const cardRef = useRef<HTMLDivElement>(null);

  // When the card scrolls OUT of view, dismiss the floating image immediately
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          onHoverEnd();
        }
      },
      { threshold: 0 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [onHoverEnd]);

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
        ref={cardRef}
        className={`relative z-10 w-full md:w-[45%] border border-black/15 rounded-2xl p-6 md:p-8 bg-white group cursor-none overflow-hidden ${
          isLeft ? "md:mr-auto" : "md:ml-auto"
        }`}
        onMouseEnter={(e) =>
          enableImagePreview && onHoverStart(achievement.image, e)
        }
        onMouseMove={(e) => enableImagePreview && onHoverMove(e)}
        onMouseLeave={onHoverEnd}
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
        whileTap={{ scale: 0.97 }}
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
          <p className="font-mono text-xs text-violet-600/80 mb-3 font-semibold">
            {achievement.org}
          </p>

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
  const [enableImagePreview, setEnableImagePreview] = useState(false);
  const rafRef = useRef<number | null>(null);
  const pointerPosRef = useRef({ x: 0, y: 0 });
  const preloadedImagesRef = useRef<Set<string>>(new Set());
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 28, stiffness: 240, mass: 0.7 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const preloadImage = useCallback((src: string) => {
    if (!src || preloadedImagesRef.current.has(src)) return;
    const img = new Image();
    img.src = src;
    preloadedImagesRef.current.add(src);
  }, []);

  const updatePointer = useCallback(() => {
    rafRef.current = null;
    mouseX.set(pointerPosRef.current.x - 130);
    mouseY.set(pointerPosRef.current.y - 90);
  }, [mouseX, mouseY]);

  const handleHoverStart = useCallback(
    (img: string, event: React.MouseEvent<HTMLDivElement>) => {
      preloadImage(img);
      setHoveredImage(img);
      pointerPosRef.current = { x: event.clientX, y: event.clientY };
      mouseX.set(event.clientX - 130);
      mouseY.set(event.clientY - 90);
    },
    [mouseX, mouseY, preloadImage],
  );

  const handleHoverMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      pointerPosRef.current = { x: event.clientX, y: event.clientY };
      if (rafRef.current == null) {
        rafRef.current = window.requestAnimationFrame(updatePointer);
      }
    },
    [updatePointer],
  );

  const handleHoverEnd = useCallback(() => {
    setHoveredImage(null);
    if (rafRef.current != null) {
      window.cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  useEffect(() => {
    const canHover = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const lowPowerCpu =
      typeof navigator.hardwareConcurrency === "number" &&
      navigator.hardwareConcurrency <= 4;
    const deviceMemory = (navigator as BrowserWithDeviceMemory).deviceMemory;
    const lowMemory = typeof deviceMemory === "number" && deviceMemory <= 4;

    setEnableImagePreview(
      canHover && !reducedMotion && !lowPowerCpu && !lowMemory,
    );
  }, []);

  useEffect(() => {
    if (!enableImagePreview) return;

    const warmup = achievements.slice(0, 3);
    const prewarm = () => {
      warmup.forEach((item) => preloadImage(item.image));
    };

    const win = window as WindowWithIdleCallback;
    if (typeof win.requestIdleCallback === "function") {
      win.requestIdleCallback(prewarm, { timeout: 1200 });
    } else {
      setTimeout(prewarm, 350);
    }
  }, [enableImagePreview, preloadImage]);

  useEffect(() => {
    return () => {
      if (rafRef.current != null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="achievements"
      className="section-white relative py-20 md:py-32 overflow-hidden"
    >
      {/* Floating Image Portal */}
      {enableImagePreview && hoveredImage && (
        <motion.img
          src={hoveredImage}
          alt="Achievement certificate preview"
          className="fixed top-0 left-0 pointer-events-none z-[100] w-auto h-auto max-w-[240px] md:max-w-[300px] max-h-[300px] rounded-xl object-contain shadow-[0_12px_30px_rgba(0,0,0,0.28)] border border-white/50 bg-white/95 p-1 will-change-transform"
          style={{
            x: smoothX,
            y: smoothY,
            opacity: 1,
            scale: 1,
          }}
          transition={{
            opacity: { duration: 0.12 },
            scale: { duration: 0.16 },
          }}
        />
      )}

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative z-10">
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
                  onHoverStart={handleHoverStart}
                  onHoverMove={handleHoverMove}
                  onHoverEnd={handleHoverEnd}
                  enableImagePreview={enableImagePreview}
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
