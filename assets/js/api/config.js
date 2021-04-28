import axios from "@bundled-es-modules/axios/axios.js"

export const api = axios.create({
	baseURL: "http://localhost:3005",
	headers: {
		"Content-Type": "application/json",
	},
})
