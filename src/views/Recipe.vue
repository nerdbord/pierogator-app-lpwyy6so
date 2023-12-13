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
        <Button :button-text="'Generuj'" @click="generateRecipe" />
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

const dumplingsStore = useDumplingsStore();
const { generatingRecipe, currentRecipeName, currentRecipeUrlImgPath } =
  storeToRefs(dumplingsStore);

import SectionHeader from "@/components/SectionHeader.vue";
import Button from "@/components/Button.vue";
import InputPromp from "@/components/InputPromp.vue";

const notes = ref("");
function pushToPreviousPage(): void {
  router.replace({ path: "/recipe/add" });
}

function generateRecipe(): void {
  //todo call to openAi to generate recipe
}
</script>

<style type="scss" scoped></style>
