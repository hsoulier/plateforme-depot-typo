import { api } from "./config.js"

// TDOD: Implement method on load
export const getRules = async () => {
	if (!sessionStorage.hasOwnProperty("rules")) {
		const r = await api.get("/content/rules")
		sessionStorage.setItem("rules", JSON.stringify(r.data))
	}
	return JSON.parse(sessionStorage.setItem("rules"))
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
	if (!window.localStorage.hasOwnProperty("userInfos")) {
		const r = await api.get("/user")
		window.localStorage.setItem("userInfos", JSON.stringify(r.data))
	}
	return JSON.parse(window.localStorage.getItem("userInfos"))
}

export const sendRepo = async (content) => {
	return await api.post("/api/v1/submit-repo", content)
}

export const updateApiToken = (token) => {
	if (token) {
		window.localStorage.setItem("JWT", token)
		api.defaults.headers.common["Authorization"] = `Bearer ${token}`
		console.log(api.defaults)
		return true
	}
	return false
}
