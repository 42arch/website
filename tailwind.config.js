/** @type {import('tailwindcss').Config} */
const { fontFamily } = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

module.exports = {
  darkMode: 'class',
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}', // Note the addition of the `app` directory.
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './content/**/*.{md,mdx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        graphik: ['var(--font-graphik)'],
        sans: ['var(--font-sans)', ...fontFamily.sans]
      },
      colors: {
        primary: colors.zinc,
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
