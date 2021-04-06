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
	},
	rules: {},
	content: {},
}

let a = {
	load: 0,
}
export const enteringAnim = () => {
	const tl = gsap.timeline()
	tl.to(a, {
		load: 100,
		duration: 2,
		ease: "power5.inOut",
		onUpdate: () => {
			DOM.loader.percent.innerHTML = Math.floor(a.load)
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
				duration: 0.4,
				onComplete: () => {
					DOM.loader.loaderWrap.style.setProperty(
						"pointer-events",
						"none"
					)
				},
			},
			"+=.5"
		)
		.from(DOM.navbar.links, {
			y: "120%",
			stagger: 0.2,
		})
}
