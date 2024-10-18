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
        urbane: ['"urbane-rounded"', 'sans-serif'],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'verde-goodkidz': '#00E58D',
        'gris-goodkidz': '#525156',
        'blanco-goodkidz': '#FCFCFC',
      },
      screens: {
        sm: '640px',  // small devices
        md: '768px',  // medium devices
        lg: '1024px', // large devices
        xl: '1280px', // extra large devices
      },
    },
  },
  plugins: [],
};

export default config;
