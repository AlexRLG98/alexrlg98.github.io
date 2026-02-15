/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          300: '#91a7ff',
          400: '#748ffc',
          500: '#5c7cfa',
          600: '#4c6ef5',
        },
        accent: {
          400: '#ffd43b',
          500: '#fcc419',
          600: '#fab005',
        },
        cyber: {
          400: '#69db7c',
          500: '#51cf66',
        },
        danger: {
          400: '#ff6b6b',
          500: '#fa5252',
        },
        surface: {
          0: '#09090b',
          100: '#131318',
          200: '#1a1a22',
          300: '#24242e',
          400: '#2e2e3a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'body-lg': ['1.125rem', { lineHeight: '1.6' }],
        'body': ['0.9375rem', { lineHeight: '1.6' }],
        'caption': ['0.8125rem', { lineHeight: '1.5' }],
      },
    },
  },
  plugins: [],
}
