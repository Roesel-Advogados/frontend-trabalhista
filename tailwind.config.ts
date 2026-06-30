import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        wine: {
          50:  "#fdf2f4",
          100: "#fae6ea",
          200: "#f3c4ce",
          300: "#e89aab",
          400: "#d56380",
          500: "#b83a5c",
          600: "#8c1d3f",
          700: "#6e1531",
          800: "#581128",
          900: "#3f0c1c",
        },
        gold: {
          400: "#d4af37",
          500: "#c19a2e",
        },
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', '"Times New Roman"', "serif"],
      },
    },
  },
  plugins: [],
};
export default config;