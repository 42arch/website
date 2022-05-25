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
    colors: {
      primary: '#2563EB',
      secodary: '#60A5FA'
    },
    extend: {
      
    },
  },
  plugins: [
    require("@tailwindcss/typography")
  ]
}