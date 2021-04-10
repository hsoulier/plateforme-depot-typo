<template>
	<ContainerContent>
		<h2 class="text-2xl text-center mb-8">Déposer son travail</h2>
		<form method="post" enctype="multipart/form-data" class="submit-repo">
			<div class="form-row col-2">
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
			<div class="form-control">
				<input
					type="email"
					id="email"
					placeholder=" "
					v-model="user.email"
					autocomplete
					required
				/>
				<label for="email">Email</label>
			</div>
			<div class="form-row col-2">
				<div class="form-control">
					<input
						type="text"
						id="insta"
						v-model="user.socials.instagram"
						placeholder=" "
					/>
					<label for="insta">@ Instagram</label>
				</div>
				<div class="form-control">
					<input
						type="text"
						id="twitter"
						v-model="user.socials.twitter"
						placeholder=" "
					/>
					<label for="twitter">@ twitter</label>
				</div>
			</div>
			<div class="form-control">
				<label for="description">Petite description (si besoin)</label>
				<textarea
					name="description"
					rows="3"
					v-model="description"
					style="min-height: 3rem;"
				></textarea>
			</div>
			<input
				type="file"
				multiple
				name="files"
				label="Drop files here or click to upload."
				help="Upload files here and they won't be sent immediately"
				is="drop-files"
			/>
			<div class="form-control">
				<button type="submit">déposer</button>
			</div>
		</form>
	</ContainerContent>
</template>

<script>
	import ContainerContent from "@/components/ContainerContent.vue"
	import { getUserInfos } from "@/config/requests"
	import "@grafikart/drop-files-element"
	// import vueFilePond from "vue-filepond"
	// import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type"
	// import FilePondPluginImagePreview from "filepond-plugin-image-preview"
	// import "filepond/dist/filepond.min.css"
	// import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css"

	// const FilePond = vueFilePond(
	// 	FilePondPluginFileValidateType,
	// 	FilePondPluginImagePreview
	// )
	export default {
		name: "Submit",
		components: {
			ContainerContent,
			// FilePond,
		},
		data() {
			return {
				myFiles: [],
				user: {
					description: null,
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
		// methods: {
		// 	handleFilePondInit() {
		// 		console.log("FilePond has initialized")
		// 		this.$refs.pond.getFiles()
		// 	},
		// },
	}
</script>

<style lang="scss" scoped>
	h2 {
		font-size: space(5);
		text-transform: uppercase;
		font-weight: 600;
		margin-bottom: space(2);
	}
	.submit-repo {
		margin-top: space(8);
		max-width: space(60);
		& > * + * {
			margin-top: space(5);
		}

		.filepond {
			&--root {
				font-family: var(--font);
			}
			&--list {
				display: flex;
				justify-content: flex-start;
				flex-wrap: wrap;
			}
			&--item {
				transform: translateX(0);
				width: calc(1 / 3 * 100% - 0.5rem);
			}
		}
	}
</style>
