<template>
	<div>
		<h1>add view</h1>
		<ul>
			<li>form z pierogami</li>
		</ul>
	</div>
	<DumplingGenerator
		:ingredients="['banany, czekolada']"
		:img-src="testRecipe.imageSrc"
		:name="testRecipe.name"
		style="margin-bottom: 40px"
		@update-img-src="updateImg"
		@update-name="updateName"
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
const testRecipe = ref(new Recipe());

// testRecipe.value.setName('test recipe...');
// testRecipe.value.setImageSrc(
// 	'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5v3ZBADao2HdMWOdHdwDrMYoWFIApd_mXfQYZFCTaIw&s'
// );

function updateImg(url: string): void {
	console.log('IMGSRC should be updated to ', url);
	testRecipe.value.setImageSrc(url);
}

function updateName(name: string): void {
	console.log('name should be updated to ', name);
	testRecipe.value.setName(name);
}

testRecipe.value.setIngredients({
	dough: [{ name: 'kakao', quantity: '1 łyzka' }],
	filling: [{ name: 'budyń', quantity: '15 opakowań' }],
});

testRecipe.value.setInstructions({
	dough_preparation: ['doug preparation'],
	filling_preparation: ['some filling prep #1', 'filling prep #2'],
	forming_and_cooking_dumplings: ['forming _____ 123'],
	serving: ['podawać z colą'],
});

function saveDumpling(): void {
	console.log(testRecipe.value);
	// dumplingStore.addRecipe(testRecipe);
}
</script>
