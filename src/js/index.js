// import "../css/style.css"
import { gsap } from "gsap"
import "@grafikart/drop-files-element"
import ConfettiGenerator from "confetti-js"
import "splitting/dist/splitting.css"
import "splitting/dist/splitting-cells.css"
import Splitting from "splitting"
import axios from "axios"

if (document.querySelector(".success")) {
	const confetti = new ConfettiGenerator({
		target: document.querySelector("canvas"),
	})
	confetti.render()
}

if (document.querySelector(".homepage")) {
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

	window.addEventListener("scroll", () => {
		console.log(document.querySelector("main").scrollTop)
	})
}

if (document.querySelector(".change-word")) {
	const formChangeWord = document.querySelector(".form-change-word")

	/**
	 * Change Text in Popup window
	 * @param {String} text
	 */
	const changeText = (
		text,
		position = "beforeend",
		el = formChangeWord.querySelector(".container-element")
	) => {
		el.innerHTML = ""
		el.insertAdjacentHTML(
			"beforeend",
			`<div class="flex justify-end">
                <div class="cursor-pointer close block text-2xl ml-auto mr-0 p-2">x</div>
            </div>${text}`
		)
		el.querySelector(".close").addEventListener("click", () => {
			formChangeWord.style.setProperty("z-index", "-1")
		})
		formChangeWord.style.setProperty("z-index", 20)
	}

	// From change word
	document.querySelector(".change-word").addEventListener("click", () => {
		changeText(`<h2 class="text-2xl text-center mb-8">Changer de mot</h1>
		 	<div class="mb-8">
		 		<input type="text" name="word" placeholder="nouveau mot"
		 			class="lowercase w-full py-2 placeholder-gray-700 border-b-2 border-black focus:outline-none focus:border-gray-400 transition-colors duration-200 ease-in-out"
		 			required />
		 	</div>
		 	<div class="flex justify-center mt-4 submit-button">
		 		<input value="valider" type="submit"
		 			class="transition-colors duration-200 ease-in-out justify-center mx-auto px-8 py-2 border-2 border-black text-2xl font-bold text-white bg-black hover:bg-white hover:text-black md:px-10">
			</div>`)
		document.querySelector("form").addEventListener("submit", (e) => {
			e.preventDefault()
			const formData = new FormData(document.querySelector("form"))
			const data = new URLSearchParams()
			for (const pair of formData) {
				data.append(pair[0], pair[1])
			}
			fetch(e.target.action, {
				method: "post",
				body: data,
			})
				.then((res) => res.text())
				.then((res) => {
					const { message } = JSON.parse(res)
					formChangeWord
						.querySelector(".submit-button")
						.insertAdjacentHTML("afterend", `<p class="text-2xl text-center mt-8">${message}</p>`)
				})
				.catch((err) => console.log(err))
		})
	})

	// Close popup window
	formChangeWord.querySelector(".close").addEventListener("click", () => {
		formChangeWord.style.setProperty("z-index", "-1")
	})

	// Get message from repos
	if (document.querySelector(".description-repo")) {
		const descriptions = document.querySelectorAll(".description-repo")
		;[...descriptions].forEach((desc) => {
			desc.addEventListener("click", () => {
				const message = desc.dataset.message
				console.log(decodeURI(message))
				changeText(`<p class="text-center">${decodeURI(message)}</p>`)
			})
		})
	}
}
