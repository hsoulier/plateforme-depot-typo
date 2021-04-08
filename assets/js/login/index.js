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
			$base.querySelector(
				"button"
			).innerHTML = `<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>`
			const email = $base.querySelector("input[type=email]").value
			const password = $base.querySelector("input[type=password]").value
			console.log({ email, password })
			const data = await fetch("/user/login", {
				method: "post",
				headers: {
					"Content-type":
						"application/x-www-form-urlencoded; charset=UTF-8",
				},
				body: `email=${email}&password=${password}`,
			})
			const body = await data.json()
			localStorage.setItem("tokenJWT", body.token)
			setTimeout(() => {
				console.log(localStorage.hasOwnProperty("tokenJWT"))
			}, 2000)
			$base.querySelector("button").innerHTML = oldText
			console.log(body)
		})
	}
}
