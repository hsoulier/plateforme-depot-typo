import axios from "axios"

export const config = {
	API_URL: "http://localhost:3005",
	Authorization: `Bearer ${window.localStorage.getItem("token")}`,
}

export const api = axios.create({
	baseURL: config.API_URL,
	headers: {
		"Content-Type": "application/json",
	},
})
