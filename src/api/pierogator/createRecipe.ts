import axios from 'axios';
import { Dumpling } from '@/models/Dumpling';
import { postData } from '../global.service';
import { Recipe } from '@/models/Recipe';

export async function createRecipe(recipe: Recipe): Promise<void> {
	return await postData<Recipe>('/pierogator/dumpling-recipes', recipe);
}
