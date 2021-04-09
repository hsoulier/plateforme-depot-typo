<template> </template>

<script>
	import { dashboard } from "@/config/requests"
	export default {
		name: "Dashboard",
		data() {
			return {
				data: null,
			}
		},
		async mounted() {
			this.data = await dashboard()
			console.log(this.data)
			if (!Boolean(this.data?.error)) {
				this.$router.push({ name: "Login" })
			}
		},
	}
</script>
