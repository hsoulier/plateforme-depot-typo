import "../style/main.scss"
import "@grafikart/drop-files-element"
import barba from "@barba/core"
import gsap from "gsap"
import { enteringAnim } from "./animations/global.js"
import SliderImage from "./home"
import { Login } from "./login"

class App {
	constructor() {
		this.create()
		this.loco = null
		this.login = null
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
				this.loco.getScroll().destroy()
			}
			if (current.namespace === "login") {
				this.login = this.login.destroy()
			}
		})
		barba.hooks.beforeEnter(({ next, current }) => {
			if (next.namespace === "home") {
				this.resizeWord()
				window.addEventListener("resize", this.resizeWord)
				if (current.namespace === "") {
					this.loco = new SliderImage(5)
				} else {
					this.loco = new SliderImage(0)
				}
			}
			if (next.namespace === "login") {
				this.login = new Login({ form: ".login-form" })
			}
		})
		barba.init({
			debug: false,
			transitions: [
				{
					name: "Default Transition",
					once: ({ next }) => {
						enteringAnim()
						if (next.namespace === "home") {
							this.loco = new SliderImage()
						}
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
