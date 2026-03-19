# SUJAY DEY — PORTFOLIO WEBSITE · MASTER BUILD PROMPT v2
# (Updated with full resume data — March 2026)

---

## IDENTITY

- **Name**: Sujay Dey
- **Username / Brand**: Sujayx07 | Logo mark: `{Sx}`
- **Email**: sujayx07@gmail.com
- **Phone**: +91-62941-76591
- **Location**: Kolkata, West Bengal, India
- **LinkedIn**: linkedin.com/in/sujayx07
- **Education**: B.Tech in Computer Science (IoT) · Techno Main Salt Lake (Makaut University) · Sep 2023 – Jul 2027
- **Roles**: Creative Frontend Developer · Full-Stack Engineer · Hackathon Champion · Google Gemini Campus Ambassador · Open Source Maintainer
- **Hero Tagline**: "A Developer Dedicated to Crafting Scalable Full Stack Applications"
- **Sub-tagline**: "6× Hackathon Winner · SIH 2025 National Champion · Chancellor's Gold Medalist"

---

## TECH STACK TO USE (FOR BUILDING THE PORTFOLIO)

- **Framework**: Next.js 15 (App Router)
- **Animation**: Framer Motion (primary) · CSS keyframes (secondary)
- **Smooth Scroll**: Lenis (`@studio-freight/lenis`) integrated with Framer Motion
- **Styling**: Tailwind CSS
- **Fonts** (Google Fonts):
  - Display / Hero: `Cormorant Garamond` — weight 300, 400, 600; italic variants
  - UI / Nav / Labels: `Syne` — weight 700, 800
  - Mono / Code / Tags: `DM Mono` — weight 300, 400
- **Color palette**: Strictly monochromatic
  - White sections: `#ffffff` bg · `#000000` text
  - Black sections: `#000000` bg · `#ffffff` text
  - Grays allowed: `#111111`, `#1a1a1a`, `#f5f5f5`, `#e8e8e8`, `#888888`
  - **Zero color** — no purple gradients, no glassmorphism, no colored accents

---

## CORE DESIGN SYSTEM

### Monochromatic Alternating Sections
Sections alternate strictly:
1. Hero — **WHITE**
2. About — **BLACK**
3. Projects — **WHITE**
4. Skills — **BLACK**
5. Achievements — **WHITE**
6. Contact — **BLACK**

**Transition between sections**: NOT a hard cut. Each section boundary has a scroll-driven gradient bleed div:
- `position: absolute, bottom: 0, height: 200px`
- `background: linear-gradient(to bottom, transparent, [next-section-color])`
- Opacity driven by `useTransform(scrollYProgress, [0.75, 1], [0, 1])` via Framer Motion

### Typography Rules
- All `<h1>`, `<h2>`, section titles → `Cormorant Garamond`
- Nav, labels, badges, buttons → `Syne`
- Tech tags, code, small UI text → `DM Mono`
- Hero headline: `10–14vw`, weight 300, italic
- Body: `16–18px`, weight 300–400, `line-height: 1.8`
- Section watermark years: `8–10vw`, weight 300, `opacity: 0.06`

### Custom Cursor (Global)
- Default: 12px circle with `mix-blend-mode: difference` (auto-inverts on white/black bg)
- Hover on links/cards: expands to 48px with spring physics
- Hover on project ribbon: shows "VIEW" text inside cursor
- Implemented with `useMotionValue` + `useSpring` from Framer Motion
- Native cursor hidden globally: `cursor: none`

### Noise Texture Overlay (Global)
- SVG noise on `body::before`, `opacity: 0.04`, `mix-blend-mode: overlay`
- Prevents flat digital look across all sections

### Smooth Scroll
- Lenis for buttery inertia scrolling
- Integrated via `useEffect` in root `layout.tsx`
- Framer Motion `useScroll` hooks fed from Lenis scroll events

---

## SECTION-BY-SECTION SPECS

---

### SECTION 1 — HERO (WHITE BG)

