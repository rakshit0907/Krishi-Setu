import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        earth: {
          50: '#faf8f3',
          100: '#f5f1e6',
          200: '#e8dfc7',
          300: '#d4c5a0',
          400: '#b9a577',
          500: '#a08c5a',
          600: '#8b7849',
          700: '#73603d',
          800: '#5f4f36',
          900: '#4f4230',
        }
      },
    },
  },
  plugins: [],
};
export default config;
