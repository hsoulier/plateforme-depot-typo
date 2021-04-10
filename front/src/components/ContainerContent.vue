<template>
	<main :class="contentClass">
		<div :class="contentClass + '__container'">
			<BackButton v-if="contentClass !== 'home-page'" />
			<slot></slot>
		</div>
		<span class="c-scrollbar"></span>
	</main>
</template>

<script>
	import BackButton from "@/components/BackButton.vue"
	export default {
		name: "ContainerContent",
		components: {
			BackButton,
		},
		data() {
			return {
				contentClass: String,
			}
		},
		beforeMount() {
			const { name } = this.$route
			this.contentClass = `${!!name ? name.toLowerCase() : "home"}-page`
		},
	}
</script>

<style lang="scss" scoped>
	.login-page,
	.submit-page {
		&__container {
			height: 100%;
			width: 100%;
			display: flex;
			align-items: center;
			flex-direction: column;
		}
	}
</style>
