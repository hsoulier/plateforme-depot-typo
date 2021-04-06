import "../style/main.scss"
import "@grafikart/drop-files-element"
import barba from "@barba/core"
import gsap from "gsap"
import { enteringAnim } from "./animations/global.js"

class App {
	constructor() {
		this.create()
	}
	create() {
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
					once: (data) => {
						enteringAnim()
					},
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
