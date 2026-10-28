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
        brand: {
          blue: "#0A4D9F",       // SMPS Core Deep Blue
          lightBlue: "#0070BA",
          orange: "#E85D04",     // Power Electronics Delta Orange
          dark: "#0F172A",       // Deep Slate Background
          card: "#1E293B",       // Slate Card
          border: "#334155",
        },
      },
    },
  },
  plugins: [],
};
export default config;
