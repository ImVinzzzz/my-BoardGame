/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        // font-display -> titoli (Fredoka, meno "serio" di un serif classico)
        display: ['Fredoka', 'sans-serif'],
        // font-sans -> testo (Inter), sovrascrive il sans-serif di default
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
