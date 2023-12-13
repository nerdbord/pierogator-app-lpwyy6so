<template>
	<div v-if="isLoading" style="margin-right: 8px">
		<v-img :src="loader" width="36" height="36" class="loader"></v-img>
	</div>
</template>

<script setup lang="ts">
import loader from '@/assets/loader.svg';

defineProps({
	isLoading: {
		type: Boolean,
		default: false,
	},
});
</script>

<style setup lang="scss">
.loader {
	animation: rotating 1.25s infinite linear;

	@keyframes rotating {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
}
</style>
