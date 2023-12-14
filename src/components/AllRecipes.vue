<template>
	<section>
		<SectionHeader :header-text="'Pierogarnia'" :isLoading="isLoading" />
		<div
			v-if="!isLoading"
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
import { onBeforeMount, ref } from 'vue';
import SectionHeader from '@/components/SectionHeader.vue';
import RecipeCard from '@/components/RecipeCard.vue';
import { useDumplingsStore } from '@/store/dumplings.store';

const dumplingsStore = useDumplingsStore();
const isLoading = ref(false);

onBeforeMount(() => {
	isLoading.value = true;
	dumplingsStore.getAllRecipes().finally(() => (isLoading.value = false));
});
</script>
