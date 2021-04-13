import axios from "@bundled-es-modules/axios/axios.js"

export const api = axios.create({
	baseURL: "",
	headers: {
		"Content-Type": "application/json",
		Authorization: `Bearer ${window.localStorage.getItem("JWT")}`,
	},
})
