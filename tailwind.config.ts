import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-lato)', 'sans-serif'], // Correct Lato import
      },
      colors: {
        background: "#F4FFFE",
        primary: "#00A991",  // Buttons, highlights
        secondary: "#E6F7F6", // Cards / sections
      },
    },
  },
  plugins: [],
};

export default config;
