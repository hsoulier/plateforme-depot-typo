<template>
	<ContainerContent>
		<h1 class="h1">Bonjour</h1>
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
	mounted() {
		if (localStorage.getItem("JWT")) {
			this.$router.push({ name: "Login" });
		}
		this.$nextTick(async () => {
			// const result = await getUserInfos();
			console.log(this.data);
		});
	}
};
</script>
