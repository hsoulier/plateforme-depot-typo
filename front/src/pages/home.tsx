import React, { useRef } from "react"

export const Home = () => {
	let $container = useRef<HTMLDivElement>(null)

	return (
		<main className="home">
			<section>
				<div ref={$container}>
					<h1>synthetica</h1>
				</div>
			</section>
			<section>
				<div className="rules">
					<p>
						Dépose ton travail pour que la typographe Emilie Vizcano
						fasse une review de ta Custom Type lors de ses lives sur
						Twitch.
					</p>
					<div>
						<a href="/submit" className="btn">
							Envoyer ma Custom Type
						</a>
					</div>
				</div>
			</section>
		</main>
	)
}
