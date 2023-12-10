import { Ingredients } from './Ingredients';
import { Instructions } from './Instructions';

export class Recipe {
	name = '';
	imageSrc = '';
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

	setIngredients(ingredients: Ingredients): this {
		this.ingredients.setIngredients(ingredients);
		return this;
	}

	setInstructions(instructions: Instructions): this {
		this.instructions.setInstructions(instructions);
		return this;
	}
}