**Layout**: Full viewport height (`100vh`). Text left-aligned with massive type. Right half is intentional negative space.

**Content**:
```
Hi, I'm
Sujay Dey.
A developer dedicated
to crafting scalable
full-stack applications.
```
Below headline (small, DM Mono):
```
Google Gemini Campus Ambassador · SIH'25 Winner · 6× Hackathon Champion
```

**Cinematic Reveal Animation** (page load, not scroll):
- Each text line: starts at `{ y: 80, opacity: 0, skewY: 3 }` → ends at `{ y: 0, opacity: 1, skewY: 0 }`
- Stagger delay: `0.15s` per line
- Duration: `1.1s` per line
- Easing: `[0.22, 1, 0.36, 1]`
- The word `"scalable"` is italic and `1.1×` larger
- Small credential line fades in last with `0.6s` delay after last headline line

**Scroll Parallax**:
- Headline block moves at `0.4×` scroll speed upward
- A horizontal rule at bottom fades out + slides left as section exits viewport

**Page Load Sequence** (before hero appears):
1. `0ms`: Full black screen
2. `0–600ms`: `{Sx}` logo fades in center, white on black
3. `600–1000ms`: Logo scales 1× → 1.08× then fades out
4. `1000ms`: Screen flips to white, hero text cascades in
5. All controlled by Framer Motion `AnimatePresence`

---

### SECTION 2 — ABOUT (BLACK BG)

**Layout**: 12-column CSS Grid bento layout.

**Bento cells** (1px white border, `border-radius: 16px`, black bg):

| Cell | Content | Grid Span |
|------|---------|-----------|
| A | Name + tagline + short bio paragraph | col 1–7, row 1–2 |
| B | Rotating skill tags cloud ("User Experience", "Design Thinking", "Creativity", "Digital Craft", "Creative Solutions") | col 7–13, row 1 |
| C | Location card: "Kolkata, India · Available Globally" + CSS wireframe globe animation | col 7–10, row 2 |
| D | Stats counter: animates 0→10 on scroll enter (hackathon wins), 0→6 (first places) | col 10–13, row 2 |
| E | Role cards: "Google Gemini Campus Ambassador", "Tech Co-Lead @ Samarth", "MLH Open Source Admin" | col 1–7, row 3 |
| F | Currently building: CipherClash + InsightAI | col 7–13, row 3 |

**Bio text** (Cell A):
```
B.Tech CSE (IoT) student at Techno Main Salt Lake.
Full-Stack Developer obsessed with building experiences
that feel alive. Google Gemini Campus Ambassador.
6× Hackathon winner. Open source contributor.
I write code that ships.
```

**Animations**:
- Cells enter staggered: `{ y: 40, opacity: 0 } → { y: 0, opacity: 1 }` with `whileInView`
- Skill tags orbit an invisible ellipse with CSS `animation: orbit` at varying speeds
- Globe: CSS/SVG wireframe dotted sphere, slowly rotates with CSS animation
- Counter: custom number ticker triggered by `useInView`
- Each cell: `whileHover: { scale: 1.02 }` with smooth spring

---

### SECTION 3 — PROJECTS (WHITE BG)

**This is the centerpiece. Build it with the most care.**

**Concept**: Sticky scroll section. A large 3D mono ribbon occupies left 55% of screen. It rotates on its Y-axis as user scrolls. Right 45% shows the current project's detail card, which updates on each scroll segment with animated transitions.

**Sticky Container**: `height: 600vh` (6 projects × 100vh scroll per project). Inner content `position: sticky; top: 0; height: 100vh`.

**The Ribbon (Left side)**:
- A tall `<div>` styled as a vertical fabric band
- Repeating text pattern: `{Sx} SUJAYX07 · ` in DM Mono, small, low opacity
- Parent has `perspective: 1200px`
- `rotateY` mapped via `useTransform(scrollYProgress, [0, 1], [0, 360])` — full rotation over entire section scroll
- Ribbon also moves slightly on Y axis for depth
- On the ribbon, 6 small project "thumbnails" appear at evenly spaced intervals — when one is centered in view, it glows (white outline) and the right panel snaps to that project

