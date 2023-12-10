<template>
	<div>
		<h1>add view</h1>
		<ul>
			<li>form z pierogami</li>
		</ul>
	</div>
	<DumplingGenerator
		:ingredients="['banany, czekolada']"
		style="margin-bottom: 40px"
	/>
	<CTA
		:button-text="'Zapisz i przejdź do tworzenia przepisu'"
		@click="saveDumpling"
	/>
</template>

<script setup lang="ts">
import DumplingGenerator from '@/components/DumplingGenerator.vue';
import CTA from '@/components/CTA.vue';
import { ref } from 'vue';
import { useDumplingsStore } from '../store/dumplings.store';
import { Recipe } from '@/models/Recipe';
import { Ingredients } from '@/models/Ingredients';

const dumplingStore = useDumplingsStore();
const testRecipe = new Recipe();

testRecipe.setName('test recipe...');
testRecipe.setImageSrc(
	'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5v3ZBADao2HdMWOdHdwDrMYoWFIApd_mXfQYZFCTaIw&s'
);

testRecipe.setIngredients({
	dough: [{ name: 'kakao', quantity: '1 łyzka' }],
	filling: [{ name: 'budyń', quantity: '15 opakowań' }],
});

testRecipe.setInstructions({
	dough_preparation: ['doug preparation'],
	filling_preparation: ['some filling prep #1', 'filling prep #2'],
	forming_and_cooking_dumplings: ['forming _____ 123'],
	serving: ['podawać z colą'],
});

function saveDumpling(): void {
	dumplingStore.addDumpling(testRecipe);
}
</script>
