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
        mono: ['JetBrains Mono', 'SF Mono', 'Monaco', 'Inconsolata', 'Fira Code', 'monospace'],
        display: ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: '#0a0a0a',
        secondary: '#1a1a1a',
        accent: '#2a2a2a',
        blue: '#3b82f6',
        green: '#10b981',
        purple: '#8b5cf6',
        orange: '#f59e0b',
      }
    },
  },
  plugins: [],
}