**Project Detail Panel (Right side)**:
- Project number: `01`, `02`, etc. in Cormorant Garamond, huge, top right, `opacity: 0.08`
- Project title: Cormorant Garamond, 5vw, slides up from `y: 40` on segment change
- Description: DM Mono, 14px, fades in with 0.3s delay
- Tech tags: DM Mono, small pill badges (black bg, white border on white section — invert logic)
- Role badge: Syne font, uppercase, letter-spaced
- Achievement badge (if won): trophy emoji + text, slides in from right
- Hover on panel: ghost project image appears as background at `opacity: 0.06`

**Segment detection**: Divide `scrollYProgress` into 6 equal ranges `[0–0.166, 0.166–0.333, ...]`. Use `useTransform` to derive `activeProject` index. On index change, trigger Framer Motion exit/enter animations on the panel.

**Section heading**: "My Projects" — Cormorant Garamond, 8vw, weight 300 — `position: sticky; top: 40px; left: 40px` — stays visible throughout ribbon scroll.

---

**PROJECTS DATA**:

```typescript
export const projects = [
  {
    id: 1,
    number: "01",
    title: "TruthScope",
    description: "Real-time AI-powered fake news detection browser extension. Achieves 98.6% accuracy in credibility scoring using Google Gemini and NLP pipelines.",
    techStack: ["Gemini API", "NLP", "Chrome Extension", "JavaScript", "Python"],
    role: "Team Lead & Developer",
    achievement: "4th Place · Smart Bengal Hackathon 2025 · RCCIIT Grand Finals",
    year: "2025"
  },
  {
    id: 2,
    number: "02",
    title: "CipherClash",
    description: "Competitive real-time Bulls & Cows logic puzzle game with ELO leaderboard, PvP/PvE modes, Redis-backed room persistence and NextAuth OAuth.",
    techStack: ["Next.js 15", "Socket.io", "Redis", "Supabase", "Framer Motion", "Zustand"],
    role: "Full-Stack Developer",
    achievement: "AntiGravity Hackathon · 2026",
    year: "2026"
  },
  {
    id: 3,
    number: "03",
    title: "InsightAI",
    description: "Conversational AI for instant Business Intelligence. Type plain English, get interactive dashboards powered by Google Gemini.",
    techStack: ["Next.js", "Google Gemini", "Tailwind", "Chart.js"],
    role: "Senior Frontend Lead",
    achievement: "AntiGravity Hackathon · 2026",
    year: "2026"
  },
  {
    id: 4,
    number: "04",
    title: "Decentralized Donation Platform",
    description: "Web3 platform for transparent donation campaigns on Ethereum blockchain with smart contract-based fund management.",
    techStack: ["Ethereum", "Web3.js", "React", "Smart Contracts", "Solidity"],
    role: "Full-Stack & Blockchain Developer",
    achievement: "1st Place · TMSL Hackathon 2024 · Hack-ur-way",
    year: "2024"
  },
  {
    id: 5,
    number: "05",
    title: "Community E-Commerce",
    description: "Platform connecting local sellers with international markets featuring AI/ML-based product recommendations and India Post shipping integration.",
    techStack: ["MERN Stack", "ML/AI", "REST APIs", "Node.js", "MongoDB"],
    role: "Full-Stack Developer & Team Lead",
    achievement: "1st Place · E-Summit 2024 National Finals · Jadavpur University",
    year: "2024"
  },
  {
    id: 6,
    number: "06",
    title: "Space Weather Prediction",
    description: "AI-powered space weather prediction system for satellite protection using ML models and real-time solar activity data feeds.",
    techStack: ["Python", "ML/AI", "React", "Data Visualization", "APIs"],
    role: "ML & Frontend Developer",
    achievement: "Hackathon Project · 2025",
    year: "2025"
  }
]
```

