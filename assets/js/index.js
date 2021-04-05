import "../style/main.scss"
import "@grafikart/drop-files-element"
import barba from "@barba/core"
import gsap from "gsap"

class App {
	constructor() {
		this.create()
	}
	create() {
		console.log("Hello")
		window.addEventListener("load", () => {
			this.initBarba()
		})
	}
	initBarba() {
		barba.hooks.afterLeave(({ current }) => {
			if (current.namespace === "home") {
				window.removeEventListener("resize", this.resizeWord)
			}
		})
		barba.hooks.beforeEnter(({ next }) => {
			if (next.namespace === "home") {
				this.resizeWord()
				window.addEventListener("resize", this.resizeWord)
			}
		})
		barba.init({
			debug: false,
			transitions: [
				{
					name: "Default Transition",
					once: ({ next }) =>
						gsap.from(document.querySelectorAll(".nav__link a"), {
							stagger: 0.2,
							y: "110%",
						}),
					leave: ({ current }) =>
						gsap.to(current.container, { opacity: 0, y: 50 }),
					enter({ next }) {
						gsap.from(next.container, {
							y: 50,
							opacity: 0,
						})
					},
				},
			],
		})
	}
	resizeWord() {
		const word = document.querySelector(".current-word h1") || false
		const w = document.querySelector("[data-barba=container]").clientWidth
		const result = (w * 1.35) / word.textContent.length
		word.style.setProperty("font-size", `calc(${result} * 1px)`)
	}
}

window.addEventListener("DOMContentLoaded", () => {
	const app = new App()
})

// TODO: Implement Loader
const loader = document.getElementById("loader")
const max = 100
let lastN = 0
const steps = 20
const getNumberBetween = (low, high) => {
	const n = Math.floor(Math.random() * steps + low)
	return n > high ? high : n
}
const intervalLoader = setInterval(() => {
	lastN = getNumberBetween(lastN, max)

	loader.innerHTML = lastN

	if (lastN >= max) {
		window.clearInterval(intervalLoader)
	}
}, 100)
