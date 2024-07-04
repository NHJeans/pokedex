import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "home-background": "url('/pxfuel.jpg')",
      },
      fontFamily: {
        pixelify: ["PixelifySans", "sans-serif"],
        pokemongsk: ["PokemonGSK", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
