import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    screens: {
      mobile: '640px',
      tablet: '1024px',
      desktop: '1280px',
    },
    extend: {
      colors: {
        primary: '#4A9B8E',
        secondary: '#2C3E50',
        accent: '#F39C12',
        success: '#27AE60',
        warning: '#F39C12',
        error: '#E74C3C',
        neutral: {
          50: '#F8F9FA',
          100: '#ECF0F1',
          500: '#7F8C8D',
          900: '#2C3E50',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
        serif: ['Merriweather', 'Georgia', 'serif'],
        mono: ['Fira Code', 'Courier New', 'monospace'],
      },
      fontSize: {
        h1: ['48px', { lineHeight: '1.2', fontWeight: '700' }],
        h2: ['36px', { lineHeight: '1.3', fontWeight: '600' }],
        h3: ['24px', { lineHeight: '1.4', fontWeight: '600' }],
        base: ['16px', { lineHeight: '1.6', fontWeight: '400' }],
      },
    },
  },
  plugins: [],
};
export default config;
