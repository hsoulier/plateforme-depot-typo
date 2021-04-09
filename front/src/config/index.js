import axios from "axios"

const config = {
	API_URL: "http://localhost:8800/api/v1",
}

const api = axios.create({
	baseURL: config.API_URL,
	headers: {
		"Content-Type": "application/json",
		Authorization: `Bearer ${window.localStorage.getItem("token")}`,
	},
})

export const updateApiToken = (token) => {
	api.defaults.headers.Authorization = `Bearer ${token}`
}

export default api
