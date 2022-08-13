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
				'DIN': ['DIN'],
				'DIN-bold': ['DIN Bold'],
			},
    },
  },
  plugins: [
    require("@tailwindcss/typography")
  ]
}