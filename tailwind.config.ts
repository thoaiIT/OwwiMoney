/** @type {import('tailwindcss').Config, import { radixThemePreset } from 'radix-themes-tw';} */

module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}', './ui/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'owwi-pattern': "url('/img/Owwi_background.png')",
      },
      colors: {
        'dark-mode': '#212332',
        'light-mode': '#f9f7f7',
        'dark-cpn': '#112D4E',
        'dark-blue': '#465685',
        'owwi-title': '#465685',
        'btn-color': '#A93159',
        'light-blue': '#E2EEF5',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
};
