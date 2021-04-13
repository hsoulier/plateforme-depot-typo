<template>
	<ContainerContent>
		<form class="login-form" @submit.prevent="submitForm">
			<h2>Accès au dashboard</h2>
			<div class="form-control">
				<input type="email" v-model="email" placeholder="Email" required autocomplete="email" />
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
			<div class="form-control">
				<input
					type="password"
					v-model="password"
					placeholder="Mot de passe"
					required
					autocomplete="current-password"
				/>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2.5"
					stroke-linecap="butt"
					stroke-linejoin="arcs"
				>
					<rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
					<path d="M7 11V7a5 5 0 0 1 10 0v4" />
				</svg>
			</div>
			<div class="form-control form-submit">
				<button type="submit">Se connecter</button>
			</div>
			<div class="flex-center">{{message}}</div>
		</form>
	</ContainerContent>
</template>

<script>
import { loginUser, updateApiToken } from "@/config/requests";
import ContainerContent from "@/components/ContainerContent.vue";

export default {
	name: "Login",
	data() {
		return {
			message: null,
			email: null,
			password: null
		};
	},
	components: {
		ContainerContent
	},
	methods: {
		async submitForm() {
			const body = {
				email: this.email,
				password: this.password
			};
			const token = await loginUser(body);
			const result = updateApiToken(token);
			if (result) {
				this.$store.commit("loginUser", true);
				this.$router.push({ name: "Dashboard" });
			}
			this.message = "La connexion a échouée";
		}
	}
};
</script>

<style lang="scss" scoped>
form {
	width: 60%;
	max-width: space(80);
}

.login-form {
	display: grid;
	grid-template-columns: 1fr;
	gap: space(3);

	h2 {
		text-align: center;
		font-size: space(5);
		text-transform: uppercase;
		font-weight: 600;
		margin-bottom: space(5);
	}
}

button {
	@extend %btn;
}
</style>
