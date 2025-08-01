/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{html,js}',
  ],
  theme: {
    extend: {
      colors: {
        'custom-purple': '#5B46E5',
        'custom-indigo': '#A5B4FC',
        'dark-navy': '#0F0F23',
        'dark-slate': '#1A1A2E',
      },
      backgroundImage: {
        
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        rajdhani: ['Rajdhani', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
