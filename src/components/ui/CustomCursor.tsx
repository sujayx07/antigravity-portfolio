"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [cursorLabel, setCursorLabel] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Check for touch device
    if (window.matchMedia("(hover: none)").matches) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Hide cursor entirely if hovering over specific hidden zones
      if (target.closest("[data-cursor-hide]")) {
        setIsHidden(true);
        setIsExpanded(false);
        setCursorLabel("");
        return;
      } else {
        setIsHidden(false);
      }

      const interactiveEl = target.closest(
        "a, button, [data-cursor-label], [data-cursor-expand]"
      );

      if (interactiveEl) {
        setIsExpanded(true);
        const label = interactiveEl.getAttribute("data-cursor-label");
        setCursorLabel(label || "");
      } else {
        setIsExpanded(false);
        setCursorLabel("");
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    document.documentElement.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
      document.documentElement.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [cursorX, cursorY]);

  // Don't render on touch devices
  if (typeof window !== "undefined" && window.matchMedia("(hover: none)").matches) {
    return null;
  }

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[10000]"
      style={{
        x,
        y,
        translateX: "-50%",
        translateY: "-50%",
      }}
    >
      <motion.div
        className="rounded-full flex items-center justify-center border border-black/10 shadow-[0_4px_16px_rgba(0,0,0,0.1)]"
        style={{
          mixBlendMode: "difference",
          backgroundColor: "#ffffff",
        }}
        animate={{
          width: isExpanded ? 60 : 12,
          height: isExpanded ? 60 : 12,
          opacity: isVisible && !isHidden ? 1 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
        }}
      >
        <AnimatePresence>
          {cursorLabel && (
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="text-black text-[9px] font-mono tracking-[0.1em] uppercase font-medium select-none"
            >
              {cursorLabel}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
