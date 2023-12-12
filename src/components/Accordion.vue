<template>
	<div class="accordion--container">
		<header class="accordion--container__header">
			<p>{{ text }}</p>
			<button @click="toggleIsCollapsed">
				<v-img
					:src="arrowUp"
					:class="{ collapsed: isCollapsed }"
					:height="24"
					:width="24"
				></v-img>
			</button>
		</header>
		<main
			v-if="!isCollapsed"
			style="margin-top: 16px"
			class="accordion--container__content"
		>
			<slot></slot>
		</main>
	</div>
</template>

<script setup lang="ts">
import arrowUp from '@/assets/arrowUp.svg';
import { ref } from 'vue';

const props = defineProps({
	text: { type: String, required: true },
});

const isCollapsed = ref(false);

function toggleIsCollapsed(): void {
	isCollapsed.value = !isCollapsed.value;
}
</script>

<style lang="scss">
@import '../styles/variables.scss';

.accordion--container {
	padding: 16px;
	border: 1px solid $col-gray;
	border-radius: $border-radius-base;

	.accordion--container__header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		p {
			font-size: $font-size-subheader;
			color: $col-gray-dark;
			font-weight: 500;
		}
		.collapsed {
			rotate: 180deg;
		}
	}

	.accordion--container__content {
		font-size: $font-size-root;

		.accordion--content__subheader {
			color: $col-dark-green;
			font-weight: 600 !important;
			margin-bottom: 8px;
		}
		.accordion--content__item {
			color: $col-dark-green;
			line-height: 20px;
			font-weight: 400 !important;
		}

		.accordion--content__list {
			margin: 0 16px 16px;
			&:last-child {
				margin-bottom: 0;
			}
		}
	}
}
</style>
