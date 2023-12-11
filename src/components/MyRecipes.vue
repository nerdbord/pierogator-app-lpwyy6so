<template>
	<section>
		<SectionHeader :header-text="'Moje pierogi'">
			<Button :button-text="'Nowy pieróg'" @click="addNewRecipeClicked" />
		</SectionHeader>
	</section>
</template>
<script setup lang="ts">
import SectionHeader from './SectionHeader.vue';
import Button from './Button.vue';

function addNewRecipeClicked(): void {
	console.log('go to /add page...');
}
</script>
