import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
    "./public/**/*.svg"
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"]
      },
      colors: {
        surface: "#0f1117",
        accent: {
          50: "#f5e9ff",
          100: "#e8d3ff",
          200: "#d0a8ff",
          300: "#b87cff",
          400: "#a152ff",
          500: "#8a28ff",
          600: "#6b1fcc",
          700: "#4d1799",
          800: "#300b66",
          900: "#170533"
        }
      },
      boxShadow: {
        glow: "0 0 40px rgba(138, 40, 255, 0.4)"
      }
    }
  },
  plugins: []
};

export default config;
