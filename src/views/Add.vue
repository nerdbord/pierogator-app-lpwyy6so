<template>
	<div>
		<h1>add view</h1>
		<ul>
			<li>form z pierogami</li>
		</ul>
	</div>
	<DumplingGenerator
		:ingredients="['banany, czekolada']"
		style="margin-bottom: 40px"
	/>
	<CTA :button-text="'Zapisz i przejdź do tworzenia przepisu'" />
</template>

<script setup lang="ts">
import DumplingGenerator from '@/components/DumplingGenerator.vue';
import CTA from '@/components/CTA.vue';
import { ref } from 'vue';

const testDumpling = 'asdf';

const savedDumplings = ref<string[]>([]);

function saveDumpling(): void {
	savedDumplings.value.push('testDumpling');
}
</script>
