<template>
	<section>
		<SectionHeader :header-text="'Moje pierogi'">
			<Button :button-text="'Nowy pieróg'" @click="addNewRecipeClicked" />
		</SectionHeader>
		<div
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
import SectionHeader from './SectionHeader.vue';
import Button from './Button.vue';
import { useDumplingsStore } from '@/store/dumplings.store';
import RecipeCard from './RecipeCard.vue';
import { RoutesNames } from '@/enums/RoutesNames.enum';
import router from '@/router';

const dumplingsStore = useDumplingsStore();

function addNewRecipeClicked(): void {
	router.push({ name: RoutesNames.Add });
}
</script>
