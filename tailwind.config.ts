import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'hydra-blue': '#1e40af',
        'hydra-light': '#3b82f6',
        'hydra-dark': '#0f172a',
        'hydra-deeper': '#060c1a',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        bebas: ['var(--font-bebas)', 'Impact', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
