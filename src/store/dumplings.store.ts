import { defineStore } from "pinia";
import { createRecipe } from "@/api/pierogator/createRecipe";
import { deleteRecipe } from "@/api/pierogator/deleteRecipe";
import { getAllRecipes } from "@/api/pierogator/getAllRecipes";
import { getMyRecipes } from "@/api/pierogator/getMyRecipes";
import { getRecipeById } from "@/api/pierogator/getRecipeById";
import { Recipe } from "@/models/Recipe";
import { avoidMultipleRequest } from "@/helpers.ts/avoidMultipleRequest";

interface IFactor {
  val: string;
  isDisable: boolean;
  name?: string;
}
interface IInputPrompts {
  [key: string]: IFactor;
  cake: IFactor;
  feelings: IFactor;
  factors: IFactor;
}

interface DumplingsStore {
  allRecipes: Recipe[];
  myRecipes: Recipe[];
  currentRecipe?: Recipe;
  generatingRecipe?: { factors: IInputPrompts; imgSrc: string };
}

const initState = (): DumplingsStore => ({
  allRecipes: [],
  myRecipes: [],
  currentRecipe: undefined,
  generatingRecipe: undefined,
});

export const useDumplingsStore = defineStore("dumplingsStore", {
  state: initState,
  actions: {
    async getAllRecipes(): Promise<void> {
      this.allRecipes = await getAllRecipes();
    },
    async getMyRecipes(): Promise<void> {
      this.myRecipes = await getMyRecipes();
    },
    async getRecipeById(recipeId: string): Promise<void> {
      this.currentRecipe = await getRecipeById(recipeId);
    },
    async addRecipe(recipe: Recipe): Promise<void> {
      await createRecipe(recipe);
      this.fetchRecipes();
    },
    async removeRecipe(recipeId: string): Promise<void> {
      await deleteRecipe(recipeId);
      this.fetchRecipes();
    },
    async fetchRecipes(): Promise<void> {
      await Promise.all([this.getAllRecipes(), this.getMyRecipes()]);
    },
    saveFactorsForRecipe(imgUrl: string, factorsObj: IInputPrompts) {
      this.generatingRecipe = {
        factors: factorsObj,
        imgSrc: imgUrl,
      };
    },
  },
});
