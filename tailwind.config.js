/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans-loaded)', 'Helvetica Neue', 'sans-serif'],
        display: ['var(--font-display-loaded)', 'Georgia', 'serif'],
        mono: ['var(--font-mono-loaded)', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
}
