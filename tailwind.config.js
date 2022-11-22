const { fontFamily } = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  darkMode: false,
  theme: {
    extend: {
      height: {
        main: 'calc(100% - 6rem)'
      },
      minHeight: {
        screen: '100vh',
        main: 'calc(100% - 6rem)'
      },
      colors: {
        ...colors,
        'th-bg': 'var(--bg)',
        'th-text': 'var(--text)',
        'th-text-h': 'var(--text-header)',
        'th-fg': 'var(--fg)',
        'th-mark': 'var(--mark)',
        'th-border': 'var(--border)'
      },
      fontFamily: {
        zpix: ['zpix'],
        rubik: ['rubik', fontFamily.sans],
        abril: ['abril']
      }
    }
  },
  plugins: [require('@tailwindcss/typography')]
}
