<template>
	<section>
		<SectionHeader :header-text="'Moje pierogi'" :is-loading="isLoading">
			<Button :button-text="'Nowy pieróg'" @click="addNewRecipeClicked" />
		</SectionHeader>
		<div
			v-if="!isLoading"
			class="d-flex flex-wrap justify-space-between"
			style="margin-top: 16px"
		>
			<RecipeCard
				v-for="r in dumplingsStore.myRecipes"
				:id="r._id"
				:name="r.name"
				:img-src="r.imageSrc"
				:key="r._id"
				:is-my-recipe="true"
			/>
		</div>
	</section>
</template>
<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import router from '@/router';
import SectionHeader from '@/components/SectionHeader.vue';
import RecipeCard from '@/components/RecipeCard.vue';
import Button from '@/components/Button.vue';
import { useDumplingsStore } from '@/store/dumplings.store';
import { RoutesNames } from '@/enums/RoutesNames.enum';

const dumplingsStore = useDumplingsStore();
const isLoading = ref(false);

onBeforeMount(() => {
	isLoading.value = true;
	dumplingsStore.getMyRecipes().finally(() => (isLoading.value = false));
});

function addNewRecipeClicked(): void {
	router.push({ name: RoutesNames.Add });
}
</script>
