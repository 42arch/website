/** @type {import('tailwindcss').Config} */
const { fontFamily } = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

module.exports = {
  darkMode: ['class'],
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}', // Note the addition of the `app` directory.
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './content/**/*.{md,mdx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        handwrite: ['var(--font-handwrite)'],
        sans: ['var(--font-graphik)', ...fontFamily.sans]
      },
      colors: {
        primary: colors.sky[600],
        light: colors.gray[50],
        'light-gray': colors.gray[100],
        'dark-gray': colors.gray[900],
        dark: colors.gray[950],
        gray: colors.neutral
      },
      dropShadow: {
        light: '8px 8px 0 rgb(209, 213, 219)',
        dark: '8px 8px 0 rgb(0 0 0 / 1)'
      }
    }
  },
  plugins: [require('@tailwindcss/typography')]
}
