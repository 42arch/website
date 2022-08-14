const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
	purge: [
		'./pages/**/*.{js,ts,jsx,tsx}', 
		'./components/**/*.{js,ts,jsx,tsx}'
	],
  theme: {
    extend: {
      fontFamily: {
				'common': ['DIN', 'Noto'],
				'common-bold': ['DIN Bold', 'Noto Bold'],
			},
    },
  },
  plugins: [
    require("@tailwindcss/typography")
  ]
}