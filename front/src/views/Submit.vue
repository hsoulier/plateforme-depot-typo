<template>
	<ContainerContent>
		<canvas ref="confetti"></canvas>
		<h2>Déposer son travail</h2>
		<form
			method="post"
			enctype="multipart/form-data"
			class="submit-repo col-2"
			@submit.prevent="submitRepo"
			ref="submit-form"
		>
			<div>
				<div class="form-row col-2">
					<div class="form-control">
						<input
							class="pl-2"
							type="text"
							id="firstName"
							v-model="user.firstName"
							placeholder="Prénom"
							required
						/>
					</div>
					<div class="form-control">
						<input class="pl-2" type="text" id="name" v-model="user.name" placeholder="Nom" required />
					</div>
				</div>
				<div class="form-control">
					<input type="email" id="email" placeholder="Email" v-model="user.email" required />
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2.5"
						stroke-linecap="butt"
						stroke-linejoin="arcs"
					>
						<circle cx="12" cy="12" r="4" />
						<path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94" />
					</svg>
				</div>
				<div class="form-row col-2">
					<div class="form-control">
						<input type="text" id="insta" v-model="user.socials.instagram" placeholder="@ Instagram" />
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#000">
							<path
								d="M16.98 0a6.9 6.9 0 0 1 5.08 1.98A6.94 6.94 0 0 1 24 7.02v9.96c0 2.08-.68 3.87-1.98 5.13A7.14 7.14 0 0 1 16.94 24H7.06a7.06 7.06 0 0 1-5.03-1.89A6.96 6.96 0 0 1 0 16.94V7.02C0 2.8 2.8 0 7.02 0h9.96zm.05 2.23H7.06c-1.45 0-2.7.43-3.53 1.25a4.82 4.82 0 0 0-1.3 3.54v9.92c0 1.5.43 2.7 1.3 3.58a5 5 0 0 0 3.53 1.25h9.88a5 5 0 0 0 3.53-1.25 4.73 4.73 0 0 0 1.4-3.54V7.02a5 5 0 0 0-1.3-3.49 4.82 4.82 0 0 0-3.54-1.3zM12 5.76c3.39 0 6.2 2.8 6.2 6.2a6.2 6.2 0 0 1-12.4 0 6.2 6.2 0 0 1 6.2-6.2zm0 2.22a3.99 3.99 0 0 0-3.97 3.97A3.99 3.99 0 0 0 12 15.92a3.99 3.99 0 0 0 3.97-3.97A3.99 3.99 0 0 0 12 7.98zm6.44-3.77a1.4 1.4 0 1 1 0 2.8 1.4 1.4 0 0 1 0-2.8z"
							/>
						</svg>
					</div>
					<div class="form-control">
						<input type="text" id="twitter" v-model="user.socials.twitter" placeholder="@ Twitter" />
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2.5"
							stroke-linecap="butt"
							stroke-linejoin="arcs"
						>
							<path
								d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"
							/>
						</svg>
					</div>
				</div>
				<div class="form-control">
					<textarea
						name="description"
						id="description"
						rows="3"
						v-model="descriptionRepo"
						placeholder="Petite description (si besoin)"
					></textarea>
				</div>
			</div>
			<div class="form-control stretch">
				<input
					type="file"
					multiple
					name="files"
					label="Déposer les fichier ou cliquer ici"
					help="Ajouter une image pour être sur la page d'accueil 😉"
					is="drop-files"
				/>
			</div>
			<div class="form-control form-submit">
				<button type="submit">Déposer</button>
			</div>
		</form>
		<div class="flex-center">{{ message }}</div>
	</ContainerContent>
</template>

<script>
import ContainerContent from "@/components/ContainerContent.vue";
import { getUserInfos, sendRepo } from "@/config/requests";
import "@/assets/lib/drop-files";
import ConfettiGenerator from "confetti-js";

export default {
	name: "Submit",
	components: {
		ContainerContent
	},
	data() {
		return {
			message: null,
			files: null,
			descriptionRepo: null,
			user: {
				socials: {
					instagram: null,
					twitter: null
				},
				email: null,
				firstName: null,
				name: null
			},
			isConnected: false
		};
	},
	async mounted() {
		if (localStorage.getItem("JWT")) {
			this.isConnected = true;
			const user = await getUserInfos();
			this.user = {
				email: user.email,
				socials: user.socials,
				firstName: user.name.split(" ")[0],
				name: user.name.split(" ")[1]
			};
		}
		document
			.querySelector("input[name=files]")
			.addEventListener("change", e => {
				const button = document.querySelector("button[type=submit]");
				button.disabled = true;
				button.textContent = "Chargement";
				button.classList.add("wait");
				setTimeout(() => {
					button.disabled = false;
					button.textContent = "Déposer";
					button.classList.remove("wait");
				}, 1000);
			});
	},
	methods: {
		async submitRepo(e) {
			const form = this.$refs["submit-form"];
			const formData = new FormData();
			const files = form.querySelector("input[name=files]").files;
			files.forEach(file => {
				formData.append("files", file);
			});
			for (const [key, value] of Object.entries(this.user)) {
				if (key === "socials") {
					formData.append("instagram", this.user.socials.instagram);
					formData.append("twitter", this.user.socials.twitter);
				} else {
					formData.append(key, value);
				}
			}
			formData.append("description", this.descriptionRepo);
			const result = await sendRepo(formData);
			if (result?.message) {
				const target = this.$refs.confetti;
				const confetti = new ConfettiGenerator({ target });
				confetti.render();
			}
			this.message = result.message;
		}
	}
};
</script>

<style lang="scss" scoped>
canvas {
	display: none;
	position: absolute;
	top: 0;
	left: 0;
	height: 100vh;
	width: 100%;
	z-index: 999;
}
h2 {
	font-size: space(5);
	text-transform: uppercase;
	font-weight: 600;
	margin-bottom: space(2);
}
.wait {
	cursor: wait;
	opacity: 20%;
}

textarea {
	min-height: 3rem;
	width: 100%;
	resize: vertical;
	font: inherit;
	border: 2px solid var(--clr-primary);
	padding: space(2) space(1);
	background-color: transparent;
}

form {
	display: grid;
	gap: space(2);
	margin-top: space(6);
	grid-template-columns: repeat(2, minmax(300px, 1fr));
	@media screen and (max-width: 1200px) {
		grid-template-columns: 1fr;
	}
}

.submit-repo > div {
	max-width: space(60);

	& > * + * {
		margin-top: space(3);
	}

	&:last-child {
		margin-top: 0;
	}
}

.stretch {
	align-self: stretch;

	& > * {
		height: 100%;
	}
}

button {
	@extend %btn;
}
</style>
