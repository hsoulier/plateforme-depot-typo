module.exports = {
	// mode: "jit",
	purge: ["./src/**/*.tsx"],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				black: "#1f1e1e",
				white: "#f3f3f3",
				primary: "#f8923a",
				secondary: "#83a5d8",
			},
			fontFamily: {
				sans: ["roc-grotesk", "sans-serif"],
				serif: ["'Le Murmure'", "Bagnard", "serif"],
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
}
