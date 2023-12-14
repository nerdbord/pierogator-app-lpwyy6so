export function parseIngredients(
	input: string
): Array<{ name: string; quantity: string }> {
	return input.split(',').map((item) => {
		const [name, quantity] = item.split(':');
		return { name, quantity };
	});
}
