<template>
	<section>
		<SectionHeader :header-text="'Pierogarnia'" />
		<div
			class="d-flex flex-wrap justify-space-between"
			style="margin-top: 16px"
		>
			<RecipeCard
				v-for="r in dumplingsStore.allRecipes"
				:id="r._id"
				:name="r.name"
				:img-src="r.imageSrc"
				:key="r._id"
			/>
		</div>
	</section>
</template>
<script setup lang="ts">
import SectionHeader from './SectionHeader.vue';
import RecipeCard from './RecipeCard.vue';
import { useDumplingsStore } from '@/store/dumplings.store';

const dumplingsStore = useDumplingsStore();
</script>
