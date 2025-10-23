import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class", // usamos clase .dark en <html>
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}", // si no usas pages podés quitarlo
    "./src/**/*.{js,ts,jsx,tsx}",   // opcional si tu código vive en /src
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
