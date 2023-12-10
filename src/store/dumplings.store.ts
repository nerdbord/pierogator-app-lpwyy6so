import { defineStore } from 'pinia';

export class Dumpling {
	name = '';
	imageUrl = '';
}

interface DumplingsStore {
	dumplings: Dumpling[];
}

const initState = (): DumplingsStore => ({
	dumplings: [],
});

export const useDumplingsStore = defineStore('dumplingsStore', {
	state: initState,
	actions: {
		addDumpling(dumpling: Dumpling): void {
			this.dumplings.push(dumpling);
		},
	},
});
