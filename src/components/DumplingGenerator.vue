<template>
	<section>
		<SectionHeader :header-text="'Pieróg'">
			<Button :button-text="'Generuj'" @click="generateImage" />
		</SectionHeader>
		<main v-if="pictureUrl" class="picture--container">
			<v-img :width="'100%'" :max-height="300" :src="pictureUrl" cover></v-img>
		</main>
		<footer v-if="pictureUrl" class="d-flex flex-column" style="gap: 15px">
			<Input
				:value="dumplingName"
				:label-text="'Nazwa'"
				:input-id="dumplingName"
				:max-length="40"
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
import Button from './Button.vue';
import { getImage } from '../api/openai/getImage';

const dumplingName = ref('test test');
const pictureUrl = ref();

function handleNameUpdate(value: string): void {
	dumplingName.value = value;
}

async function generateImage(): Promise<void> {
	const imgUrl = await getImage();
	pictureUrl.value = imgUrl;
}

async function generateName(): Promise<void> {
	// todo: getName()
	// const dumplingName = await getName();
	// handleNameUpdate(dumplingName);
}
</script>

<style scoped lang="scss">
@import '../styles/variables.scss';

section {
	display: flex;
	flex-direction: column;
	gap: 16px;

	main.picture--container {
		max-height: 300px;
		width: 100%;
		border-radius: $border-radius-base;
	}
}
</style>
