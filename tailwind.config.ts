import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        orange: {
          brand: "#F28C38",
          light: "#fdf0e3",
          dark: "#d4722a",
        },
        teal: {
          brand: "#2A6259",
          light: "#e8f5f0",
          dark: "#1e3a34",
        },
        cream: "#faf7f4",
        sand: "#f7f3ef",
      },
      fontFamily: {
        serif: ["Georgia", "serif"],
        sans: ['"Segoe UI"', "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
