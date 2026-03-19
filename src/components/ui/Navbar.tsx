"use client";

import { useState, useRef, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { useScramble } from "@/lib/utils";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" },
];

function MagneticItem({
  children,
  className = "",
  href,
  intensity = 0.35,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  href?: string;
  intensity?: number;
  [key: string]: any;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  // Slower, smoother physics for the pointer animation
  const springX = useSpring(x, { stiffness: 40, damping: 15, mass: 1.5 });
  const springY = useSpring(y, { stiffness: 40, damping: 15, mass: 1.5 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * intensity);
    y.set((e.clientY - centerY) * intensity);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      className={className}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </motion.a>
  );
}

function NavLink({ label, href }: { label: string; href: string }) {
  const [isHovered, setIsHovered] = useState(false);
  const displayText = useScramble(label, isHovered);

  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <MagneticItem
        href={href}
        className="underline-draw font-ui text-xs uppercase tracking-[0.15em] py-2 block"
        intensity={0.2}
        data-cursor-hide
      >
        {displayText}
      </MagneticItem>
    </div>
  );
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (v) => {
      setScrolled(v > 100);
    });
    return unsubscribe;
  }, [scrollY]);

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 w-full z-[100] px-6 md:px-10 py-6 md:py-8 flex items-center justify-between"
        style={{ mixBlendMode: "difference" }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay: 1.8, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Logo */}
        <a
          href="#"
          className="font-display font-bold text-white text-xl tracking-tighter"
          data-cursor-hide
        >
          {"{Sx}"}
        </a>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-10 text-white">
          {navLinks.map((link) => (
            <NavLink key={link.label} label={link.label} href={link.href} />
          ))}
        </div>

        {/* CTA Button */}
        <div className="flex items-center gap-6">
          <div className="hidden md:block">
            <MagneticItem
              href="#contact"
              className="underline-draw font-ui text-xs uppercase tracking-[0.15em] py-2 block"
              intensity={0.3}
              data-cursor-hide
            >
              Connect Me
            </MagneticItem>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white z-[110] flex flex-col gap-1.5 w-7"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            data-cursor-expand
            aria-label="Toggle menu"
          >
            <motion.span
              className="block w-full h-px bg-white origin-center"
              animate={isMenuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="block w-full h-px bg-white"
              animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="block w-full h-px bg-white origin-center"
              animate={isMenuOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence mode="wait">
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-[95] bg-black flex flex-col p-10 pt-32 gap-12"
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  className="text-white font-display text-[12vw] italic font-light tracking-wide hover:text-white/60 transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.08, duration: 0.5 }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </motion.a>
              ))}
            </div>

            <div className="mt-auto space-y-4">
              <p className="font-mono text-[10px] text-white/30 tracking-[0.2em] uppercase">
                Collaboration
              </p>
              <a
                href="mailto:sujayx07@gmail.com"
                className="font-mono text-sm text-white/80"
              >
                sujayx07@gmail.com
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
