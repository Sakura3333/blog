/** @type {import('tailwindcss').Config} */
module.exports = {  
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'media', // 'media' or 'class'
  theme: {
    extend: {
      minWidth: ({ theme }) => ({
        ...theme('spacing'),
      }),
      fontFamily: {
        modul: [
          'modul'
        ],
        uniwide: [
          'uniwide'
        ]
      },
      width: {
        '3/2': '150%',
        '2rate': '200%',
        '3/8': '37.5%'
      },
      height: {
        '3/2': '150%',
        '2rate': '200%',
        '3/8': '37.5%'
      },
      margin: {
        '1/2': "50%"
      },
      transitionDuration: {
        1200: '1200ms',
        1400: '1400ms',
        1600: '1600ms',
        1800: '1800ms',
        2000: '2000ms',
      },
      backdropBlur: {
        xs: '2px'
      },
      backgroundSize: {
        '2rate': '200%',
        'h-2rate': '100% 200%',
        'w-2rate': '200% 100%'
      },
      aspectRatio: {
        '1x4': '1 / 4',
        '3x7': '3 / 7',
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}