---

### SECTION 4 — SKILLS (BLACK BG)

**Layout**: Split. Left 40%: large heading. Right 60%: floating icon cluster.

**Left heading**:
```
The
Stack.
```
Cormorant Garamond, 10vw, weight 300, italic. Slides in from left on scroll enter.

Below heading (DM Mono, small):
```
Languages · Frameworks · Technologies
```

**Right: Floating Icon Cluster**
Icons (white SVG / inverted logos on black bg):
- React, Next.js, Node.js, Express.js, MongoDB, PostgreSQL, JavaScript, TypeScript, Python, Java, C++, Tailwind CSS, Prisma, Auth0, Git, Firebase, Supabase, Socket.io, Redis, Ethereum/Web3, NLP/AI

Each icon:
- Random initial position off-screen
- On scroll enter: flies to its orbital position with spring animation
- Continuous float: unique `animation-duration` (7s–15s) + `animation-delay`
- `whileHover: { scale: 1.4 }` on hovered icon, `opacity: 0.3` on all others

**Below both columns — Full width Marquee**:
Continuous left-scroll marquee in DM Mono:
```
REACT · NEXT.JS · NODE.JS · TYPESCRIPT · PYTHON · MONGODB · POSTGRESQL · PRISMA · SOCKET.IO · REDIS · ETHEREUM · WEB3 · MACHINE LEARNING · NLP · TAILWIND · GIT · AUTH0 · SUPABASE · FIREBASE · REST APIs · CHROME EXTENSIONS · SMART CONTRACTS ·
```
Two identical copies, seamless loop, `animation: marquee 30s linear infinite`.

**Tech skills summary** (from resume):
- **Languages**: C, C++, Java, Python, JavaScript, TypeScript, SQL
- **Frameworks**: React.js, Next.js, Node.js, Express.js, Zustand, Tailwind CSS, MongoDB, PostgreSQL, Prisma
- **Technologies**: REST APIs, Auth0, Git, Blockchain (Ethereum), Machine Learning, NLP, UI/UX Design
- **Core**: Full-Stack Development, System Design, AI/ML Integration, Team Leadership, Open Source

---

### SECTION 5 — ACHIEVEMENTS (WHITE BG)

**Layout**: Vertical timeline. Center 1px black line. Cards alternate left and right.

**Timeline line animation**: `scaleY: 0 → 1` driven by section `scrollYProgress`, `transform-origin: top`.

**Active dot**: White circle with black border, CSS keyframe ring ripple on current item.

**Year watermarks**: Behind each card, the year in Cormorant Garamond at `8vw`, `opacity: 0.05`.

**Card entrance**: Left cards: `{ x: -60, opacity: 0 } → { x: 0, opacity: 1 }`. Right cards: `{ x: 60, opacity: 0 } → { x: 0, opacity: 1 }`. Triggered by `whileInView`.

**ACHIEVEMENTS DATA** (all from resume + your addition):

