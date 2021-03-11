module.exports = {
    purge: {
      enabled: true,
      content: [
        "./views/**/*.hbs",
        "./public/**/*.css",
        "./public/**/*.js",
        ]
      },
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {},
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
