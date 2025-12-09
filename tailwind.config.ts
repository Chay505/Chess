import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // ChessLAB Color Palette
        'chesslab': {
          'cream': '#F6F1EC',
          'gray': '#D7D4CF',
          'sage': '#B2C0B6',
          'forest': '#4D6C58',
          'white': '#FFFFFF',
        },
      },
    },
  },
};
export default config;
