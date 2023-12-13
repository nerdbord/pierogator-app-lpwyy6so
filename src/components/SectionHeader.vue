<template>
	<header class="d-flex justify-space-between align-center">
		<h2 class="d-flex">
			<v-img
				height="30"
				width="30"
				:src="dumpling"
				style="margin-right: 8px"
			></v-img>
			{{ headerText }}
		</h2>
		<div class="d-flex">
			<Loader :is-loading="isLoading" />
			<slot></slot>
		</div>
	</header>
</template>

<script setup lang="ts">
import Loader from '@/components/Loader.vue';
import dumpling from '@/assets/dumpling.svg';

defineProps({
	headerText: { type: String, required: true },
	isLoading: { type: Boolean, default: false },
});
</script>
