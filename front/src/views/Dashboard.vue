<template>
	<ContainerContent>
		<h1 class="h1">Bonjour</h1>
		<!-- {{data}} -->
	</ContainerContent>
</template>

<script>
import ContainerContent from "@/components/ContainerContent.vue";
import { dashboard } from "@/config/requests";

export default {
	name: "Dashboard",
	components: {
		ContainerContent
	},
	data() {
		return {
			// data: null
		};
	},
	async mounted() {
		if (localStorage.getItem("JWT")) {
			this.$router.push({ name: "Login" });
		}
		const result = await getUserInfos();
		console.log(this.data);
	}
};
</script>
