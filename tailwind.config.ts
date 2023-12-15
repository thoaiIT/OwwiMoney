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
        'owwi-logo': "url('/images/Owwi_logo.png')",
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
        'color-error': '#F03E3E',
        'color-success': '#51cf66',
        'color-mute': '#71717A',
        'gray-03': '#9F9F9F',
        'gray-02': '#878787',
        'gray-01': '#666',
        'light-gray': 'rgba(210, 210, 210, 0.25)',
        celestial_blue: {
          DEFAULT: '#4698D0',
          100: '#0c1f2d',
          200: '#173f59',
          300: '#235e86',
          400: '#2e7db2',
          500: '#4698d0',
        },
        danger: {
          DEFAULT: '#fa5252',
          100: '#c92a2a',
          200: '#e03131',
          300: '#f03e3e',
          400: '#fa5252',
          500: '#ff6b6b',
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
        theme: {
          DEFAULT: 'var(--theme)',
          foreground: 'var(--theme-foreground)',
          hover: 'var(--theme-hover)',
          text: 'var(--theme-text)',
          component: 'var(--theme-component)',
          logo: 'var(--theme-logo)',
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
        overlayShow: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        contentShow: {
          from: { opacity: 0, transform: 'translate(-50%, -48%) scale(0.96)' },
          to: { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
        },

        // Toast
        hide: {
          from: { opacity: 1 },
          to: { opacity: 0 },
        },
        slideIn: {
          from: { transform: 'translateX(calc(100% + var(--viewport-padding)))' },
          to: { transform: 'translateX(0)' },
        },
        swipeOut: {
          from: { transform: 'translateX(var(--radix-toast-swipe-end-x))' },
          to: { transform: 'translateX(calc(100% + var(--viewport-padding)))' },
        },

        // End Toast
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

        //Waterfill
        wave: {
          '0%': {
            x: '-400px',
          },
          '100%': {
            x: '0',
          },
        },
        fillUp: {
          '0%': {
            height: 0,
            y: '130px',
          },
          '100%': {
            height: '160px',
            y: '-30px',
          },
        },
        //end Waterfill

        //WaterWave
        moveForever: {
          '0%': {
            transform: 'translate3d(-90px,0,0)',
          },
          '100%': {
            transform: 'translate3d(85px,0,0)',
          },
        },
        //end WaterWave

        //button gaming shadow
        colorAnim: {
          '0%': {
            fill: 'white',
          },
          '50%': {
            fill: '#FBC638',
          },
          '100%': {
            fill: 'white',
          },
        },

        //loading animation
        jump: {
          '0%, 100%': {
            transform: 'translateY(0)',
          },
          '50%': {
            transform: 'translateY(-10px)',
          },
        },
        shimmer: {
          '100%': {
            transform: 'translateX(100%)',
          },
        },
      },
      animation: {
        overlayShow: 'overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
        contentShow: 'contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',

        'progress-small': 'progressSmall .2s',
        'progress-big': 'progressBig .3s',
        // Toast
        hide: 'hide 100ms ease-in',
        slideIn: 'slideIn 150ms cubic-bezier(0.16, 1, 0.3, 1)',
        swipeOut: 'swipeOut 100ms ease-out',
        // End Toast

        //Loading effect
        waveFillUp: 'wave 0.7s infinite linear, fillUp 10s infinite ease-out alternate',
        transitionTiming: 'cubic-bezier(0.36,0.55,0.63,0.48)',

        //WaterWave
        moveForever: 'moveForever 25s cubic-bezier(.55,.5,.45,.5) infinite',

        //Loaiding Jumping
        jump: 'jump .5s ease-in infinite',
      },
      boxShadow: {
        //button gaming shadow
        buttonShadow: '6px 6px 0 black',
        buttonHoverShadow: '10px 10px 0 #FBC638',
        cardShadow:
          'drop-shadow(0px 0px 1px rgba(0, 0, 0, 0.04)) drop-shadow(0px 2px 6px rgba(0, 0, 0, 0.04)) drop-shadow(0px 16px 24px rgba(0, 0, 0, 0.06))',
      },
    },
  },
  darkMode: 'class',
};
