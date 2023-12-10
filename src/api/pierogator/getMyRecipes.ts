import { Recipe } from '@/models/Recipe';
import { getData } from '../global.service';

export async function getMyRecipes(): Promise<Recipe[]> {
	const recipes = await getData<Recipe[]>('/pierogator/dumpling-recipes/me');
	return recipes;
}
