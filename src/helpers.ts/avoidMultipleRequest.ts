import { useGlobalStore } from '@/store/app';

export function avoidMultipleRequest(requestName: string): Promise<boolean> {
	const globalStore = useGlobalStore();

	return new Promise((resolve) => {
		if (globalStore.currentRequests.includes(requestName)) {
			resolve(false);
		} else {
			globalStore.addRequest(requestName);
			let isPending = true;
			setTimeout(() => {
				globalStore.removeRequest(requestName);
				isPending = false;
			}, 1000);

			function checkIsPending() {
				if (isPending) setTimeout(checkIsPending, 100);
				else resolve(true);
			}
			checkIsPending();
		}
	});
}
