import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        black: "#141210",
        espresso: "#221D17",
        ivory: "#F2ECE1",
        "ivory-deep": "#E8DFCD",
        gold: "#BE9A5C",
        "gold-light": "#E4CB9B",
        "gold-dim": "#8C7444",
        ink: "#1B1712",
        "ink-soft": "#4A4437",
        line: "rgba(228,203,155,0.28)",
        "line-light": "rgba(27,23,18,0.14)",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        body: ["var(--font-jost)", "sans-serif"],
        script: ["var(--font-cormorant)", "serif"],
      },
    },
  },
  plugins: [],
};
export default config;
