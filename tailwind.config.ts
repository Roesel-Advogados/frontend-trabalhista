import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#1a2332",
        brand: "#1e40af",
      },
    },
  },
  plugins: [],
};
export default config;
