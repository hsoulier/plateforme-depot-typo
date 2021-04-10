<template>
	<ContainerContent>
		<form method="post" enctype="multipart/form-data">
			<div class="relative p-8 bg-white border-black border-4">
				<h2 class="text-2xl text-center mb-8">Déposer son travail</h2>
				<div class="form-row">
					<div class="form-control">
						<input
							type="text"
							id="firstName"
							v-model="user.firstName"
							placeholder=" "
							autocomplete
							required
						/>
						<label for="firstName">Prénom</label>
					</div>
					<div class="form-control">
						<input
							type="text"
							id="name"
							v-model="user.name"
							placeholder=" "
							autocomplete
							required
						/>
						<label for="name">Nom</label>
					</div>
				</div>
				<div class="mb-8">
					<input
						type="email"
						v-model="user.email"
						placeholder="email *"
						class="w-full py-2 placeholder-gray-700 border-b-2 border-black focus:outline-none focus:border-gray-400 transition-colors duration-200 ease-in-out"
						required
					/>
				</div>
				<div class="flex mb-8 w-full gap-6">
					<div class="flex-grow">
						<input
							type="text"
							v-model="user.socials.instagram"
							placeholder="@ instagram"
							class="w-full py-2 placeholder-gray-700 border-b-2 border-black focus:outline-none focus:border-gray-400 transition-colors duration-200 ease-in-out"
						/>
					</div>
					<div class="flex-grow">
						<input
							type="text"
							v-model="user.socials.twitter"
							placeholder="@ twitter"
							class="w-full py-2 placeholder-gray-700 border-b-2 border-black focus:outline-none focus:border-gray-400 transition-colors duration-200 ease-in-out"
						/>
					</div>
				</div>
				<textarea
					name="description"
					rows="3"
					class="w-full py-2 placeholder-gray-700 border-b-2 border-black focus:outline-none focus:border-gray-400 transition-colors duration-200 ease-in-out mb-8"
					style="min-height: 3rem;"
					placeholder="petite description (si besoin)"
				></textarea>
				<input
					type="file"
					name="files"
					multiple
					label="Déposer le fichier <br/>ou cliquez ici"
					is="drop-files"
				/>
				<div class="flex justify-center mt-4">
					<button
						type="submit"
						class="transition-colors duration-200 ease-in-out justify-center mx-auto px-8 py-2 border-2 border-black text-2xl font-bold text-white bg-black hover:bg-white hover:text-black md:px-10"
					>
						déposer
					</button>
				</div>
			</div>
		</form>
	</ContainerContent>
</template>

<script>
	import ContainerContent from "@/components/ContainerContent.vue"
	import { getUserInfos } from "@/config/requests"

	export default {
		name: "Submit",
		components: {
			ContainerContent,
		},
		data() {
			return {
				user: {
					email: null,
					socials: {
						instagram: null,
						twitter: null,
					},
					firstName: null,
					name: null,
				},
				isConnected: false,
			}
		},
		async mounted() {
			if (localStorage.getItem("JWT")) {
				this.isConnected = true
				const user = await getUserInfos()
				this.user = {
					email: user.email,
					socials: user.socials,
					firstName: user.name.split(" ")[0],
					name: user.name.split(" ")[1],
				}
			}
		},
	}
</script>

<style lang="scss" scoped>
	h2 {
		font-size: space(5);
		text-transform: uppercase;
		font-weight: 600;
		margin-bottom: space(2);
	}
	.form-control {
		width: 75%;
		position: relative;
		margin: space(6) auto space(2);
		&:first-child {
			margin-top: space(9);
		}
	}
</style>
