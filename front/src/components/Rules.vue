<template>
	<aside class="rules">
		<span class="v-line"></span>
		<span class="h-line"></span>
		<div class="rules__container">
			<div class="rules__rules">
				<h3>{{ rules.type }}</h3>
				<p>{{ rules.content }}</p>
			</div>
			<ul class="rules__footer">
				<li>
					<a href="mailto:contact.repo-typo@gmail.com">contact</a>
				</li>
				<li>
					<router-link to="/legals"
						>politique de confidentialité</router-link
					>
				</li>
			</ul>
		</div>
	</aside>
</template>

<script>
	import { getRules } from "@/config/requests"

	export default {
		name: "Rules",
		data() {
			return {
				rules: {
					title: null,
					content: null,
				},
			}
		},
		async mounted() {
			this.rules = await getRules()
		},
	}
</script>

<style lang="scss" scoped>
	.rules {
		grid-area: rules;
		overflow: hidden;
		position: relative;
		.v-line {
			@extend %v-line;
			transform-origin: bottom;
		}
		.h-line {
			@extend %h-line;
		}
		padding: space(4);
		&__container {
			display: grid;
			height: 100%;
			grid-template: 1fr min-content / 1fr;
		}
		&__rules {
			overflow: hidden;
			h3 {
				text-transform: uppercase;
				font-weight: 500;
				font-size: space(3);
				margin-bottom: space(3);
			}
			p {
				line-height: 1.5;
			}
		}
		&__footer {
			overflow: hidden;
			text-transform: uppercase;
			font-weight: 300;
			li + li {
				margin-top: space(1);
			}
		}
	}
</style>
