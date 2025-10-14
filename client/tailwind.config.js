/** @type {import('tailwindcss').Config} */
export default {
   content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        Brown:'#4E342E',
        DarkCream:'#E2B787',
        Cream:'#EAD5AE',
        Beige:'#EFDFBD',
        Redwood:'#9A665B',
        BurntGold :'#C9A14A',
        MutedGold :'#C6A664',
        Gold: '#D4AF37',

      }
    },
  },
  plugins: [],
}

