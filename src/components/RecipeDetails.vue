<template>
	<div>
		<ReversedSectionHeader :header-text="'Przepis'" />
		<div class="d-flex flex-column" style="row-gap: 8px">
			<IngredientsAccordion />
			<PrepairAccordion />
			<ServingAccordion />
		</div>
	</div>
</template>

<script setup lang="ts">
import ReversedSectionHeader from './ReversedSectionHeader.vue';
import IngredientsAccordion from './IngredientsAccordion.vue';
import ServingAccordion from './ServingAccordion.vue';
import PrepairAccordion from './PrepairAccordion.vue';
</script>
