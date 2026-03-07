/** @type {import('tailwindcss').Config} */
export default {
  // Scan all React source files for class names
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  // Force dark mode to always be active (no toggle needed)
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [],
}
