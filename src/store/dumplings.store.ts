import { defineStore } from 'pinia';
import { createRecipe } from '@/api/pierogator/createRecipe';
import { deleteRecipe } from '@/api/pierogator/deleteRecipe';
import { getAllRecipes } from '@/api/pierogator/getAllRecipes';
import { getMyRecipes } from '@/api/pierogator/getMyRecipes';
import { getRecipeById } from '@/api/pierogator/getRecipeById';
import { Recipe } from '@/models/Recipe';
interface DumplingsStore {
	allRecipes: Recipe[];
	myRecipes: Recipe[];
	currentRecipe?: Recipe;
}

const initState = (): DumplingsStore => ({
	allRecipes: [],
	myRecipes: [],
	currentRecipe: undefined,
});

export const useDumplingsStore = defineStore('dumplingsStore', {
	state: initState,
	actions: {
		async getAllDumplings(): Promise<void> {
			this.allRecipes = await getAllRecipes();
		},
		async getMyDumplings(): Promise<void> {
			this.myRecipes = await getMyRecipes();
		},
		async getDumpling(recipeId: string): Promise<void> {
			this.currentRecipe = await getRecipeById(recipeId);
		},
		async addDumpling(recipe: Recipe): Promise<void> {
			await createRecipe(recipe);
			this.fetchRecipes();
		},
		async removeDumpling(recipeId: string): Promise<void> {
			await deleteRecipe(recipeId);
			this.fetchRecipes();
		},
		async fetchRecipes(): Promise<void> {
			await Promise.all([this.getAllDumplings(), this.getMyDumplings()]);
		},
	},
});
