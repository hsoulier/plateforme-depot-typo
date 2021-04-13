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

export const getUserInfos = async () => {
	let r = null
	if (!localStorage.getItem("userInfos")) {
		r = await api.get("/user")
		localStorage.setItem("userInfos", JSON.stringify(r.data))
	}
	return r ? r.data : JSON.parse(localStorage.getItem("userInfos"))
}

export const sendRepo = async (content) => {
	const result = await api.post("/repo", content)
	const { data } = result
	return data
}

export const updateApiToken = (token) => {
	if (token) {
		localStorage.setItem("JWT", token)
		api.defaults.headers.common["Authorization"] = `Bearer ${token}`
		return true
	}
	return false
}
