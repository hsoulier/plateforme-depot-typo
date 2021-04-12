import { createStore } from "vuex"

const store = createStore({
	state() {
		return {
			isConnected: false,
		}
	},
	mutations: {
		loginUser(state, value) {
			state.isConnected = value
		},
	},
	getters: {
		userIsConnected(state) {
			return state.isConnected
		},
	},
})

export default store
