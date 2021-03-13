module.exports = {
	purge: {
		enabled: true,
		content: ["./views/**/*.hbs", "./public/**/*.css", "./public/**/*.js"],
	},
	darkMode: false, // or 'media' or 'class'
	theme: {
		fontFamily: {
			mono: ['"Space Mono"', "monospace"],
		},
		zIndex: {
			n1: -1,
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
}
