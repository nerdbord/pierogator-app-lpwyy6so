<template>
	<button>{{ buttonText }}</button>
</template>

<script setup lang="ts">
const props = defineProps({
	isDisabled: { type: Boolean, default: false },
	buttonText: { type: String, required: true },
});
</script>

<style scoped lang="scss">
@import '../styles/variables.scss';

button {
	padding: 16px 32px;
	color: $col-white;
	border-radius: $border-radius-base;
	background-color: $col-dark-green;
	transition: background-color 0.2s;
	font-size: $font-size-root;
	font-weight: 600;
	line-height: 16px;
	letter-spacing: 0%;
	width: 100%;

	&:hover,
	&:active {
		background-color: #004b03;
	}
}
</style>
