/** @type {import('tailwindcss').Config, import { radixThemePreset } from 'radix-themes-tw';} */

module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'dark-mode': '#112d4e',
        'light-mode': '#f9f7f7',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
};
