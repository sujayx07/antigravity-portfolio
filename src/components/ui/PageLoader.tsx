"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function PageLoader({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"logo" | "exit" | "done">("logo");

  useEffect(() => {
    // Phase 1: Logo appears (0-600ms)
    const timer1 = setTimeout(() => {
      // Phase 2: Logo scales up and exits (600-1000ms)
      setPhase("exit");
    }, 600);

    const timer2 = setTimeout(() => {
      setPhase("done");
      onComplete();
    }, 1200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          className="fixed inset-0 z-[10001] bg-black flex items-center justify-center"
          exit={{
            scaleY: 0,
          }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{ transformOrigin: "top" }}
        >
          <motion.div
            className="select-none flex items-center justify-center p-8 bg-black"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={
              phase === "logo"
                ? { opacity: 1, scale: 1 }
                : { opacity: 0, scale: 1.08 }
            }
            transition={{
              duration: phase === "logo" ? 0.6 : 0.4,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <img 
              src="/logo/white-sx07.png" 
              alt="sujayx07 loader logo" 
              className="w-48 md:w-64 h-auto object-contain"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
