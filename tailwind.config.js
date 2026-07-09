/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: '#04080f',
        ocean: '#0e4d6e',
        teal: '#1a7a8a',
        aqua: '#2ab3c2',
        mint: '#4dd9b0',
        amber: '#f0a500',
        sunset: '#e85d34',
        blush: '#f7c5a0',
        cream: '#fdf6ec',
        glass: 'rgba(255, 255, 255, 0.08)',
        'glass-border': 'rgba(255, 255, 255, 0.12)',
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['DM Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
