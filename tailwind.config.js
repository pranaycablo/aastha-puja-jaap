/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bhagwa: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
          950: '#431407',
        },
        sacredGold: {
          light: '#FDE047',
          DEFAULT: '#EAB308',
          dark: '#CA8A04',
          antique: '#B45309'
        },
        templeMaroon: {
          DEFAULT: '#450a0a',
          dark: '#2d0606'
        }
      },
      fontFamily: {
        sanskrit: ['Rozha One', 'serif'],
        hindi: ['Yatra One', 'Mukta', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'ring-bell': 'bellRing 0.5s ease-in-out',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        bellRing: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(15deg)' },
          '75%': { transform: 'rotate(-15deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
}
