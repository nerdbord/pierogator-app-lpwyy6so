import { defineStore } from 'pinia';

interface GlobalStore {
	isLoading: boolean;
	currentRequests: string[];
}

const initState = (): GlobalStore => ({
	isLoading: false,
	currentRequests: [],
});

export const useGlobalStore = defineStore('globalStore', {
	state: initState,
	actions: {
		setLoading(value: boolean): void {
			this.isLoading = value;
		},
		addRequest(requestName: string): void {
			this.currentRequests.push(requestName);
		},
		removeRequest(requestName: string): void {
			this.currentRequests = this.currentRequests.filter(
				(r) => r !== requestName
			);
		},
	},
});
