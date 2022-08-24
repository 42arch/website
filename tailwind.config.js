const colors = require('tailwindcss/colors')
const typography = require("@tailwindcss/typography")({
  modifiers: ["sm"],
});

module.exports = {
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
      colors: {
        primary: '#6366f1'
      }
    }
  },
  variants: {
    extend: {
      typography: ["dark"]
    }
  },
  plugins: [
    typography
  ]
}