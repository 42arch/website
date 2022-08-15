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
    colors: {
      primary: '#6366f1'
    }
  },
  plugins: [
    require("@tailwindcss/typography")
  ]
}