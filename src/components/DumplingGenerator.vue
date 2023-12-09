<template>
	<section>
		<SectionHeader :header-text="'Pieróg'" />
		<main class="picture--container">
			<v-img :width="'100%'" :max-height="300" :src="mockPicture" cover></v-img>
		</main>
		<footer class="d-flex flex-column" style="gap: 15px">
			<Input
				:value="dumplingName"
				:label-text="'Nazwa'"
				:input-id="dumplingName"
				:max-length="40"
				@update-input-value="handleNameUpdate"
			/>

			<Input
				:value="dumplingName"
				:label-text="'Nazwa'"
				:input-id="dumplingName"
				:is-disabled="true"
				@update-input-value="handleNameUpdate"
			/>
		</footer>
	</section>
</template>

<script setup lang="ts">
import SectionHeader from './SectionHeader.vue';
import Input from './Input.vue';
import { ref } from 'vue';
import mockPicture from '../assets/dp.png';

const dumplingName = ref('');

function handleNameUpdate(value: string): void {
	dumplingName.value = value;
}

function generateImage(): void {
	// API call: https://training.nerdbord.io/api/v1/openai/images/generations
}
</script>

<style scoped lang="scss">
@import '../styles/variables.scss';

section {
	display: flex;
	flex-direction: column;
	border: 1px solid lime;
	gap: 16px;

	main.picture--container {
		max-height: 300px;
		width: 100%;
		border-radius: $border-radius-base;
		background-color: red;
	}
}
</style>
