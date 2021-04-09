<template>
	<ContainerContent>
		<form class="login-form" action="/user/login" method="post">
			<h2>Accès au dashboard</h2>
			<div class="form-control">
				<input type="email" id="email" name="email" placeholder=" " autocomplete required />
				<label for="email">Email</label>
			</div>
			<div class="form-control">
				<input type="password" id="password" name="password" placeholder=" " autocomplete required />
				<label for="password">Mot de passe</label>
			</div>
			<div class="form-control submit-control">
				<button type="submit">Se connecter</button>
			</div>
		</form>
	</ContainerContent>
</template>

<script>
import ContainerContent from "@/components/ContainerContent.vue";
export default {
	name: "Login",
	components: {
		ContainerContent
	}
};
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
		label {
			display: inline-block;
			color: inherit;
			font-size: space(2.25);
			transition: all var(--ease);
			z-index: 10;
			padding-left: space(0.5);
			position: relative;
			top: space(-3.5);
		}
		input {
			border: none;
			border-bottom: 2px solid var(--clr-primary);
			padding: space(0.5);
			background-color: transparent;
			font: inherit;
			color: inherit;
			width: 100%;
			position: relative;
			display: inline-block;
			outline: none;
			z-index: 20;
			&[type="email"]:valid ~ label,
			&[type="email"]:focus ~ label,
			&[type="email"]:not(:placeholder-shown):not(:focus):invalid ~ label,
			&[type="password"]:not(:placeholder-shown):not(:focus):invalid ~ label,
			&[type="password"]:valid ~ label,
			&[type="password"]:focus ~ label {
				top: space(-8);
			}
			// &[type="email"]:placeholder-shown ~ span {
			// 	display: none;
			// }
			// &[type="email"]:not(:focus):invalid ~ span {
			// 	display: block;
			// }
		}
		button[type="submit"] {
			outline: none;
			cursor: pointer;
			background-color: var(--clr-primary);
			padding: space(1) space(2);
			font: 600 space(3) / 1 var(--font);
			border: 2px solid var(--clr-primary);
			transition: color var(--ease), background-color var(--ease);
			&:hover {
				background-color: transparent;
				color: var(--clr-primary);
			}
			&:active {
				border: solid transparent;
			}
		}
		&.submit-control {
			margin-top: space(3);
			width: 100%;
			display: inline-flex;
			justify-content: center;
		}
		.lds-ellipsis {
			display: inline-block;
			position: relative;
		}
		.lds-ellipsis div {
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
			width: space(1);
			height: space(1);
			border-radius: 50%;
			background: #fff;
			animation-timing-function: cubic-bezier(0, 1, 1, 0);
		}
		.lds-ellipsis div:nth-child(1) {
			left: 8px;
			animation: lds-ellipsis1 0.6s infinite;
		}
		.lds-ellipsis div:nth-child(2) {
			left: 8px;
			animation: lds-ellipsis2 0.6s infinite;
		}
		.lds-ellipsis div:nth-child(3) {
			left: 32px;
			animation: lds-ellipsis2 0.6s infinite;
		}
		.lds-ellipsis div:nth-child(4) {
			left: 56px;
			animation: lds-ellipsis3 0.6s infinite;
		}
	}

	h2 {
		font-size: space(5);
		text-transform: uppercase;
		font-weight: 600;
		margin-bottom: space(2);
	}
}

@keyframes lds-ellipsis1 {
	0% {
		transform: scale(0) translateY(-50%);
	}
	100% {
		transform: scale(1) translateY(-50%);
	}
}
@keyframes lds-ellipsis3 {
	0% {
		transform: scale(1) translateY(-50%);
	}
	100% {
		transform: scale(0) translateY(-50%);
	}
}
@keyframes lds-ellipsis2 {
	0% {
		transform: translate(0, -50%);
	}
	100% {
		transform: translate(24px, -50%);
	}
}
</style>