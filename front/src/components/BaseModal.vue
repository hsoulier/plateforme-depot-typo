<template>
	<div v-show="isCollapsed" class="modal">
		<div class="modal__container">
			<slot></slot>
		</div>
	</div>
</template>

<script>
export default {
	name: "BaseModal",
	props: {
		isCollapsed: Boolean
	}
};
</script>