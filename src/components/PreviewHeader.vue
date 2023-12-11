<template>
	<div>
		<header class="d-flex justify-space-between align-center">
			<div class="d-flex">
				<slot></slot>
			</div>
			<h2 class="d-flex">
				<v-img
					height="30"
					width="30"
					:src="dumpling"
					style="margin-right: 8px"
				></v-img>
				Pieróg
			</h2>
		</header>
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
import Loader from './Loader.vue';
import Button from './Button.vue';
import Input from './Input.vue';
import dumpling from '../assets/dumpling.svg';

const props = defineProps({
	imgSrc: { type: String, required: true },
	name: { type: String, required: true },
});
</script>

<style scoped lang="scss">
@import '../styles/variables.scss';
.preview__image--container {
	border-radius: $border-radius-base;
	overflow: hidden;
	width: 100%;
	margin: 16px 0;
	max-height: 280px;
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
