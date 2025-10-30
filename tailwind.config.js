import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["var(--font-poppins)", "sans-serif"],
      },
      colors: {
        'primary-blue': '#007aff', // A strong, clean blue
        'light-blue': '#e0f2fe',   // A very light blue for backgrounds
        'accent-blue': '#38bdf8',  // A brighter cyan/blue for highlights
      },
    },
  },
  plugins: [],
};
export default config;