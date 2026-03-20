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
import { HoverButton } from "@/components/ui/hover-glow-button";

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
  
  // Track viewport height to trigger animation after Hero section ends
  const [vh, setVh] = useState(800);
  useEffect(() => {
    setVh(window.innerHeight);
    const handleResize = () => setVh(window.innerHeight);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Animation values for the floating profile picture
  // It stays large [vh] and then shrinks over the next 500px for a smoother transition
  const imgSize = useTransform(scrollY, [vh, vh + 500], ["400px", "40px"]);
  const imgY = useTransform(scrollY, [vh, vh + 500], ["30vh", "0vh"]);
  const imgX = useTransform(scrollY, [vh, vh + 500], ["-10vw", "0vw"]);
  const imgScale = useTransform(scrollY, [vh, vh + 500], [1, 1]);
  // Make it a circle only at the end of the animation
  const imgRadius = useTransform(scrollY, [vh + 300, vh + 500], ["0%", "50%"]);

  // Connect Me button fade and slide
  const connectOpacity = useTransform(scrollY, [vh + 200, vh + 500], [0, 1]);
  const connectX = useTransform(scrollY, [vh + 200, vh + 500], [20, 0]);

  // Track if we are inside the Projects section
  const [inProjects, setInProjects] = useState(false);

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (v) => {
      setScrolled(v > vh / 2);
    });

    // Observer to detect #projects section accurately across layouts
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInProjects(true);
          } else {
            setInProjects(false);
          }
        });
      },
      { rootMargin: "0px 0px -90% 0px" } 
    );

    const interval = setInterval(() => {
      const el = document.getElementById("projects");
      if (el) {
        observer.observe(el);
        clearInterval(interval);
      }
    }, 500);

    return () => {
      unsubscribe();
      observer.disconnect();
      clearInterval(interval);
    };
  }, [scrollY, vh]);

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 w-full z-[100] px-6 md:px-10 py-6 md:py-8 flex items-center justify-between"
        style={{ mixBlendMode: "difference" }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay: 1.8, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Logo and Brand Name */}
        <motion.a
          href="#"
          className="relative flex items-center gap-2 md:gap-3"
          data-cursor-hide
          animate={{ y: inProjects ? -32 : 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <img
            src="/logo/white-sx07.png"
            alt="Logo"
            className="h-10 md:h-12 w-auto object-contain"
          />
          <span className="font-display font-medium text-white text-2xl md:text-3xl tracking-tighter">
            sujayx07
          </span>
        </motion.a>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-10 text-white">
          {navLinks.map((link) => (
            <NavLink key={link.label} label={link.label} href={link.href} />
          ))}
        </div>

        {/* CTA Button & Profile Image */}
        <div className="flex items-center gap-2 mt-1 md:mt-0">
          <motion.div 
            className="hidden md:block"
            style={{ opacity: connectOpacity, x: connectX }}
          >
            <a href="#contact" data-cursor-hide>
              <HoverButton
                glowColor="#ffffff"
                backgroundColor="#000"
                textColor="#ffffff"
                hoverTextColor="#ffffff"
                className="py-2.5 px-6 rounded-full text-xs uppercase tracking-[0.15em] font-ui"
              >
                Connect Me
              </HoverButton>
            </a>
          </motion.div>

          {/* Placeholder to reserve space for the extracted absolute image */}
          <div className="w-10 h-10 hidden md:block" />

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

      {/* Profile Image Container - Independent to avoid mix-blend-mode inversion */}
      <div className="fixed top-0 right-0 w-full px-6 md:px-10 py-6 md:py-8 z-[105] hidden md:flex items-center justify-end pointer-events-none">
        <div className="relative w-10 h-10 flex items-center justify-center pointer-events-none">
          <motion.div
            style={{
              width: imgSize,
              height: imgSize,
              y: imgY,
              x: imgX,
              scale: imgScale,
              borderRadius: imgRadius,
              overflow: "hidden",
            }}
            className="absolute right-0 top-0 origin-top-right transform-gpu pointer-events-auto"
          >
            <motion.div
              animate={{ y: scrolled ? 0 : [0, -15, 0] }}
              transition={{ 
                duration: 4, 
                repeat: scrolled ? 0 : Infinity, 
                ease: "easeInOut" 
              }}
              className="w-full h-full"
            >
              <img
                src="/dp/profile.png"
                alt="Sujay Dey"
                className="w-full h-full object-cover drop-shadow-lg"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

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
