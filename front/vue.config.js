module.exports = {
	runtimeCompiler: true,
	css: {
		loaderOptions: {
			sass: {
				additionalData: `
            @import "@/style/main.scss";
            `,
			},
		},
	},
}
