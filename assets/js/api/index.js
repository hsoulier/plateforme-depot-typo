import { api } from "./config.js"

// TODO: Implement method on load

export const updateApiToken = (token) => {
	if (token) {
		window.localStorage.setItem("JWT", token)
		api.defaults.headers.common["Authorization"] = `Bearer ${token}`
		return true
	}
	return false
}

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
	const result = await api.post("/api/v1/login", body)
	const { data } = result

	console.log(data)
	return updateApiToken(data.token)
}

export const getUserInfos = async () => {
	if (!window.localStorage.hasOwnProperty("userInfos")) {
		const r = await api.get("/api/v1/user-infos", {
			headers: {
				Authorization: `Bearer ${window.localStorage.getItem("JWT")}`,
			},
		})
		window.localStorage.setItem("userInfos", JSON.stringify(r.data))
	}
	return JSON.parse(window.localStorage.getItem("userInfos"))
}

export const sendRepo = async (content) => {
	return await api.post("/api/v1/submit-repo", content)
}
