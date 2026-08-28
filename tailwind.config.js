/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      screens: {
        short: { raw: '(min-width: 640px) and (max-height: 800px)' },
      },
      fontFamily: {
        sans: ['ShareTechMono', 'Onest', 'system-ui', 'monospace'],
        mono: ['ShareTechMono', 'Onest', 'system-ui', 'monospace'],
        display: ['Unbounded', 'Onest', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
