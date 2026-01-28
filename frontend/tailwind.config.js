/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1F2937",
        secondary: "#3B82F6",
        accent: "#10B981",
      },
    },
  },
  plugins: [],
}
