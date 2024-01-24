/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        animation: {
          fadeIn: 'fadeIn 1s ease-in-out',
        },
      fontFamily: {
        VT323: ["VT323", "sans-serif"],
      },
    },
  },
  plugins: [],
}