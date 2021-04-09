import { api } from "@/config"

export const getRules = async () => {
	const result = await api.get("/content/rules")
	const { data } = result
	return data
}

export const getImages = async () => {
	const result = await api.get("/content/images")
	const { data } = result
	return data.imgs
}

export const loginUser = async (body) => {
	const result = await api.post("/user/login", body)
	const { data } = result
	return data.token
}

export const dashboard = async () => {
	if (localStorage.getItem("token-JWT")) {
		const result = await api.post(`/user/dashboard`)
		const { data } = result
		return data
	}
	return null
}

export const updateApiToken = (token) => {
	localStorage.setItem("token-JWT", token)
	api.defaults.headers.Authorization = `Bearer ${token}`
	console.log(api)
}
