<template>
	<v-snackbar v-model="globalStore.isError" class="error-snackbar">
		<div class="snackbar-container d-flex flex-column align-center">
			<div>{{ globalStore.errorMessage }}</div>
		</div>
	</v-snackbar>
</template>

<script setup lang="ts">
import { useGlobalStore } from '@/store/app';
import { ref } from 'vue';

const isVisible = ref(true);
const globalStore = useGlobalStore();
</script>

<style scoped lang="scss">
::v-deep.error-snackbar {
	.v-overlay__content {
		border-radius: 12px;
		box-shadow: none;
		overflow: hidden;
		.v-snackbar__content {
			background: #002902;
			color: #fff;
			box-shadow: none;
		}
	}
}
</style>
