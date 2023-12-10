<template>
	<div v-if="useGlobalStore().isLoading" style="margin-right: 8px">
		<v-img :src="loader" width="36" height="36" class="loader"></v-img>
	</div>
</template>

<script setup lang="ts">
import { useGlobalStore } from '@/store/app';
import loader from '../assets/loader.svg';

const props = defineProps({
	isLoading: {
		type: Boolean,
		default: true, //TODO: change it to false value
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
