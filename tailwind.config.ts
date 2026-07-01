import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        teal: {
          50:  "#eef7f9",
          100: "#d6ecf0",
          200: "#a9d6de",
          300: "#74bcca",
          400: "#3f9dae",
          500: "#1a8296",
          600: "#127d8e",
          700: "#0f6675",
          800: "#0e5561",
          900: "#0c4651",
        },
        slate: {
          400: "#8b98a2",
          500: "#7d8a94",
          600: "#6b7a85",
          700: "#566169",
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