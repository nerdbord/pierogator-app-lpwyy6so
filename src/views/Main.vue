<template>
	<div class="d-flex flex-column" style="row-gap: 16px; column-gap: 20px">
		<MyRecipes />
		<!-- <AllRecipes /> -->
	</div>
</template>

<script lang="ts" setup>
import MyRecipes from '@/components/MyRecipes.vue';
import AllRecipes from '@/components/AllRecipes.vue';
import { useDumplingsStore } from '@/store/dumplings.store';

const dumplingsStore = useDumplingsStore();

dumplingsStore.getMyRecipes();
dumplingsStore.getAllRecipes();
</script>
