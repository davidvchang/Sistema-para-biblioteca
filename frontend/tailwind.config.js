/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "Poppins": ["Poppins", "sans-serif"],
      },
      colors: {
        "bg-Menu": "#1f2937",
        "bg-negro": "#282828"
      }
    },
  },
  plugins: [],
}

