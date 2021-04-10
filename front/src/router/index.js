import { createRouter, createWebHashHistory } from "vue-router"
import Home from "@/views/Home.vue"
import Login from "@/views/Login.vue"
import Dashboard from "@/views/Dashboard.vue"
import Submit from "@/views/Submit.vue"
import Legals from "@/views/Legals.vue"

const routes = [
	{
		path: "/",
		name: "Home",
		component: Home,
	},
	{
		path: "/login",
		name: "Login",
		component: Login,
	},
	{
		path: "/dashboard",
		name: "Dashboard",
		component: Dashboard,
	},
	{
		path: "/submit",
		name: "Submit",
		component: Submit,
	},
	{
		path: "/legals",
		name: "Legals",
		component: Legals,
	},
]

const router = createRouter({
	history: createWebHashHistory(),
	routes,
})

export default router
