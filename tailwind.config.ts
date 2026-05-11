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
        emerald: {
          primary: "#1D9E75",
          dark: "#085041",
        },
        text: {
          DEFAULT: "#2C2C2A",
          secondary: "#4A4A47",
        },
        // Override all gray shades used for secondary text
        gray: {
          300: "#4A4A47",
          400: "#4A4A47",
          500: "#4A4A47",
          600: "#4A4A47",
          200: "#D3D1C7",
          100: "#E8E6DF",
          50: "#F1EFE8",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      borderRadius: {
        btn: "8px",
      },
    },
  },
  plugins: [],
};
export default config;
