/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        mercury:  { 400: '#38bdf8', 500: '#0ea5e9', 600: '#0284c7', 700: '#0369a1', 800: '#075985', 900: '#0c4a6e' },
        propedge: { 400: '#fb923c', 500: '#f97316', 600: '#ea580c', 700: '#c2410c' },
        howl:     { 400: '#c084fc', 500: '#a855f7', 600: '#9333ea', 700: '#7e22ce' },
        codex:    { 400: '#fbbf24', 500: '#f59e0b', 600: '#d97706', 700: '#b45309' },
        life:     { 400: '#60a5fa', 500: '#3b82f6', 600: '#2563eb', 700: '#1d4ed8' },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
