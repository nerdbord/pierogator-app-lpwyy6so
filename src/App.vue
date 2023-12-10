<template>
	<router-view />
</template>

<script lang="ts" setup>
import { useGlobalStore } from './store/app';

const globalStore = useGlobalStore();
</script>

<style>
@import './styles/typography.scss';
@import './styles/variables.scss';

#app {
	font-family: 'Poppins';
	font-weight: 400;
	box-sizing: border-box !important;

	h1 {
	}

	h2 {
		font-family: 'Barriecito';
		font-size: 30px;
		line-height: 24px;
		letter-spacing: 0%;
		font-weight: 400;
	}

	h3 {
		font-family: 'Poppins';
		font-weight: 500;
		font-size: 14px;
		line-height: 16px;
		letter-spacing: 0%;
	}

	p {
		font-size: 14px;
		line-height: 20;
		letter-spacing: 0%;
		font-weight: 500;
	}
}
</style>
