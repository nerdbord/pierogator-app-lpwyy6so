<template>
	<v-app>
		<div class="app-wrapper">
			<Header />
			<v-container>
				<router-view />
			</v-container>
			<div></div>
			<ErrorMessage />
		</div>
	</v-app>
</template>

<script lang="ts" setup>
import Header from '@/components/Header.vue';
import ErrorMessage from '@/components/ErrorMessage.vue';
import { useGlobalStore } from '@/store/app';

const globalStore = useGlobalStore();
</script>
<style lang="scss" scoped>
.app-wrapper {
	max-width: 600px; //acording to vuetify 3 brakpoint,for xs devices
	width: 100%;
	margin: 0 auto;
}
</style>
