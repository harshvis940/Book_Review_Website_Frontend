// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html", // for Vite
    "./src/**/*.{js,jsx,ts,tsx}", // for React components
  ],
  theme: {
    extend: {
      colors: {
        bgMain: "red",
        accentBg: "#ffcc00",
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
