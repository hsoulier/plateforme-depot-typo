import LocomotiveScroll from "locomotive-scroll"
import { gsap } from "gsap"

export default class SliderImage {
	constructor() {
		const el = document.querySelector("[data-scroll-container]")
		this.scroll = new LocomotiveScroll({
			el,
			smooth: true,
			direction: "horizontal",
			lerp: 0.05,
		})

		gsap.fromTo(
			el.querySelectorAll("img"),
			{
				opacity: 0,
			},
			{
				delay: 5,
				duration: 0.25,
				opacity: 1,
				stagger: 0.2,
				onStart: () => {
					this.scroll.scrollTo(
						document.querySelector(
							".gallery__wrapper:last-child img"
						),
						{
							duration: 50 * 1000,
						}
					)
				},
			}
		)
	}
	getScroll() {
		return this.scroll
	}
}
