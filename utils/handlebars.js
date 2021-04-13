import handlebars from "handlebars"

export function returnButton() {
	const page = arguments[0].toLowerCase()
	return page !== "home"
		? new handlebars.SafeString(
				`<a href="/" class="return-home"><svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="butt" stroke-linejoin="arcs"><path d="M19 12H6M12 5l-7 7 7 7"/></svg></a>`
		  )
		: null
}
