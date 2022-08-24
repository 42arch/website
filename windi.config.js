import { defineConfig } from 'windicss/helpers'

export default defineConfig({
  darkMode: 'class',
  extract: {
    include: ['**/*.{jsx,tsx,css}'],
    exclude: ['node_modules', '.git', '.next'],
  },
  theme: {
    extend: {
      fontFamily: {
				'common': ['DIN', 'Noto'],
				'common-bold': ['DIN Bold', 'Noto Bold'],
			},
      colors: {
        primary: '#6366f1'
      }
    }
  },
  plugins: [
    require('windicss/plugin/typography')({
      dark: true
    }),
  ],
})