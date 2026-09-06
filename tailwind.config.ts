import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#FF6B00",
          light: "#FF9933",
          dark: "#E65C00",
        },
      },
    },
  },
  plugins: [],
}
export default config
