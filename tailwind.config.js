/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#f6fae6",
          200: "#e4f0b6",
          300: "#d2e685",
          400: "#c0dc54",
          500: "#aed224",
          600: "#A6CE0C",
          800: "#637b07",
        },
        secondary: {
          50: "#f0ecf6",
          100: "#d3c7e4",
          200: "#a88fc9",
          300: "#997cc0",
          400: "#8b6ab7",
          500: "#7c57ae",
          600: "#6E45A6",
        },
        error: "#FC2D4E",
      },
    },
  },
  plugins: [],
}
