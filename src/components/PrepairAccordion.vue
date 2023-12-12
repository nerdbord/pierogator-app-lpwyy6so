<template>
	<Accordion :text="'Przygotowanie'">
		<p class="accordion--content__subheader">Ciasto:</p>
		<ol class="accordion--content__list">
			<li
				v-for="item in dumplingsStore.currentRecipe?.instructions
					.dough_preparation"
				:key="item"
				class="accordion--item"
			>
				{{ item }}
			</li>
		</ol>
		<p class="accordion--content__subheader">Farsz:</p>
		<ol class="accordion--content__list">
			<li
				v-for="item in dumplingsStore.currentRecipe?.instructions
					.filling_preparation"
				:key="item"
				class="accordion--content__item"
			>
				{{ item }}
			</li>
		</ol>
		<p class="accordion--content__subheader">
			Formowanie i gotowanie pierogów:
		</p>
		<ol class="accordion--content__list">
			<li
				v-for="item in dumplingsStore.currentRecipe?.instructions
					.forming_and_cooking_dumplings"
				:key="item"
				class="accordion--content__item"
			>
				{{ item }}
			</li>
		</ol>
	</Accordion>
</template>

<script setup lang="ts">
import Accordion from './Accordion.vue';
import { useDumplingsStore } from '@/store/dumplings.store';

const dumplingsStore = useDumplingsStore();
</script>
