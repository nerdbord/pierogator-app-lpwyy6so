import { Ingredients } from './Ingredients';
import { Instructions } from './Instructions';

export class Recipe {
	name = '';
	imageSrc = '';
	id = '';
	_id = '';
	author = '';
	ingredients = new Ingredients();
	instructions = new Instructions();

	setName(name: string): this {
		this.name = name;
		return this;
	}

	setImageSrc(src: string): this {
		this.imageSrc = src;
		return this;
	}

	setIngredients(ingredients: Omit<Ingredients, 'setIngredients'>): this {
		this.ingredients.setIngredients(ingredients);
		return this;
	}

	setInstructions(instructions: Omit<Instructions, 'setInstructions'>): this {
		this.instructions.setInstructions(instructions);
		return this;
	}
}
