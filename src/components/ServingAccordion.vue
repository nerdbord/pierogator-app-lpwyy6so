<template>
	<Accordion :text="'Podawanie'">
		<p class="accordion--content__item">
			{{ servingInstructions }}
		</p>
	</Accordion>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import Accordion from './Accordion.vue';
import { useDumplingsStore } from '@/store/dumplings.store';

const dumplingsStore = useDumplingsStore();

const servingInstructions = computed(() => {
	const arr = dumplingsStore.currentRecipe?.instructions.serving || [];
	return arr.join(' ');
});
</script>
