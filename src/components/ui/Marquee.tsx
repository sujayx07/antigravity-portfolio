"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useVelocity,
  useAnimationFrame,
  useMotionValue,
} from "framer-motion";

// Custom wrap function since it's not exported differently in some versions
const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

interface MarqueeProps {
  text: string;
  className?: string;
  velocityBased?: boolean;
}

export default function Marquee({
  text,
  className = "",
  velocityBased = false,
}: MarqueeProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  const directionFactor = useRef<number>(-1);

  useAnimationFrame((t, delta) => {
    // Scroll ~1.6% per second by default (takes ~30s to scroll 50%)
    let moveBy = directionFactor.current * -1.6 * (delta / 1000);

    if (velocityBased) {
      if (velocityFactor.get() > 0) {
        directionFactor.current = 1;
      } else if (velocityFactor.get() < 0) {
        directionFactor.current = -1;
      }

      moveBy += directionFactor.current * moveBy * Math.abs(velocityFactor.get());
    }

    baseX.set(baseX.get() + moveBy);
  });

  const x = useTransform(baseX, (v: any) => `${wrap(-50, 0, v)}%`);

  return (
    <div className={`overflow-hidden whitespace-nowrap flex ${className}`}>
      <motion.div
        className="flex whitespace-nowrap min-w-full"
        style={{ x }}
      >
        <span className="font-mono text-sm md:text-base tracking-[0.15em] opacity-60 mr-4 shrink-0">
          {text}
        </span>
        <span className="font-mono text-sm md:text-base tracking-[0.15em] opacity-60 mr-4 shrink-0">
          {text}
        </span>
        <span className="font-mono text-sm md:text-base tracking-[0.15em] opacity-60 mr-4 shrink-0">
          {text}
        </span>
        <span className="font-mono text-sm md:text-base tracking-[0.15em] opacity-60 mr-4 shrink-0">
          {text}
        </span>
      </motion.div>
    </div>
  );
}

