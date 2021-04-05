import "../style/main.scss"
import "@grafikart/drop-files-element"
import barba from "@barba/core"
import gsap from "gsap"
// import ConfettiGenerator from "confetti-js"

class App {
	constructor() {
		this.create()
	}
	create() {
		console.log("Hello")
		this.initBarba()
	}
	initBarba() {
		barba.init({
			debug: true,
			transitions: [
				{
					name: "Default Transition",
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
}

const app = new App()
