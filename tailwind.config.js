/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        saffron: {
          DEFAULT: '#FF9933',
          glow: '#FF7722',
          light: '#FFB066',
          dark: '#E65C00',
        },
        indiagreen: {
          DEFAULT: '#138808',
          glow: '#10B981',
          light: '#34D399',
          dark: '#0B5E05',
        },
        navy: {
          chakra: '#000080',
          deep: '#0F172A',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        display: ['Cinzel', 'serif'],
        serifLuxury: ['"Playfair Display"', 'serif'],
        handwriting: ['Caveat', 'cursive'],
        script: ['"Marck Script"', 'cursive'],
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
      }
    },
  },
  plugins: [],
}
