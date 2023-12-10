import { Recipe } from '@/models/Recipe';
import { getData } from '../global.service';

export async function getAllRecipes(): Promise<Recipe[]> {
	const recipes = await getData<Recipe[]>('/pierogator/dumpling-recipes');
	return recipes;
}
