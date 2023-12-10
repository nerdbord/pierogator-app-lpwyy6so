<template>
	<button @click="$emit('click')">{{ buttonText }}</button>
</template>

<script setup lang="ts">
const emit = defineEmits<{
	(e: 'click'): void;
}>();

const props = defineProps({
	isDisabled: { type: Boolean, default: false },
	buttonText: { type: String, required: true },
});
</script>

<style scoped lang="scss">
@import '../styles/variables.scss';

button {
	padding: 10px 12px;
	color: $col-dark-green;
	border: 1px solid $col-gray;
	border-radius: $border-radius-base;
	background-color: transparent;
	transition: background-color 0.2s;
	font-family: 'Poppins';
	font-size: $font-size-root;
	font-weight: 500;
	line-height: 16px;
	letter-spacing: 0%;

	&:hover,
	&:active {
		background-color: $col-gray-light;
	}
}
</style>
