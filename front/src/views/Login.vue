<template>
	<ContainerContent>
		<form class="login-form" @submit.prevent="submitForm">
			<h2>Accès au dashboard</h2>
			<div class="form-control">
				<input
					type="email"
					id="email"
					v-model="email"
					placeholder=" "
					autocomplete
					required
				/>
				<label for="email">Email</label>
			</div>
			<div class="form-control">
				<input
					type="password"
					id="password"
					v-model="password"
					placeholder=" "
					autocomplete
					required
				/>
				<label for="password">Mot de passe</label>
			</div>
			<div class="form-control submit-control">
				<button type="submit">Se connecter</button>
			</div>
		</form>
	</ContainerContent>
</template>

<script>
	import { loginUser, updateApiToken } from "@/config/requests"
	import ContainerContent from "@/components/ContainerContent.vue"

	export default {
		name: "Login",
		data() {
			return {
				email: null,
				password: null,
			}
		},
		components: {
			ContainerContent,
		},
		methods: {
			async submitForm() {
				const body = {
					email: this.email,
					password: this.password,
				}
				const token = await loginUser(body)
				updateApiToken(token)
			},
		},
	}
</script>

<style lang="scss" scoped>
	.login-form {
		.form-control {
			width: 75%;
			position: relative;
			margin: space(6) auto space(2);
			&:first-child {
				margin-top: space(9);
			}
		}

		h2 {
			font-size: space(5);
			text-transform: uppercase;
			font-weight: 600;
			margin-bottom: space(2);
		}
	}
</style>
