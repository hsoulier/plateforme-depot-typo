<template>
	<nav class="nav">
		<span class="v-line"></span>
		<div class="nav__container">
			<div class="nav__link">
				<a href="https://www.twitch.tv/sen_vz" target="_blank" rel="noopener noreferrer">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-linecap="butt"
						stroke-linejoin="arcs"
					>
						<path d="M5 12h13M12 5l7 7-7 7" />
					</svg>Twitch
				</a>
			</div>
			<div class="nav__link">
				<router-link :to="{name: 'Submit'}">Déposer</router-link>
			</div>
			<div class="nav__link">
				<router-link :to="{name: 'Login'}">{{isConnected ? "Dashboard": "Connexion"}}</router-link>
			</div>
		</div>
	</nav>
</template>

<script>
import { ref, onMounted, onUpdated } from "vue";
import { useStore } from "vuex";

export default {
	setup() {
		const store = useStore();
		let isConnected = ref(false);

		onMounted(() => {
			isConnected = store.state.isConnected;
			console.log("Mount", store.state.isConnected);
		});
		onUpdated(() => {
			isConnected = store.state.isConnected;
			console.log("Update", store.state.isConnected);
		});

		return {
			isConnected
		};
	}
};
</script>

<style lang="scss" scoped>
.nav {
	height: space(32);
	overflow: hidden;
	grid-area: navbar;
	background-color: var(--clr-white);
	padding: space(4);
	position: relative;
	.v-line {
		@extend %v-line;
	}
	&__container {
		color: var(--clr-black);
		font-size: space(6);
		text-transform: uppercase;
		display: flex;
		flex-direction: column;
	}
	&__link {
		font-weight: 600;
		&:hover {
			a {
				color: var(--clr-primary);
			}
			svg {
				transform: translateX(-#{space(1.5)});
			}
		}
		& + & {
			margin-top: space(3);
		}
		display: flex;
		align-items: center;
		overflow: hidden;
		svg {
			width: space(5);
			stroke-width: 3;
			transition: transform var(--ease);
		}
		a {
			display: inline-block;
			transition: color var(--ease);
		}
	}
}
</style>