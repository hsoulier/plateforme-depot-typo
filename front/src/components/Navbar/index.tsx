import React from "react"
import { Link } from "react-router-dom"

export const Navbar = () => {
	return (
		<nav className="px-8">
			<div className="flex justify-end py-4">
				<a
					href="https://www.twitch.tv/sen_vz"
					target="_blank"
					rel="noopener noreferrer"
				>
					Twitch
				</a>
				<Link className="ml-2" to="/submit">
					Déposer
				</Link>
				<Link className="ml-2" to="/dashboard">
					Connexion
				</Link>
			</div>
			<div className="w-full h-px bg-black" />
		</nav>
	)
}
