/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FDFBF7',
          100: '#FAF6EE',
          200: '#F4ECE0',
          300: '#EADBC8',
          400: '#DEC9AE',
          500: '#CFB28E',
          600: '#BA9971',
          700: '#9E7C55',
          800: '#7F6242',
          900: '#5F482F',
        },
        warm: {
          bg: '#FAF7F2',
          card: '#FFFFFF',
          surface: '#F4EFE8',
          border: '#E8E1D5',
          muted: '#8C8275',
          dark: '#1C1917',
          charcoal: '#292524'
        },
        accent: {
          terracotta: '#C25E38',
          amber: '#D97706',
          sand: '#E6D7C3',
          bronze: '#9A6B3D',
          emerald: '#0F766E',
          sage: '#4D7C0F'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'Plus Jakarta Sans', 'sans-serif']
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'marquee': 'marquee 25s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      }
    },
  },
  plugins: [],
}
