import { getUserInfos, loginUser, updateApiToken } from "../api/index.js"

export class Login {
	constructor({ form }) {
		this.form = document.querySelector(form)
		this.onSubmit()
	}

	onSubmit() {
		this.form.addEventListener("submit", async (e) => {
			e.preventDefault()
			const { srcElement: $base } = e

			const oldText = $base.querySelector("button").innerHTML

			$base.querySelector("button").innerHTML = "Chargement"

			const email = $base.querySelector("input[type=email]").value
			const password = $base.querySelector("input[type=password]").value
			const body = { email, password }
			const result = await loginUser(body)

			console.log(result)
			if (result) {
				const userInfos = await getUserInfos()
				console.log(userInfos)
				window.location.replace("/dashboard")
				return
			}

			$base.querySelector("button").innerHTML = oldText
			console.log("Raté")
		})
	}
}
