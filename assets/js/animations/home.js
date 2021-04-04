import { gsap } from "gsap"
import "splitting/dist/splitting.css"
import "splitting/dist/splitting-cells.css"
import Splitting from "splitting"


export default function () {
	Splitting()
	const indicator = document.querySelectorAll(
		"p .word > .char, p .whitespace"
	)
	const word = document.querySelectorAll("h1 .word > .char, h1 .whitespace")

	;[...indicator, ...word].forEach((el) => {
		el.style.setProperty("opacity", 0)
		el.style.setProperty("transform", "translateY(100%)")
	})
	window.scrollTo(0, 0)
	const tl = gsap.timeline({
		// paused: true,
		timeScale: 2,
		onStart: () => {
			document.body.style.setProperty("max-height", "100vh")
			document.body.style.setProperty("overflow-y", "hidden")
		},
		defaults: {
			ease: "power2.out",
		},
		onReverseComplete: () => {
			gsap.to(document.querySelectorAll(".stripe"), {
				y: "100%",
				duration: 1.2,
				// stagger: 0.1,
				ease: "power2.out",
				onComplete: () => {
					document
						.querySelector(".loader")
						.style.setProperty("height", "0")
					document.body.style.setProperty("max-height", "none")
					document.body.style.setProperty("overflow-y", "auto")
				},
			})
		},
	})

	tl.to(
		indicator,
		{
			stagger: 0.02,
			y: 0,
			opacity: 1,
		},
		1
	).to(
		[...word].reverse(),
		{
			stagger: 0.02,
			y: 0,
			opacity: 1,
			onComplete: () => {
				setTimeout(() => {
					tl.reverse()
				}, 2000)
			},
		},
		1
	)
}
