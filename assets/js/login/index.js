export class Login {
	constructor({ form }) {
		console.log("Login init")
		this.form = document.querySelector(form)
		this.onSubmit()
	}

	onSubmit() {
		this.form.addEventListener("submit", (e) => {
			e.preventDefault()
			
			console.log(e)
		})
	}
}
