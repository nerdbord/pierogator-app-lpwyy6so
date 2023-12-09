<template>
	<v-app>
		<Header />
		<router-view />
	</v-app>
</template>

<script lang="ts" setup>
import Header from '@/components/Header.vue';
</script>