```typescript
export const achievements = [
  {
    year: "2025",
    title: "SIH'25 Winner",
    event: "Smart India Hackathon 2025",
    org: "National Level Competition",
    detail: "India's largest hackathon — national champions.",
    side: "left"
  },
  {
    year: "2025",
    title: "Chancellor's Gold Medal",
    event: "Tech AI Hackathon 2.0",
    org: "Techno India Group",
    detail: "Highest institutional honor for technical excellence.",
    side: "right"
  },
  {
    year: "2025",
    title: "Best Paper Award",
    event: "IEEE ICSAA'25",
    org: "GNIT",
    detail: "ISBN: 978-93-341-6437-4 · Published research paper.",
    side: "left"
  },
  {
    year: "2025",
    title: "IDE Bootcamp Offline Finalist",
    event: "National Entrepreneurship Bootcamp",
    org: "AICTE & Ministry of Education",
    detail: "Selected among top national finalists.",
    side: "right"
  },
  {
    year: "2025",
    title: "Smart Bengal Hackathon — 4th Place",
    event: "Grand Finals",
    org: "RCCIIT",
    detail: "Project: TruthScope — AI fake news detection.",
    side: "left"
  },
  {
    year: "2025",
    title: "Hult Prize Runner Up",
    event: "On-Campus Competition",
    org: "TMSL",
    detail: "Global social entrepreneurship competition.",
    side: "right"
  },
  {
    year: "2024",
    title: "GFG Kolkata Hackathon Winner",
    event: "GeeksForGeeks Kolkata Chapter",
    org: "GeeksForGeeks",
    detail: "First place at GFG Kolkata hackathon.",
    side: "left"
  },
  {
    year: "2024",
    title: "1st Place — E-Summit LAUNCH X",
    event: "E-Summit 2024",
    org: "Jadavpur University",
    detail: "National Finals — Community E-Commerce project.",
    side: "right"
  },
  {
    year: "2024",
    title: "1st Place — HACK-UR-WAY",
    event: "Institution's Innovation Council",
    org: "TMSL",
    detail: "Project: Decentralized Donation Platform.",
    side: "left"
  },
  {
    year: "2024",
    title: "Project Admin — Hacktoberfest",
    event: "MLH Official Event",
    org: "Major League Hacking",
    detail: "250+ participants · 45% repo quality improvement.",
    side: "right"
  }
]
```

---

### SECTION 6 — CONTACT (BLACK BG)

**Layout**: Centered, ultra-sparse. Maximum negative space. This section should feel like a pause.

**Content**:
```
Let's build
something
remarkable.

sujayx07@gmail.com

[GitHub]  [LinkedIn]  [Twitter/X]

© 2025 Sujay Dey · Built with obsession.
```

**Animations**:
- Headline: same cinematic stagger as hero (but white on black)
- Email: on hover, each character independently moves `y: -5px` with stagger — keyboard wave effect
- Social links: underline draws from left on hover (CSS `scaleX: 0 → 1` on `::after`)
- Footer line: DM Mono, 11px, bottom-right, fades in last

**Experience cards** (3 cards, above the contact form area):

```
Google Gemini Campus Ambassador
Aug 2025 – Present · Google Developers Community
Organized workshops for 500+ students · AI literacy initiatives

Tech Co-Lead & Full Stack Developer  
Jan 2024 – Present · Samarth Educational Society, TMSL
+30% traffic · Led Pravidhi, Photography & Graphics teams

Project Admin & Open Source Maintainer
May 2024 – Aug 2024 · Hacktoberfest 2024 (MLH Event)
250+ participants · 45% repo quality improvement
```

Cards enter with `whileInView` stagger. Minimal style: 1px white border, black bg.

---

## GLOBAL POLISH

### Scroll Progress Indicator
Thin 1px line at very top of viewport, `scaleX: 0 → 1` from left as user scrolls. Color: white on black sections, black on white sections (use `mix-blend-mode: difference`).

### Section Transition Gradient Bleed
Component `<SectionTransition from="white" to="black" />`:
```tsx
// Render at bottom of each section
// Absolute positioned, 200px tall
// Gradient from transparent → next section color
// Opacity driven by useTransform on that section's scrollYProgress
```

### Mobile Responsive Rules
- Bento grid → single column stack
- Ribbon section → vertical scroll, cards stacked with `whileInView` entrance
- Font sizes via `clamp()`: e.g., `clamp(2.5rem, 8vw, 7rem)` for headlines
- Custom cursor disabled on touch devices (`@media (hover: none)`)
- Marquee speed halved on mobile

### Accessibility
- `prefers-reduced-motion`: all Framer Motion animations set `duration: 0` and no transforms
- All interactive elements: keyboard navigable, visible focus ring
- Color contrast: white on black / black on white = 21:1 — always passes AAA

### Performance
- `will-change: transform` only on actively animating elements, removed after animation
- `whileInView` with `once: true` for entrance animations
- Font `display: swap`
- Lazy load below-fold sections with Next.js dynamic imports

