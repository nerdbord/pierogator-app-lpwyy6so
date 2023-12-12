<template>
	<Accordion :text="'Składniki'">
		<p class="accordion--content__subheader">Ciasto</p>
		<ol class="accordion--content__list">
			<li
				v-for="item in dumplingsStore.currentRecipe?.ingredients.dough"
				:key="item.name"
				class="accordion--item"
			>
				{{ item.name }} - {{ item.quantity }}
			</li>
		</ol>
		<p class="accordion--content__subheader">Farsz</p>
		<ol class="accordion--content__list">
			<li
				v-for="item in dumplingsStore.currentRecipe?.ingredients.filling"
				:key="item.name"
				class="accordion--content__item"
			>
				{{ item.name }} - {{ item.quantity }}
			</li>
		</ol>
	</Accordion>
</template>

<script setup lang="ts">
import Accordion from './Accordion.vue';
import { useDumplingsStore } from '@/store/dumplings.store';

const dumplingsStore = useDumplingsStore();
</script>
