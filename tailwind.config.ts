import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        terminal: {
          bg: "#06080D",
          panel: "#0B0F16",
          panel2: "#111722",
          border: "#1D2633",
          muted: "#8993A3",
          text: "#E7EDF5",
          amber: "#D7A84E",
          red: "#D46464",
          green: "#53B987",
          cyan: "#5AA7D6"
        }
      },
      boxShadow: {
        glow: "0 14px 38px rgba(0, 0, 0, 0.22)",
        panel: "0 10px 28px rgba(0, 0, 0, 0.18)",
        terminal: "0 20px 70px rgba(0, 0, 0, 0.42), inset 0 1px 0 rgba(255, 255, 255, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
