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
			<div v-if="isRecipeGenerated" class="d-flex flex-column" style="gap: 8px">
				<IngredientsAccordion />
				<PrepairAccordion />
				<ServingAccordion />
			</div>
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
import { getPreparationSteps } from '@/api/openai/preparations';
import ServingAccordion from '@/components/ServingAccordion.vue';
import PrepairAccordion from '@/components/PrepairAccordion.vue';

const dumplingsStore = useDumplingsStore();
const { generatingRecipe, currentRecipeName, currentRecipeUrlImgPath } =
	storeToRefs(dumplingsStore);

dumplingsStore.currentRecipe = new Recipe();

const notes = ref('');
const isRecipeGenerated = ref(false);

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

// click -> generateRecipe() -> tworzy w sobie prompty -> getData... ktora przypisuje do store'a otrzymane value;

async function generateRecipe() {
	if (generatingRecipe?.value === undefined) {
		return;
	}

	const PrmptDough = `Przepis na ciasto na pierogi z składnikami: ${generatingRecipe.value.factors.factors.val}. Podaj tylko same proporcje składników i zawsze zwracaj w podanym formacie:"składnik:ilosć,składnik:ilosć,składnik:ilosć"`;
	const PromptFill = `Przepis na Farsz na pierogi z 'malina,wisnia,jabłko'. Podaj tylko same proporcje składników i zawsze zwracaj w podanym formacie:"składnik:ilosć,składnik:ilosć,składnik:ilosć"`;
	await getDataForFirstAccordion(PrmptDough, PromptFill);

	const doughPreparationPrompt = `Wygeneruj instrukcje  krok po kroku potrzebna do stworzenia ciasta na pierogi z podanych składników: §${generatingRecipe.value.factors.cake.val}. Zawsze zwracaj jako  ciąg znaków. Każdy krok jest od siebie oddzielony znakiem przecinka i oznacza dana czynnosc do wykonania. Przykładowy format: 'step','next step'. Pomiń numerowanie oraz przejscie do następnej lini`;
	const fillingPreparationPrompt = `Wygeneruj instrukcje  krok po kroku potrzebna do stworzenia nadzienia/farszu do pierogów z podanych składników: ${generatingRecipe.value.factors.feelings.val}. Zawsze zwracaj jako  ciąg znaków. Każdy krok jest od siebie oddzielony znakiem przecinka. Przykładowy format: 'step','next step'. Pomiń numerowanie oraz przejscie do następnej linii.`;
	const formingAndCookingPreparationPrompt = `Wygeneruj instrukcje formowania i gotowania pierogów zakładając, ze mam juz przygotowane ciasto i farsz. Zawsze zwracaj jako  ciąg znaków. Każdy krok jest od siebie oddzielony znakiem przecinka. Przykładowy format: 'step','next step'. Pomiń numerowanie oraz przejscie do następnej linii. Pomiń instrukcje podawania/serwowania tych pierogów. Uwzględniając podane uwagi: ${notes.value}`;
	const servingPreparationPrompt = `Wygeneruj instrukcje serwowania/podawania pierogów po ugotowaniu. Maxymalnie 200 znaków. Uwzględnij podane uwagi: ${notes.value}.`;

	async function getInstructions() {
		const [dough_preparation, filling_preparation] = await Promise.all([
			getPreparationSteps(doughPreparationPrompt),
			getPreparationSteps(fillingPreparationPrompt),
		]);

		const [forming_and_cooking_dumplings, serving] = await Promise.all([
			getPreparationSteps(formingAndCookingPreparationPrompt),
			getPreparationSteps(servingPreparationPrompt),
		]);
		dumplingsStore.currentRecipe?.setInstructions({
			dough_preparation,
			filling_preparation,
			forming_and_cooking_dumplings,
			serving,
		});
	}
	getInstructions();
	isRecipeGenerated.value = true;
}
</script>

<style type="scss" scoped></style>
