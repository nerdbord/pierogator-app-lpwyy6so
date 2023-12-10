export interface Ingredient {
	name: string;
	quantity: string;
}

export class Ingredients {
	dough: Ingredient[] = [];
	filling: Ingredient[] = [];

	setIngredients(ingredients: Ingredients): this {
		this.dough = ingredients.dough;
		this.filling = ingredients.filling;
		return this;
	}
}
