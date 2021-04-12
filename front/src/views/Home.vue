<template>
	<ContainerContent>
		<div class="current-word">
			<h2>Mot à typographier</h2>
			<h1>synthetica</h1>
		</div>
		<div data-scroll-container>
			<div class="gallery" data-scroll-section>
				<div class="gallery__wrapper" data-scroll-speed="2" v-for="(image, index) in imgs" :key="index">
					<img :src="'http://localhost:3005' + image" alt="Galerie d'image" />
				</div>
			</div>
		</div>
	</ContainerContent>
</template>

<script>
import gsap from "gsap";
import { getImages } from "@/config/requests";
import LocomotiveScroll from "locomotive-scroll";
import ContainerContent from "@/components/ContainerContent.vue";

export default {
	name: "Home",
	components: {
		ContainerContent
	},
	data() {
		return {
			$word: null,
			imgs: null,
			scroll: null
		};
	},
	methods: {
		resizeWord() {
			const w = document.querySelector("main").clientWidth;
			const result = (w * 1.35) / this.$word.textContent.length;
			this.$word.style.setProperty("font-size", `calc(${result} * 1px)`);
		}
	},
	async mounted() {
		this.$word = document.querySelector(".current-word h1");
		this.imgs = await getImages();
		this.resizeWord();
		this.$nextTick(() => {
			this.scroll = new LocomotiveScroll({
				el: document.querySelector("[data-scroll-container]"),
				smooth: true,
				direction: "horizontal",
				lerp: 0.05,
				scrollbarContainer: document.querySelector(".c-scrollbar")
			});
			const $galleryW = document.querySelectorAll(".gallery__wrapper");
			gsap.fromTo(
				[...$galleryW],
				{
					opacity: 0
				},
				{
					duration: 0.35,
					opacity: 1,
					stagger: 0.18
				}
			);
		});
		window.addEventListener("resize", this.resizeWord);
	},
	updated() {
		console.log("Update " + this.scroll);
	}
};
</script>

<style lang="scss" scoped>
@import "@/style/components/locomotive";
.current-word {
	padding: space(4);
	h1,
	h2 {
		text-transform: uppercase;
		z-index: 1;
	}
	h2 {
		font-size: space(3);
	}
	h1 {
		font-weight: 600;
	}
}
[data-scroll-container] {
	min-height: 30rem !important;
	height: 60vh !important;
}
.gallery {
	&[data-scroll-section] {
		display: flex !important;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		height: 100%;
	}

	&__wrapper {
		height: 100%;
		width: 30rem;
		flex-shrink: 0;
		img {
			width: 100%;
			height: 100%;
			object-fit: contain;
		}
		& + & {
			margin-left: space(4);
		}
		&:first-child {
			margin-left: space(2);
		}
		&:last-child {
			margin-right: space(55);
		}
	}
}
</style>
