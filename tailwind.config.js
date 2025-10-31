/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "src/**/*.{vue,js,ts}"
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '24px'
      }
    },
    fontSize: {
      xl: ['26px', { lineHeight: '1.36' }],
      lg: ['18px', { lineHeight: '1.36' }],
      base: ['16px', { lineHeight: '1.36' }],
      sm: ['14px', { lineHeight: '1.36' }],
      xs: ['13px', { lineHeight: '1.36' }],
      '2xs': ['12px', { lineHeight: '1.36' }],
      '3xs': ['10px', { lineHeight: '1.36' }],
    },
    extend: {
      fontFamily: {
        sans: ['Open Sans', 'ui-sans-serif', 'system-ui']
      },
      colors: {
        bgDark: '#000000',
        bgLight: '#2d2d2d',
        text: '#FFFFFF',
        border: '#A7A7A7',
        borderAlt: '#9E9E9E',
        danger: '#B76969'
      },
      borderRadius: {
        sm: '5px',
        md: '8px'
      },
      spacing: {
        13: '52px'
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography')
  ],
}
