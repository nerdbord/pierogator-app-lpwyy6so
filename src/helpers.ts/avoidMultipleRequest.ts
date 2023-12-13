let currentRequests: string[] = [];

export function avoidMultipleRequest(request: string): Promise<boolean> {
	return new Promise((resolve) => {
		if (currentRequests.includes(request)) {
			resolve(false);
		} else {
			currentRequests.push(request);
			setTimeout(() => {
				currentRequests = currentRequests.filter((r) => r !== request);
			}, 500);
		}
	});
}
