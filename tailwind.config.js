/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        leather: {
          DEFAULT: '#8B4513',
          light: '#D2691E',
          dark: '#3E2723',
        },
        gold: {
          foil: '#BF953F',
        }
      },
      fontFamily: {
        serif: ['Times New Roman', 'YuMincho', 'Hiragino Mincho ProN', 'serif'],
      }
    },
  },
  plugins: [],
}