---

## FILE STRUCTURE

```
/app
  layout.tsx            ← Fonts, global CSS, CustomCursor, Lenis init, noise overlay
  page.tsx              ← All sections in order, SectionTransition between each
  globals.css           ← Tailwind directives, CSS variables, cursor:none, noise SVG

/components
  /ui
    CustomCursor.tsx    ← Magnetic cursor, mix-blend-mode: difference
    Navbar.tsx          ← Fixed, blend-mode, active section tracking, {Sx} logo
    SectionTransition.tsx ← Gradient bleed between sections
    ScrollProgress.tsx  ← Top progress line
    Marquee.tsx         ← Reusable infinite scroll marquee

  /sections
    Hero.tsx            ← Cinematic reveal, parallax, load sequence
    About.tsx           ← Bento grid, orbital tags, globe, counters
    Projects.tsx        ← Sticky ribbon, scroll-driven rotateY, panel reveal
    Skills.tsx          ← Floating icons, marquee
    Achievements.tsx    ← Timeline, scroll-drawn line, alternating cards
    Contact.tsx         ← Sparse layout, wave hover, experience cards

/lib
  data.ts               ← All typed data: projects[], achievements[], skills[]
  utils.ts              ← cn(), lerp(), clamp(), useScrollProgress hook
```

---

## 21ST.DEV INTERACTION PATTERNS
# Reference: https://21st.dev — implement these exact interaction qualities throughout

21st.dev represents the gold standard for React micro-interactions. Every component in this
portfolio should feel like it was pulled from that library. Below are the specific patterns
to implement, mapped to each section.

---

### TEXT ANIMATIONS (apply globally)

**1. Text Reveal — "Split by lines" (Hero + Contact headline)**
- Split the headline string into individual lines using a wrapper div per line
- Each line has an overflow:hidden parent, so text slides up from below the clip
- Animation: `y: "110%" → y: "0%"` (not opacity-based — pure transform slide)
- This is the 21st.dev "TextReveal" / "RevealText" pattern
- Easing: `[0.77, 0, 0.175, 1]` — aggressive ease-out
- Stagger: `0.08s` per line
- Result: each line "rolls up" like a film title card

```tsx
// Pattern:
<div style={{ overflow: 'hidden' }}>
  <motion.div
    initial={{ y: '110%' }}
    animate={{ y: '0%' }}
    transition={{ duration: 0.9, ease: [0.77, 0, 0.175, 1], delay: index * 0.08 }}
  >
    {line}
  </motion.div>
</div>
```

**2. Word-by-word blur reveal (About bio text + Project descriptions)**
- Split text into individual words
- Each word: `filter: blur(8px), opacity: 0, y: 10` → `filter: blur(0), opacity: 1, y: 0`
- Stagger: `0.03s` per word
- Triggered by `whileInView` with `once: true`
- This is the 21st.dev "BlurReveal" / "FadeWords" pattern

**3. Scramble text on hover (Nav links + section labels)**
- On hover, letters rapidly cycle through random characters before settling on the real text
- Use a custom `useScramble` hook: interval-based random char replacement, resolving left-to-right
- Characters to scramble through: `!@#$%^&*<>/|{}[]` + alphanumeric
- Resolve speed: 40ms per character
- This is the 21st.dev "TextScramble" / "GlitchText" pattern

**4. Number ticker (About section counters)**
- Animate from `0` to target number with easing
- Use `useMotionValue` + `useTransform` + `useSpring`
- Display via `motion.span` with `stiffness: 100, damping: 30`
- Add `+` suffix that fades in after number settles
- This is the 21st.dev "AnimatedNumber" / "CountUp" pattern

**5. Gradient text shimmer (Achievement titles on hover)**
- On hover of achievement card title: a white shimmer sweeps left→right across the text
- Implemented via CSS `background: linear-gradient(90deg, #fff 0%, #888 40%, #fff 60%, #888 100%)`
- `background-size: 200%` animated with `background-position: 200% → -200%`
- Duration: 0.8s, ease-in-out

