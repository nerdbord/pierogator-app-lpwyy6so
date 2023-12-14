<template>
	<div style="margin-bottom: 32px">
		<ReversedSectionHeader :header-text="'Pieróg'">
			<Button :button-text="'Wróć'" @click="pushToPreviousPage" />
		</ReversedSectionHeader>
		<div class="d-flex flex-column">
			<div class="preview__image--container">
				<v-img :src="imgSrc" cover></v-img>
			</div>
			<div>
				<Input :value="name" :input-id="name" :is-disabled="true" />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import Button from './Button.vue';
import Input from './Input.vue';
import ReversedSectionHeader from './ReversedSectionHeader.vue';
import router from '@/router';

const props = defineProps({
	imgSrc: { type: String, required: true },
	name: { type: String, required: true },
});

function pushToPreviousPage(): void {
	router.go(-1);
}
</script>

<style scoped lang="scss">
@import '../styles/variables.scss';
.preview__image--container {
	border-radius: $border-radius-base;
	overflow: hidden;
	width: 100%;
	max-height: 280px;
	display: flex;
	justify-content: center;
	align-items: center;
	margin-bottom: 16px;
}
</style>
