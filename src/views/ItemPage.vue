<template>
	<div class="d-flex flex-column">
		<PreviewHeader
			:img-src="dumplingsStore.currentRecipe?.imageSrc || ''"
			:name="dumplingsStore.currentRecipe?.name || ''"
		>
			<Button :button-text="'Wróć'" @click="pushToPreviousPage" />
		</PreviewHeader>
		<RecipeDetails />
	</div>
</template>

<script setup lang="ts">
import PreviewHeader from '@/components/PreviewHeader.vue';
import Button from '@/components/Button.vue';
import router from '@/router';
import { onBeforeMount, ref, watch } from 'vue';
import { Recipe } from '@/models/Recipe';
import { useDumplingsStore } from '@/store/dumplings.store';
import { onUnmounted } from 'vue';
import RecipeDetails from '@/components/RecipeDetails.vue';

const dumplingsStore = useDumplingsStore();
const recipe = ref(new Recipe());

onBeforeMount(() => {
	dumplingsStore.getRecipeById(String(router.currentRoute.value.params.id));
});

onUnmounted(() => {
	dumplingsStore.currentRecipe = undefined;
});

function pushToPreviousPage(): void {
	router.go(-1);
}

watch(
	() => dumplingsStore.currentRecipe?._id,
	(id) => {
		if (dumplingsStore.currentRecipe) {
			recipe.value = dumplingsStore.currentRecipe;
		} else recipe.value = new Recipe();
	}
);
</script>
