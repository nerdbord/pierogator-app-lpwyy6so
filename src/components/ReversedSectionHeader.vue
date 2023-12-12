<template>
	<header class="d-flex justify-space-between align-center">
		<div class="d-flex">
			<slot></slot>
		</div>
		<h2 class="d-flex">
			<v-img
				height="30"
				width="30"
				:src="dumpling"
				style="margin-right: 8px"
			></v-img>
			{{ headerText }}
		</h2>
	</header>
</template>

<script setup lang="ts">
import Button from './Button.vue';
import dumpling from '../assets/dumpling.svg';

const props = defineProps({
	headerText: { type: String, required: true },
});
</script>
