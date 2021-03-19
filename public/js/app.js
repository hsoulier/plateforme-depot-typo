import "./lib/drop-file.js"
import "./lib/confetti.js"
import "./lib/gsap.min.js"

if (document.querySelector(".success")) {
    const confetti = new ConfettiGenerator({target: document.querySelector("canvas")})
    confetti.render()
}
console.log("app")


if (document.querySelector(".description-repo")) {
	console.log("dash")
	const a = 4
	const descriptions = document.querySelectorAll(".description-repo")
	;[...descriptions].forEach((desc) => {
		desc.addEventListener("click", () => {
			const message = desc.dataset.message
			console.log(decodeURI(message))
		})
	})
}
