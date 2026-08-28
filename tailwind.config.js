/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Onest', 'system-ui', 'sans-serif'],
        mono: ['ShareTechMono', 'Onest', 'system-ui', 'monospace'],
        display: ['Unbounded', 'Onest', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
