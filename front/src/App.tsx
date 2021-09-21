import React from "react"
import { Dashboard } from "./pages/dashboard"
import { Home } from "./pages/home"
import { Submit } from "./pages/submit"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { Navbar } from "./components/Navbar"

export default function App() {
	return (
		<Router>
			<main className="bg-primary">
				<Navbar />
				<Switch>
					<Route path="/dashboard">
						<Dashboard />
					</Route>
					<Route path="/submit">
						<Submit />
					</Route>
					<Route path="/">
						<Home />
					</Route>
				</Switch>
			</main>
		</Router>
	)
}
