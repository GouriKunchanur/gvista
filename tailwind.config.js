/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gvista: {
          dark: '#1A120B',
          secondary: '#3E2723',
          gold: '#C9A44C',
          'gold-light': '#DFC27D',
          cream: '#F5E6C8',
          surface: '#241A12',
          surfaceLight: '#2F2117',
          border: '#3F2F23',
          borderLight: '#523E2E',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        serif: ['Cinzel', 'Playfair Display', 'Georgia', 'serif'],
      },
      boxShadow: {
        'gold-glow': '0 0 25px -5px rgba(201, 164, 76, 0.25)',
        'gold-glow-lg': '0 0 45px -5px rgba(201, 164, 76, 0.35)',
      },
      animation: {
        'wave-pulse': 'wavePulse 2s ease-in-out infinite',
      },
      keyframes: {
        wavePulse: {
          '0%, 100%': { height: '8px', opacity: '0.4' },
          '50%': { height: '28px', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}
