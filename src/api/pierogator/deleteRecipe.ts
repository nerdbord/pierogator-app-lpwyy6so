import { deleteData } from '../global.service';

export async function deleteRecipe(recipeId: string): Promise<void> {
	return await deleteData(`/pierogator/dumpling-recipes/${recipeId}`);
}
