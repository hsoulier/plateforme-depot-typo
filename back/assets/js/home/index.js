import LocomotiveScroll from "locomotive-scroll"
import { gsap } from "gsap"

export default class SliderImage {
	/**
	 * Create a new Home SliderImage
	 * @param {Number} delay
	 */
	constructor(delay = 5) {
		this.delay = delay
		const el = document.querySelector("[data-scroll-container]")
		this.scroll = new LocomotiveScroll({
			el,
			smooth: true,
			direction: "horizontal",
			lerp: 0.05,
			scrollbarContainer: document.querySelector(".c-scrollbar"),
		})

		gsap.fromTo(
			el.querySelectorAll(".gallery__wrapper"),
			{
				opacity: 0,
			},
			{
				delay: this.delay,
				duration: 0.35,
				opacity: 1,
				stagger: 0.18,
				onStart: () => {
					this.scroll.scrollTo(
						document.querySelector(
							".gallery__wrapper:last-child img"
						),
						{
							duration:
								el.querySelectorAll(".gallery__wrapper")
									.length *
								5 *
								1000,
						}
					)
				},
			},
			delay > 0 ? "-=.25" : "-=0"
		)
	}
	getScroll() {
		return this.scroll
	}
}
