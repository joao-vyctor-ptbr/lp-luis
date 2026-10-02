/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        crust: {
          50: '#fffbf5',
          100: '#fcf3e6',
          200: '#f8e4c7',
          300: '#f3cfa0',
          400: '#ecb169',
          500: '#e5933a',
          600: '#d77726',
          700: '#b3581f',
          800: '#8e4520',
          900: '#733a1e',
          950: '#3e1c0d',
        },
        amberGold: '#F59E0B',
        warmDark: '#120f0d',
        cardDark: '#1c1714',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
