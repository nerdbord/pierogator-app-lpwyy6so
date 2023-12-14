import axios from 'axios';
import { postData } from '../global.service';
import { Recipe } from '@/models/Recipe';
import { Ingredient } from '@/models/Ingredients';

export interface ICreateRecipe {
	name: string;
	imageSrc: string;
	ingredients: {
		dough: { name: string; quantity: string }[];
		filling: { name: string; quantity: string }[];
	};
	instructions: {
		dough_preparation: string[];
		filling_preparation: string[];
		forming_and_cooking_dumplings: string[];
		serving: string[];
	};
}

export async function createRecipe(recipe: ICreateRecipe): Promise<Recipe> {
	return await postData<ICreateRecipe, Recipe>(
		'/pierogator/dumpling-recipes',
		recipe
	);
}
