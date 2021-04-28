import { sendRepo } from "../api"

export class Submit {
	constructor() {
		if (window.localStorage.hasOwnProperty("userInfos")) {
			const infos = JSON.parse(window.localStorage.getItem("userInfos"))
			console.log(infos)
			const form = {
				firstName: document.querySelector("input[name=firstName]"),
				name: document.querySelector("input[name=name]"),
				email: document.querySelector("input[name=email]"),
				twitter: document.querySelector("input[name=instagram]"),
				instagram: document.querySelector("input[name=twitter]"),
				description: document.querySelector("textarea"),
				files: document.querySelector("input[type=file]")
			}
			form.firstName.value = infos.name.split(" ")[0]
			form.name.value = infos.name.split(" ")[1]
			form.email.value = infos.email
			form.twitter.value = infos.socials.twitter
			form.instagram.value = infos.socials.instagram
		}
		this.onSubmit()
	}

	onSubmit() {
		document.querySelector("form").addEventListener("submit", async (e) => {
			e.preventDefault()
			let formData = new FormData(document.querySelector("form"))
			window.localStorage.hasOwnProperty("userInfos") && formData.append("userId", JSON.parse(window.localStorage.getItem("userInfos"))._id)
			const result = await sendRepo(formData)
			console.log(result)
		})
	}
}