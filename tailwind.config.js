/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        black: "#000000",
        white: "#ffffff",
        "gray-100": "#f5f5f5",
        "gray-200": "#e8e8e8",
        "gray-500": "#888888",
        "gray-900": "#111111",
        "gray-800": "#1a1a1a",
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "serif"],
        ui: ["var(--font-syne)", "sans-serif"],
        mono: ["var(--font-dm-mono)", "monospace"],
      },
      animation: {
        "marquee": "marquee 30s linear infinite",
        "marquee-fast": "marquee 15s linear infinite",
        "orbit": "orbit 12s linear infinite",
        "globe-rotate": "globe-rotate 20s linear infinite",
        "float": "float 8s ease-in-out infinite",
        "ripple": "ripple 1.5s ease-out infinite",
        "shimmer": "shimmer 0.8s ease-in-out",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        orbit: {
          "0%": { transform: "rotate(0deg) translateX(120px) rotate(0deg)" },
          "100%": { transform: "rotate(360deg) translateX(120px) rotate(-360deg)" },
        },
        "globe-rotate": {
          "0%": { transform: "rotateY(0deg)" },
          "100%": { transform: "rotateY(360deg)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        ripple: {
          "0%": { transform: "scale(1)", opacity: "1" },
          "100%": { transform: "scale(2.5)", opacity: "0" },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
      },
    },
  },
  plugins: [],
};
