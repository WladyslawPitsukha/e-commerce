import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'integral': ['"Integral CF"', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
        'satoshi': ['Satoshi', 'sans-serif'],
      },
      fontSize: {
        '40': '40px',
      },
      lineHeight: {
        '100': '100%',
      },
      letterSpacing: {
        '0': '0%',
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      backgroundColor: {
        'color-white': 'rgba(255, 255, 255, 1)',
        'light-gray': 'rgba(240, 240, 240, 1)',
      }
    },
  },
  plugins: [],
};
export default config;
