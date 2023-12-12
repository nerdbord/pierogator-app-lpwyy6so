import { Recipe } from '@/models/Recipe';
import { getData } from '../global.service';

export async function getRecipeById(recipeId: string): Promise<Recipe> {
	const recipe = await getData<Recipe>(
		`/pierogator/dumpling-recipes/${recipeId}`
	);
	return recipe;
}
