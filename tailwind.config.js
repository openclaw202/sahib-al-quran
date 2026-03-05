/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Graphik Arabic"', 'sans-serif'],
        graphik: ['"Graphik Arabic"', 'sans-serif'],
        uthmani: ['"UthmanicHafs1"', '"Amiri Quran"', '"Scheherazade New"', '"Traditional Arabic"', 'serif'],
      },
    },
  },
  plugins: [],
}
