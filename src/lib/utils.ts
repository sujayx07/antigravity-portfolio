"use client";

import { useEffect, useRef, useState, useCallback } from "react";

export function cn(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(" ");
}

export function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

// Custom hook: Text scramble effect (21st.dev pattern)
export function useScramble(text: string, active: boolean) {
  const [displayText, setDisplayText] = useState(text);
  const chars = "!@#$%^&*<>/|{}[]ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  useEffect(() => {
    if (!active) {
      setDisplayText(text);
      return;
    }

    let currentIndex = 0;
    let isMounted = true;

    const interval = setInterval(() => {
      if (!isMounted) return;
      
      if (currentIndex >= text.length) {
        clearInterval(interval);
        setDisplayText(text);
        return;
      }

      setDisplayText((prev) => 
        text
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            if (i < currentIndex) return text[i];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );
      currentIndex += 0.5; // Slower reveal, more scrambling
    }, 30);

    return () => {
      isMounted = false;
      clearInterval(interval);
      setDisplayText(text); // Reset immediately on cleanup
    };
  }, [text, active]);

  return displayText;
}

// Custom hook: Animated number counter (21st.dev pattern)
export function useCounter(target: number, inView: boolean, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!inView || hasAnimated.current) return;
    hasAnimated.current = true;

    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [target, inView, duration]);

  return count;
}

// Custom hook: Mouse position relative to element
export function useRelativeMousePosition() {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.addEventListener("mousemove", handleMouseMove);
    return () => el.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  return { ref, pos };
}
