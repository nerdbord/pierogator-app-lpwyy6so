<template>
	<SectionHeader :header-text="'Pieróg'">
		<Button :button-text="'Zmień'" @click="pushToPreviousPage" />
	</SectionHeader>
	<div v-if="dumplingsStore.currentRecipe" style="margin-bottom: 16px">
		<main class="picture--container" style="margin: 16px 0">
			<v-img
				:width="'100%'"
				:max-height="300"
				:src="dumplingsStore.currentRecipe?.imageSrc"
				cover
			></v-img>
		</main>
		<Input
			:value="dumplingsStore.currentRecipe.name"
			:input-id="currentRecipeName"
			:max-length="40"
			:is-disabled="true"
		/>
	</div>

	<SectionHeader :header-text="'Przepis'" :is-loading="isFetchingRecipe">
		<Button :button-text="'Generuj'" @click="generateRecipe()" />
	</SectionHeader>
	<div>
		<Input
			:value="notes"
			:input-id="currentRecipeName"
			:max-length="40"
			:is-disabled="false"
			@updateInputValue="updateNotes"
		/>
		<div v-if="isRecipeGenerated" class="d-flex flex-column" style="gap: 8px">
			<IngredientsAccordion />
			<PrepairAccordion />
			<ServingAccordion />
			<CTA :button-text="'Udostępnij pieroga'" @click="createDumpling" />
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
import {
	getDoughIngredientsDetails,
	getFillIngredientsDetails,
} from '@/api/openai/getRecipe';
import { getPreparationSteps } from '@/api/openai/preparations';
import ServingAccordion from '@/components/ServingAccordion.vue';
import PrepairAccordion from '@/components/PrepairAccordion.vue';
import CTA from '@/components/CTA.vue';
import { onUnmounted } from 'vue';
import { ICreateRecipe } from '@/api/pierogator/createRecipe';
import { RoutesNames } from '@/enums/RoutesNames.enum';
import { useGlobalStore } from '@/store/app';
import Input from '@/components/Input.vue';

const dumplingsStore = useDumplingsStore();
const { generatingRecipe, currentRecipeName, currentRecipeUrlImgPath } =
	storeToRefs(dumplingsStore);

const notes = ref('');
const isRecipeGenerated = ref(false);
const isFetchingRecipe = ref(false);

function updateNotes(value: string): void {
	notes.value = value;
}

function pushToPreviousPage(): void {
	router.push({ name: RoutesNames.Recipe });
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

	if (dumplingsStore.currentRecipe) {
		dumplingsStore.currentRecipe?.setIngredients({
			dough,
			filling,
		});
	} else {
		throw Error('There is no recipe in store');
	}
}

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

async function createDumpling(): Promise<void> {
	if (dumplingsStore.currentRecipe) {
		const payload: ICreateRecipe =
			dumplingsStore.currentRecipe.getPostPayload();
		dumplingsStore.addRecipe(payload).then((res) => {
			const globalStore = useGlobalStore();
			globalStore.addErrorMessage(`${res.name} został dodany!`);
			router.push({ name: RoutesNames.Main });
			// dumplingsStore.fetchRecipes();
		});
	} else {
		throw Error('There is no recipe in store');
	}
}

onUnmounted(() => {
	dumplingsStore.currentRecipe = undefined;
});
</script>

<style lang="scss" scoped>
@import '../styles/variables.scss';
.picture--container {
	border-radius: $border-radius-base;
	overflow: hidden;
}
</style>
