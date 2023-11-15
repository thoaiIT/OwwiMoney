/** @type {import('tailwindcss').Config, import { radixThemePreset } from 'radix-themes-tw';} */

module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    content: ['./app/**/*.tsx', './components/**/*.tsx'],
    fontFamily: {
      display: 'var(--display-font)',
    },
    extend: {
      corePlugins: [require('@tailwindcss/aspect-ratio')],
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'owwi-pattern': "url('/img/Owwi_background.png')",
      },
      fontWeight: {
        display: {
          light: 300,
          normal: 400,
          semibold: 600,
          bold: 700,
        },
      },
      colors: {
        'dark-mode': '#212332',
        'light-mode': '#f9f7f7',
        'dark-cpn': '#112D4E',
        'dark-blue': '#465685',
        'btn-color': '#A93159',
        'light-blue': '#E2EEF5',
        'blue-sm': '#9BADCA',
        'color-resend': '#F2451C',
        celestial_blue: {
          DEFAULT: '#4698D0',
          100: '#0c1f2d',
          200: '#173f59',
          300: '#235e86',
          400: '#2e7db2',
          500: '#4698d0',
        },
        seasalt: {
          DEFAULT: '#F8F7F7',
          100: '#352e2e',
          200: '#6a5c5c',
          300: '#9c8d8d',
          400: '#cac2c2',
          500: '#f8f7f7',
        },
        white: {
          DEFAULT: '#FFFFFF',
          100: '#333333',
          200: '#666666',
          300: '#999999',
          400: '#cccccc',
          500: '#ffffff',
        },
        ocean_blue: {
          DEFAULT: '#4F5E8B',
          100: '#10131c',
          200: '#202638',
          300: '#2f3954',
          400: '#3f4b70',
          500: '#4f5e8b',
        },
        midnight_blue: {
          DEFAULT: '#243C5F',
          100: '#070c13',
          200: '#0f1826',
          300: '#16243a',
          400: '#1d304d',
          500: '#243c5f',
        },
        lavender: {
          DEFAULT: '#E6E6FA',
          100: '#D1D1FF',
          200: '#B8B8FF',
          300: '#9E9EFF',
          400: '#8585FF',
          500: '#6B6BFF',
        },
        mango: {
          DEFAULT: '#FFD700',
          100: '#FFE066',
          200: '#FFDA80',
          300: '#FFE599',
          400: '#FFF0B3',
          500: '#FFFACC',
        },
        peach: {
          DEFAULT: '#FFDAB9',
          100: '#FFE5CC',
          200: '#FFEBD6',
          300: '#FFF2E0',
          400: '#FFF8EA',
          500: '#FFFEF5',
        },
        sage: {
          DEFAULT: '#BCD8C1',
          100: '#C5DBC9',
          200: '#CEDFCD',
          300: '#D6E3D1',
          400: '#DFE7D5',
          500: '#E8EBD9',
        },
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)',
          hover: 'var(--card-hover)',
        },
      },
      fontSize: {
        '2xs': '0.625rem', // Extra small
        xs: '0.75rem', // Small
        sm: '0.875rem', // Sub-compact
        base: '1rem', // Base
        lg: '1.125rem', // Large
        xl: '1.25rem', // Extra large
        '2xl': '1.5rem', // Double extra large
        '3xl': '1.875rem', // Triple extra large
        '4xl': '2.25rem', // Quadruple extra large
        '5xl': '3rem', // Penta extra large
        '6xl': '3.75rem', // Hexa extra large
        '7xl': '4.5rem', // Hepta extra large
        '8xl': '6rem', // Octa extra large
        '9xl': '8rem', // Nona extra large
      },
      keyframes: {
        progressSmall: {
          '0%': {
            transform: 'translateX(0%)',
          },
          '100%': {
            transform: 'translateX(100%)',
          },
        },
        progressBig: {
          '0%': {
            width: '0%',
          },
          '100%': {
            width: '100%',
          },
        },
      },
      animation: {
        'progress-small': 'progressSmall .2s',
        'progress-big': 'progressBig .3s',
      },
    },
  },
  darkMode: 'class',
};