---

### BUTTON & LINK INTERACTIONS (apply to all CTAs)

**6. Magnetic button (Navbar "Connect Me" + Contact CTA)**
- On mouse enter: the button physically pulls toward the cursor
- Calculate `deltaX = (mouseX - buttonCenterX) * 0.35`
- Calculate `deltaY = (mouseY - buttonCenterY) * 0.35`
- Apply via `useSpring` with `stiffness: 150, damping: 15`
- On mouse leave: spring back to `x: 0, y: 0`
- This is the signature 21st.dev "MagneticButton" pattern

```tsx
// Pattern:
const x = useMotionValue(0)
const y = useMotionValue(0)
const springX = useSpring(x, { stiffness: 150, damping: 15 })
const springY = useSpring(y, { stiffness: 150, damping: 15 })

const handleMouseMove = (e) => {
  const rect = ref.current.getBoundingClientRect()
  const centerX = rect.left + rect.width / 2
  const centerY = rect.top + rect.height / 2
  x.set((e.clientX - centerX) * 0.35)
  y.set((e.clientY - centerY) * 0.35)
}
```

**7. Underline draw on hover (all nav links + social links)**
- `::after` pseudo element: `width: 0% → 100%`, `transform-origin: left`
- On mouse leave: `width: 100% → 0%`, but `transform-origin: right` (draws out from right)
- CSS transition: `0.3s cubic-bezier(0.76, 0, 0.24, 1)`
- Line thickness: 1px. Color inverts with section (black on white, white on black)

**8. Pill button fill on hover ("Connect Me" / CTA buttons)**
- Default: transparent bg, 1px border, text
- On hover: bg fills from left to right (not a fade — a wipe)
- Implemented via `::after` with `scaleX: 0 → 1`, `transform-origin: left`
- Text color inverts simultaneously
- Duration: 0.4s, `ease: [0.76, 0, 0.24, 1]`

---

### CURSOR INTERACTIONS (extend the custom cursor)

**9. Cursor label morph (Projects ribbon hover)**
- When cursor enters the ribbon area: circle expands to `60px` and text "VIEW" fades in center
- When cursor enters an achievement card: text changes to "OPEN"
- When cursor enters email in contact: text changes to "COPY" → clicking copies to clipboard, text changes to "✓ COPIED"
- Text inside cursor: DM Mono, 9px, letter-spacing 0.1em

**10. Cursor trail (optional — on hero section only)**
- 8 trailing dots follow the cursor with increasing delay
- Each dot: `4px` circle, `opacity: 1/n` (fading from front to back)
- Implemented with an array of `useMotionValue` pairs, each following previous with `useSpring`
- Disable on scroll to keep perf clean

---

### SCROLL & VIEWPORT INTERACTIONS

**11. Parallax depth layers (Hero section)**
- Implement 3 depth layers that move at different speeds:
  - Layer 1 (headline): `y: scrollY * -0.4` — slowest, foreground feel
  - Layer 2 (sub-tagline): `y: scrollY * -0.6` — medium
  - Layer 3 (horizontal rule): `y: scrollY * -0.8` — fastest, recedes first
- Use `useScroll` + `useTransform` per layer

**12. Staggered card entrance with overshoot (Bento grid, Achievement cards)**
- Cards don't just fade in — they overshoot slightly then settle
- `y: 60 → -8 → 0` with spring physics: `stiffness: 200, damping: 20, mass: 0.8`
- Or use keyframes: `[60, -8, 0]` for y, `[0, 1, 1]` for opacity
- This "bounce settle" is a key 21st.dev signature

**13. Smooth section snap with momentum**
- Sections don't hard-snap — they use Lenis smooth scroll for natural momentum
- As each section enters, its content "wakes up" with `whileInView`
- The gradient bleed transition makes it feel like one continuous surface, not separate pages

