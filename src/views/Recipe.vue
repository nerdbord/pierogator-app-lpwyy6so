<template>
	<div>
		<SectionHeader :header-text="'Pieróg'">
			<Button :button-text="'Zmień'" @click="pushToPreviousPage" />
		</SectionHeader>
		<div>
			<input
				v-model="currentRecipeName"
				style="width: 100%; outline: none"
				type="text"
				placeholder="Enter a Tag"
				disabled="true"
			/>
			<main v-if="currentRecipeUrlImgPath" class="picture--container">
				<v-img
					:width="'100%'"
					:max-height="300"
					:src="currentRecipeUrlImgPath"
					cover
				></v-img>
			</main>
			<SectionHeader :header-text="'Przepis'">
				<Button :button-text="'Generuj'" @click="generateRecipe()" />
			</SectionHeader>
			<input
				:v-model="notes"
				style="width: 100%; outline: none"
				type="text"
				placeholder="dodaj uwagi"
			/>
			<IngredientsAccordion />
		</div>
	</div>
</template>

<script setup lang="ts">
import router from '@/router';
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useDumplingsStore } from '@/store/dumplings.store';
import IngredientsAccordion from '@/components/IngredientsAccordion.vue';
import SectionHeader from '@/components/SectionHeader.vue';
import Button from '@/components/Button.vue';
import InputPromp from '@/components/InputPromp.vue';
import {
	getDoughIngredientsDetails,
	getFillIngredientsDetails,
} from '@/api/openai/getRecipe';
import { Recipe } from '@/models/Recipe';
import { Ingredients } from '@/models/Ingredients';

const dumplingsStore = useDumplingsStore();
const { generatingRecipe, currentRecipeName, currentRecipeUrlImgPath } =
	storeToRefs(dumplingsStore);

dumplingsStore.currentRecipe = new Recipe();

const notes = ref('');

function pushToPreviousPage(): void {
	router.push({ path: '/recipe/add' });
}

interface Ingredient {
	name: string;
	quantity: string;
}

async function getDataForFirstAccordion(
	doughPrompt: string,
	fillPrompt: string
) {
	const dough = await getDoughIngredientsDetails(doughPrompt);
	const filling = await getFillIngredientsDetails(fillPrompt);

	dumplingsStore.currentRecipe?.setIngredients({
		dough,
		filling,
	});
}

async function generateRecipe() {
	if (generatingRecipe?.value === undefined) {
		return;
	}

	const PrmptDough = `Przepis na ciasto na pierogi z składnikami: ${generatingRecipe.value.factors.factors.val}. Podaj tylko same proporcje składników i zawsze zwracaj w podanym formacie:"składnik:ilosć,składnik:ilosć,składnik:ilosć"`;
	const PromptFill = `Przepis na Farsz na pierogi z 'malina,wisnia,jabłko'. Podaj tylko same proporcje składników i zawsze zwracaj w podanym formacie:"składnik:ilosć,składnik:ilosć,składnik:ilosć"`;
	const dataForFirstAccordion = await getDataForFirstAccordion(
		PrmptDough,
		PromptFill
	);

	// getDataForSecondAccordion; // 2nd accordion includes: getDoughPreparationDetails & getFillPreparationDetails &
	// this.dough_preparation = instructions.dough_preparation;
	// 	this.filling_preparation = instructions.filling_preparation;
	// 	this.forming_and_cooking_dumplings =
	// 		instructions.forming_and_cooking_dumplings;

	// getDataForThirdAccordion // 3rd includes only Serving instructions:
	// this.serving = api res;

	// console.log(data);

	// if (data) {
	// 	const testPropmpt1: Ingredient[] = parseIngredients(data);

	// 	// console.log(testPropmpt1);
	// 	//dumplingsStore.currentRecipe?.setIngredients(testPropmpt1);
	// }
}
</script>

<style type="scss" scoped></style>
