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
			const token = await loginUser(body)
			const result = updateApiToken(token)
			const userInfos = await getUserInfos()
			$base.querySelector("button").innerHTML = oldText
			// window.location.replace = "/user"
		})
	}
}