**14. Horizontal scroll with velocity (Skills marquee)**
- Marquee speed increases when user scrolls down (velocity-based)
- Capture scroll velocity with `useVelocity(scrollY)` from Framer Motion
- `marqueeSpeed = baseSpeed + scrollVelocity * 0.05`
- On scroll stop: speed eases back to base over 1s
- This is the 21st.dev / Framer Motion "velocity marquee" pattern

```tsx
const scrollVelocity = useVelocity(scrollY)
const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 })
const velocityFactor = useTransform(smoothVelocity, [-1000, 0, 1000], [-5, 0, 5])
```

---

### CARD & PANEL INTERACTIONS

**15. Spotlight / follow-light effect (Bento grid cells)**
- On mouse move over a bento cell: a radial gradient "spotlight" follows the cursor inside the card
- `background: radial-gradient(circle at {mouseX}px {mouseY}px, rgba(255,255,255,0.08) 0%, transparent 60%)`
- Mouse position calculated relative to card bounds
- This is the 21st.dev "SpotlightCard" pattern — very high impact on dark sections

```tsx
const handleMouseMove = (e) => {
  const rect = e.currentTarget.getBoundingClientRect()
  setMousePos({
    x: e.clientX - rect.left,
    y: e.clientY - rect.top
  })
}
// Apply as inline style on the card div
```

**16. 3D tilt on hover (Project detail panel)**
- On mouse move over project panel: subtle 3D rotation follows cursor
- `rotateX: (mouseY - centerY) * -0.015` (max ~10deg)
- `rotateY: (mouseX - centerX) * 0.015` (max ~10deg)
- `transformPerspective: 1000px`
- Applied via `useMotionValue` + `useSpring` with `stiffness: 150, damping: 20`
- On mouse leave: springs back to `rotateX: 0, rotateY: 0`
- This is the 21st.dev "TiltCard" pattern

**17. Ghost image reveal on project hover**
- When hovering project panel: a project screenshot/mockup image appears as ghost bg
- `opacity: 0 → 0.07`, `scale: 1.05 → 1`, `filter: blur(2px) → blur(0px)`
- Transition: 0.6s ease-out
- Image is absolutely positioned, `object-fit: cover`, `border-radius` matches card
- This adds visual depth without breaking the monochromatic rule

---

### PAGE TRANSITION

**18. Route / load transition (Page enter only)**
- Full-screen black overlay on initial load
- `{Sx}` logo fades in center
- Overlay wipes upward: `scaleY: 1 → 0`, `transform-origin: bottom`, duration 0.8s
- Reveals the white hero beneath
- Implemented with Framer Motion `AnimatePresence` on a fixed overlay div
- This is the 21st.dev "PageTransition" / curtain reveal pattern

---

### IMPLEMENTATION NOTES FOR 21ST.DEV PATTERNS

- Install: `npm install framer-motion` (all patterns use Framer Motion — no extra deps needed)
- All spring configs follow 21st.dev defaults: `stiffness: 150–400, damping: 15–50`
- Never use `ease: "linear"` — always use spring physics or custom bezier curves
- Every interaction should have a distinct enter AND exit animation (not just fade out)
- Test all interactions at 0.5× browser zoom — springs should still feel right
- Wrap performance-heavy effects (cursor trail, spotlight) in `requestAnimationFrame`
- Use `will-change: transform` only during active animation, remove after

---



1. **The scroll must feel alive.** Every pixel of scroll does something. The ribbon rotates, the timeline draws, sections bleed into each other. There is no dead scroll.

2. **Zero color.** If you are tempted to add a color, don't. The restraint IS the design.

3. **Typography is the visual.** With no color and no imagery, the type is doing all the heavy lifting. Cormorant Garamond at `10vw` weight 300 italic is more beautiful than any hero image.

4. **The load sequence is the first impression.** The `{Sx}` logo appearing on black, then the world flipping to white — that moment must be flawless.

5. **This portfolio should make someone scroll twice.** Not because they missed something, but because the scroll itself felt good.

Build it with that obsession.
