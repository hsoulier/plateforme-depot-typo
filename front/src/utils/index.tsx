export const onResize = (): void => {
	document.body.style.setProperty(
		"--vh",
		`${document.documentElement.clientHeight / 100}px`
	)
}
