"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useVelocity,
} from "framer-motion";

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
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(
    smoothVelocity,
    [-1000, 0, 1000],
    [-3, 0, 3]
  );

  return (
    <div ref={ref} className={`overflow-hidden whitespace-nowrap ${className}`}>
      <motion.div
        className="inline-flex"
        animate={{ x: [0, "-50%"] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 30,
            ease: "linear",
          },
        }}
        style={velocityBased ? { x: velocityFactor } : undefined}
      >
        <span className="font-mono text-sm md:text-base tracking-[0.15em] opacity-60 mr-4">
          {text}
        </span>
        <span className="font-mono text-sm md:text-base tracking-[0.15em] opacity-60 mr-4">
          {text}
        </span>
        <span className="font-mono text-sm md:text-base tracking-[0.15em] opacity-60 mr-4">
          {text}
        </span>
        <span className="font-mono text-sm md:text-base tracking-[0.15em] opacity-60 mr-4">
          {text}
        </span>
      </motion.div>
    </div>
  );
}
