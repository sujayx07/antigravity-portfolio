"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface SectionTransitionProps {
  from: "white" | "black";
  to: "white" | "black";
}

export default function SectionTransition({ from, to }: SectionTransitionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0.3, 0.7], [0, 1]);

  const nextColor = to === "black" ? "#000000" : "#ffffff";

  return (
    <motion.div
      ref={ref}
      className="absolute bottom-0 left-0 w-full h-[200px] pointer-events-none z-10"
      style={{
        opacity,
        background: `linear-gradient(to bottom, transparent, ${nextColor})`,
      }}
    />
  );
}
