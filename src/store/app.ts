import { defineStore } from 'pinia';

interface GlobalStore {
	currentRequests: string[];
	isError: boolean;
	errorMessage?: string;
}

const initState = (): GlobalStore => ({
	currentRequests: [],
	isError: false,
	errorMessage: undefined,
});

export const useGlobalStore = defineStore('globalStore', {
	state: initState,
	actions: {
		addRequest(requestName: string): void {
			this.currentRequests.push(requestName);
		},
		removeRequest(requestName: string): void {
			this.currentRequests = this.currentRequests.filter(
				(r) => r !== requestName
			);
		},
		addErrorMessage(errorMessage: string): void {
			this.isError = true;
			this.errorMessage = errorMessage;

			setTimeout(() => {
				this.errorMessage = undefined;
				this.isError = false;
			}, 5000);
		},
	},
});
