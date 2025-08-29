import lineClamp from "@tailwindcss/line-clamp";
import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        sm: "360px",
        md: "768px",
        xl: "1280px",
      },
      colors: {
        light: "#ffffff",
        dark: "#091129",
        "dark-light": "#3a3a3a",
        accent: "#5188ff",
      },
      backgroundImage: {
        "btn-primary":
          "linear-gradient(94.05deg, #091129 -15.57%, #001C58 140.61%)",
        "card-with-img-gradient":
          "linear-gradient(168.67deg, #AFC8FF 8.35%, #FFFFFF 129%)",
      },
      borderImage: {
        "btn-primary": "linear-gradient(90deg, #304F94 0%, #6582C2 100%)",
      },
      fontFamily: {
        montserrat: ["var(--font-montserrat)", "sans-serif"],
        micra: ["Micra", "sans-serif"],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "32px",
          xl: "50px",
        },
      },
    },
  },
  plugins: [lineClamp],
} satisfies Config;
