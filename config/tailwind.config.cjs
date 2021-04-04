module.exports = {
	purge: {
		enabled: true,
		content: ["./views/**/*.hbs", "./public/css/*.css", "./public/js/*.js"],
	},
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			fontFamily: {
				mono: ['"Space Mono"', "monospace"],
			},
			zIndex: {
				n1: -1,
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
}
