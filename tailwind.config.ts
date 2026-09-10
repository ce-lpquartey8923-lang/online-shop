import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#18211f",
        sage: "#dce8df",
        moss: "#315b4d",
        coral: "#ef8b6d",
        sand: "#f6f3ed"
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        display: ["var(--font-display)"]
      },
      boxShadow: {
        soft: "0 16px 45px rgba(24, 33, 31, .08)"
      }
    }
  },
  plugins: []
};

export default config;
