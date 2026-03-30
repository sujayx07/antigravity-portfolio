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
import { profileLinks } from "@/lib/data";

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
  const [isMobile, setIsMobile] = useState(false);
  const [viewportHeight, setViewportHeight] = useState(900);
  const [heroEndY, setHeroEndY] = useState(900);
  const [aboutStartY, setAboutStartY] = useState(1100);

  const AVATAR_START_SIZE = 320;
  const AVATAR_START_Y = 170;
  const AVATAR_START_X = -110;

  // Recompute animation anchors on resize/zoom to avoid drift and jitter.
  useEffect(() => {
    const updateMetrics = () => {
      const hero = document.getElementById("hero");
      const about = document.getElementById("about");
      const nextHeroEnd = hero
        ? hero.offsetTop + hero.offsetHeight
        : window.innerHeight;
      const nextAboutStart = about ? about.offsetTop : nextHeroEnd;

      setViewportHeight(window.innerHeight);
      setHeroEndY(nextHeroEnd);
      setAboutStartY(nextAboutStart);
      setIsMobile(window.innerWidth < 768);
    };

    updateMetrics();
    window.addEventListener("resize", updateMetrics);
    window.addEventListener("orientationchange", updateMetrics);
    window.visualViewport?.addEventListener("resize", updateMetrics);

    return () => {
      window.removeEventListener("resize", updateMetrics);
      window.removeEventListener("orientationchange", updateMetrics);
      window.visualViewport?.removeEventListener("resize", updateMetrics);
    };
  }, []);

  const transitionStartY = Math.max(0, heroEndY - viewportHeight * 0.38);
  const transitionEndY = Math.max(
    transitionStartY + 300,
    aboutStartY + viewportHeight * 0.06,
  );

  // Animation values for the floating profile picture
  // Start while Hero is fading and finish after About starts for a smooth handoff.
  const imgSize = useTransform(
    scrollY,
    [transitionStartY, transitionEndY],
    [AVATAR_START_SIZE, 40],
  );
  const imgY = useTransform(
    scrollY,
    [transitionStartY, transitionEndY],
    [AVATAR_START_Y, 0],
  );
  const imgX = useTransform(
    scrollY,
    [transitionStartY, transitionEndY],
    [AVATAR_START_X, 0],
  );
  const imgRadius = useTransform(
    scrollY,
    [transitionStartY, transitionEndY],
    [12, 999],
  );

  const smoothImgSize = useSpring(imgSize, {
    stiffness: 300,
    damping: 32,
    mass: 0.35,
  });
  const smoothImgY = useSpring(imgY, { stiffness: 300, damping: 32, mass: 0.35 });
  const smoothImgX = useSpring(imgX, { stiffness: 300, damping: 32, mass: 0.35 });
  const smoothImgRadius = useSpring(imgRadius, {
    stiffness: 340,
    damping: 36,
    mass: 0.35,
  });

  // Connect Me button fade and slide
  const connectOpacity = useTransform(
    scrollY,
    [transitionStartY + 120, transitionEndY],
    [0, 1],
  );
  const connectX = useTransform(
    scrollY,
    [transitionStartY + 120, transitionEndY],
    [20, 0],
  );

  // Track if we are inside the Projects section
  const [inProjects, setInProjects] = useState(false);
  const resumeHref = profileLinks.resumeUrl;
  const resumeFileName = profileLinks.resumeFileName;

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (v) => {
      setScrolled(v > transitionStartY + 120);
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
      { rootMargin: "0px 0px -90% 0px" },
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
  }, [scrollY, transitionStartY]);

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
          aria-label="Go to homepage"
          animate={{ y: !isMobile && inProjects ? -32 : 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <img
            src="/logo/white-sx07.png"
            alt="Sujayx07 logo"
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
            <a
              href={resumeHref}
              download={resumeFileName}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-hide
            >
              <HoverButton
                glowColor="#9dd7ff"
                backgroundColor="#0a0a0a"
                textColor="#ffffff"
                hoverTextColor="#9dd7ff"
                className="py-2.5 px-5 rounded-full text-xs uppercase tracking-[0.15em] font-ui"
              >
                Resume ↓
              </HoverButton>
            </a>
          </motion.div>

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
              animate={
                isMenuOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }
              }
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
              width: smoothImgSize,
              height: smoothImgSize,
              y: smoothImgY,
              x: smoothImgX,
              borderRadius: smoothImgRadius,
              overflow: "hidden",
            }}
            className="absolute right-0 top-0 origin-top-right transform-gpu pointer-events-auto"
          >
            <motion.div
              animate={{ y: scrolled ? 0 : [0, -15, 0] }}
              transition={{
                duration: 4,
                repeat: scrolled ? 0 : Infinity,
                ease: "easeInOut",
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

      {/* Premium Mobile Menu — Full Screen Overlay */}
      <AnimatePresence mode="wait">
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-[95] flex flex-col overflow-hidden"
            style={{ backgroundColor: "#060606" }}
            initial={{ clipPath: "ellipse(0% 0% at 95% 5%)" }}
            animate={{ clipPath: "ellipse(150% 150% at 95% 5%)" }}
            exit={{ clipPath: "ellipse(0% 0% at 95% 5%)" }}
            transition={{ duration: 0.7, ease: [0.77, 0, 0.175, 1] }}
          >
            {/* Noise texture overlay */}
            <div
              className="absolute inset-0 opacity-[0.04] pointer-events-none"
              style={{
                backgroundImage:
                  'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/%3E%3C/svg%3E")',
              }}
            />

            {/* Ambient gradient orb */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.04)_0%,transparent_70%)] pointer-events-none" />

            {/* Nav Links */}
            <div className="flex-1 flex flex-col justify-center px-8 pt-28 gap-2">
              {navLinks.map((link, i) => (
                <div
                  key={link.label}
                  className="overflow-hidden border-b border-white/[0.06] last:border-0"
                >
                  <motion.a
                    href={link.href}
                    className="flex items-baseline justify-between py-5 group"
                    initial={{ y: "120%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    transition={{
                      delay: 0.25 + i * 0.07,
                      duration: 0.6,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="font-display text-[11vw] sm:text-7xl italic font-light tracking-tight text-white group-active:text-white/60 transition-colors">
                      {link.label}
                    </span>
                    <span className="font-mono text-[10px] text-white/30 tracking-widest ml-4 group-active:text-white/60 transition-colors">
                      0{i + 1}
                    </span>
                  </motion.a>
                </div>
              ))}
            </div>

            {/* Bottom Strip */}
            <motion.div
              className="px-8 pb-12 pt-6 border-t border-white/[0.06] flex items-end justify-between"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <div>
                <p className="font-mono text-[9px] text-white/30 tracking-[0.25em] uppercase mb-2">
                  Reach Out
                </p>
                <a
                  href="mailto:sujayx07@gmail.com"
                  className="font-mono text-sm text-white/70 hover:text-white transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  sujayx07@gmail.com
                </a>
                <a
                  href={resumeHref}
                  download={resumeFileName}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block font-mono text-[11px] tracking-[0.18em] uppercase text-white/80 hover:text-white transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Download Resume
                </a>
              </div>
              <div className="text-right">
                <p className="font-mono text-[9px] text-white/30 tracking-[0.25em] uppercase mb-2">
                  Based In
                </p>
                <p className="font-mono text-sm text-white/70">Kolkata, IN</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
