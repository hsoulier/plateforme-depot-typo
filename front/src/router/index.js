import { createRouter, createWebHashHistory } from "vue-router"
import Home from "@/views/Home.vue"
import Login from "@/views/Login.vue"
import Dashboard from "@/views/Dashboard.vue"
import Submit from "@/views/Submit.vue"
import Legals from "@/views/Legals.vue"
import Page404 from "@/components/Page404.vue"

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
	{
		path: "/:pathMatch(.*)*",
		name: "404",
		component: Page404,
	},
]

const router = createRouter({
	history: createWebHashHistory(),
	routes,
})

export default router
