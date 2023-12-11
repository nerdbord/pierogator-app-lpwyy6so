<template>
	<div
		class="d-flex flex-column"
		style="width: calc(50% - 10px); margin-bottom: 20px; min-width: 170px"
	>
		<div class="card__image--container" @click="pushToRecipeView">
			<v-img :src="imgSrc" cover></v-img>
		</div>
		<div>
			<p class="card__name" @click="pushToRecipeView">
				{{ handleNameLength(name) }}
			</p>
		</div>
		<div v-if="isMyRecipe" class="d-flex" style="gap: 8px">
			<Button :button-text="'Otwórz'" @click="pushToRecipeView" />
			<Button :button-text="'Usuń'" @click="removeRecipe" />
		</div>
	</div>
</template>

<script setup lang="ts">
import router from '@/router';
import Button from './Button.vue';
import { RoutesNames } from '@/enums/RoutesNames.enum';
import { useDumplingsStore } from '@/store/dumplings.store';

const props = defineProps({
	id: { type: String, required: true },
	name: { type: String, required: true },
	imgSrc: { type: String, required: true },
	isMyRecipe: { type: Boolean, default: false },
});

const dumplingsStore = useDumplingsStore();

function handleNameLength(name: string): string {
	if (name.length <= 38) return name;
	else return name.substring(0, 35).concat('...');
}

function pushToRecipeView(): void {
	router.push({ name: RoutesNames.ItemPage, params: { id: props.id } });
}

function removeRecipe(): void {
	dumplingsStore.removeRecipe(props.id);
}
</script>

<style scoped lang="scss">
@import '../styles/variables.scss';

.card__image--container {
	border-radius: $border-radius-base;
	overflow: hidden;
	width: 100%;
	height: 80%;
	max-height: 140px;
	cursor: pointer;
}

.card__name {
	font-size: $font-size-root;
	font-weight: 400;
	color: $col-dark-green;
	margin: 8px 0;
	cursor: pointer;
}
</style>
