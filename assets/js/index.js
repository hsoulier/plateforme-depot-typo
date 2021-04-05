import "../style/main.scss"
import "@grafikart/drop-files-element"
import ConfettiGenerator from "confetti-js"
import home from "./animations/home.js"

if (document.querySelector(".success")) {
	const confetti = new ConfettiGenerator({
		target: document.querySelector("canvas"),
	})
	confetti.render()
}

if (document.querySelector(".homepage")) {
	home()
	document
		.querySelector("input[name=files]")
		.addEventListener("change", (e) => {
			const button = document.querySelector("button[type=submit]")
			button.disabled = true
			button.textContent = "chargement"
			button.classList.add("opacity-20", "cursor-wait")
			setTimeout(() => {
				button.disabled = false
				button.textContent = "déposer"
				button.classList.remove("opacity-20", "cursor-wait")
			}, 2000)
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

	// Form change word
	document.querySelector(".change-word").addEventListener("click", () => {
		changeText(`<h2 class=" change-word-title-form text-2xl text-center mb-8">Changer de mot</h1>
		 	<div class="mb-8">
		 		<input type="text" name="word" placeholder="nouveau mot"
		 			class="lowercase w-full py-2 placeholder-gray-700 border-b-2 border-black focus:outline-none focus:border-gray-400 transition-colors duration-200 ease-in-out"
		 			required />
		 	</div>
			 <div class="mb-8 w-full py-2 flex"><svg class="mr-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>Attention en changeant de mot, tous les dépôts seront éffacés</div>
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
						.insertAdjacentHTML(
							"afterend",
							`<p class="text-2xl text-center mt-8">${message}</p>`
						)
				})
		})
	})

	// Close popup window
	const closeButton = formChangeWord.querySelector(".close")
	const closePopup = () => {
		formChangeWord.style.setProperty("z-index", "-1")
		if (
			closeButton.parentNode.nextElementSibling.classList.contains(
				"change-word-title-form"
			)
		) {
			document.location.reload()
		}
	}
	closeButton.addEventListener("click", closePopup)

	// Get message from repos
	if (document.querySelector(".description-repo")) {
		const descriptions = document.querySelectorAll(".description-repo")
		;[...descriptions].forEach((desc) => {
			desc.addEventListener("click", () => {
				changeText(
					`<p class="text-center">${decodeURI(
						desc.dataset.message
					)}</p>`
				)
			})
		})
	}
}

if (document.querySelector(".update-password")) {
	const form = document.querySelector(".update-password form")
	const error = form.querySelector(".error")
	const passwConf = form.querySelector("input[name=passwordConf]")
	const passw = form.querySelector("input[name=password]")
	;[...document.querySelectorAll("input[type=password]")].forEach((input) => {
		input.addEventListener("input", () => {
			if (passw.value === passwConf.value) {
				error.textContent = ""
			} else {
				error.textContent = "Les mots de passes ne correspondent pas"
			}
		})
	})
}

if (document.querySelector(".dl-btn")) {
	const dlBtns = [
		...document.querySelectorAll(".dl-btn"),
		...document.querySelectorAll(".close-list-files"),
	]
	dlBtns.forEach((btn) => {
		btn.addEventListener("click", () => {
			const el = btn.classList.contains("close")
				? btn.closest(".list-files")
				: btn.querySelector(".list-files")
			el.classList.toggle("hidden")
		})
	})
}
