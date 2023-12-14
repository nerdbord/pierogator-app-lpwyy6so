<template>
	<div>
		<v-img
			:src="headerSrc"
			style="cursor: pointer"
			@click="$router.push({ name: RoutesNames.Main })"
		></v-img>
	</div>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import pierogator_swiateczny from '@/assets/header/pierogator_swiateczny.svg';
import pierogarnia from '@/assets/header/pierogarnia.svg';
import { TitleTypeEnum } from '@/enums/TitleType.enum';
import { useRoute } from 'vue-router';
import { RoutesNames } from '@/enums/RoutesNames.enum';

const router = useRoute();

const headerSrc = computed(() => {
	return router.meta.titleType === TitleTypeEnum.PIEROGATOR
		? pierogator_swiateczny
		: pierogarnia;
});
</script>

<style lang="scss" scoped></style>
