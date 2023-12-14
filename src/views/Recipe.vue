<template>
  <div>
    <SectionHeader :header-text="'Pieróg'">
      <Button :button-text="'Zmień'" @click="pushToPreviousPage" />
    </SectionHeader>
    <div>
      <input
        v-model="currentRecipeName"
        style="width: 100%; outline: none"
        type="text"
        placeholder="Enter a Tag"
        disabled="true"
      />
      <main v-if="currentRecipeUrlImgPath" class="picture--container">
        <v-img
          :width="'100%'"
          :max-height="300"
          :src="currentRecipeUrlImgPath"
          cover
        ></v-img>
      </main>
      <SectionHeader :header-text="'Przepis'">
        <Button :button-text="'Generuj'" @click="generateRecipe()" />
      </SectionHeader>
      <input
        :v-model="notes"
        style="width: 100%; outline: none"
        type="text"
        placeholder="dodaj uwagi"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import router from "@/router";
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useDumplingsStore } from "@/store/dumplings.store";

import SectionHeader from "@/components/SectionHeader.vue";
import Button from "@/components/Button.vue";
import InputPromp from "@/components/InputPromp.vue";
import { getRecipe } from "@/api/openai/getRecipe";
import { Recipe } from "@/models/Recipe";

const dumplingsStore = useDumplingsStore();
const { generatingRecipe, currentRecipeName, currentRecipeUrlImgPath } =
  storeToRefs(dumplingsStore);

dumplingsStore.currentRecipe = new Recipe();

const notes = ref("");

function pushToPreviousPage(): void {
  router.replace({ path: "/recipe/add" });
}

interface Ingredient {
  name: string;
  quantity: string;
}

function parseIngredients(input: string): Ingredient[] {
  return input.split(",").map((item) => {
    const [name, quantity] = item.split(":");
    return { name, quantity };
  });
}

async function generateRecipe() {
  console.log(generatingRecipe?.value?.factors);
  if (generatingRecipe?.value === undefined) {
    return;
  }

  const PrmptDough = `Przepis na ciasto na pierogi z składnikami: ${generatingRecipe.value.factors.factors.val}. Podaj tylko same proporcje składników i zawsze zwracaj w podanym formacie:"składnik:ilosć,składnik:ilosć,składnik:ilosć"`;
  const PromptStuffing = `Przepis `;

  const data = await getRecipe(PrmptDough, notes.value);
  console.log(data);

  if (data) {
    const testPropmpt1: Ingredient[] = parseIngredients(data);

    // console.log(testPropmpt1);
    //dumplingsStore.currentRecipe?.setIngredients(testPropmpt1);
  }
}
</script>

<style type="scss" scoped></style>
