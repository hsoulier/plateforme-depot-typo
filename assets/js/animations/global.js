import gsap from "gsap"

const DOM = {
	loader: {
		loaderWrap: document.querySelector(".loader-screen"),
		percent: document.getElementById("loader"),
		bar: document.querySelector(".loader-screen__progress"),
		spans: document.querySelectorAll(".loader-screen span"),
	},
	navbar: {
		links: document.querySelectorAll(".nav__link a"),
		vLine: document.querySelector(".nav .v-line"),
	},
	rules: {
		hLine: document.querySelector(".rules .h-line"),
		vLine: document.querySelector(".rules .v-line"),
		content: document.querySelectorAll(
			".rules__rules > *, .rules__footer > *"
		),
	},
	content: document.querySelectorAll(".current-word > *"),
}
let a = {
	load: 0,
}

const DEBUG = 0.1
export const enteringAnim = () => {
	const tl = gsap.timeline()
	tl.to(a, {
		load: 100,
		duration: DEBUG || 1.5,
		ease: "power5.inOut",
		onUpdate: () => {
			DOM.loader.percent.innerHTML = `${Math.floor(a.load)}`
			DOM.loader.bar.style.setProperty(
				"transform",
				`translate3d(calc(${Math.floor(a.load) - 100} * 1%), 0, 0)`
			)
		},
	})
		.to(
			DOM.loader.loaderWrap,
			{
				opacity: 0,
				duration: DEBUG || 0.3,
				onComplete: () => {
					DOM.loader.loaderWrap.style.setProperty(
						"pointer-events",
						"none"
					)
				},
			},
			"+=.75"
		)
		.from(DOM.rules.hLine, {
			x: "-100%",
		})
		.from(DOM.rules.vLine, {
			y: "-100%",
			duration: DEBUG || 0.8,
		})
		.from(
			DOM.navbar.vLine,
			{
				y: "100%",
				duration: DEBUG || 0.8,
			},
			"-=.8"
		)
		.from(
			DOM.navbar.links,
			{
				y: "120%",
				stagger: 0.18,
			},
			"-=.3"
		)
		.from(
			DOM.rules.content,
			{
				opacity: 0,
				x: -50,
				stagger: 0.18,
			},
			"-=.4"
		)
		.from(
			DOM.content,
			{
				opacity: 0,
				stagger: 0.18,
				ease: "linear",
			},
			"-=.5"
		)
	return tl
}
