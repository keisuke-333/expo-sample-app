/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      "noto-reqular": ["NotoSansJP_400Regular", "sans-serif"],
      "noto-bold": ["NotoSansJP_700Bold", "sans-serif"],
    },
    extend: {},
  },
  plugins: [],
}
