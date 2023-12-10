<template>
  <div>
    <form @submit.prevent="sendPrompt">
      <SectionHeader :header-text="'Składniki'">
        <Button :button-text="'Generuj'" />
      </SectionHeader>
      <InputPromp v-model="InputsPrompt.cake.val" label="Ciasto" />
      <InputPromp v-model="InputsPrompt.feelings.val" label="Nadzienie" />
      <InputPromp v-model="InputsPrompt.factors.val" label="Składniki" />
    </form>
  </div>
  <DumplingGenerator
    :ingredients="['banany, czekolada']"
    style="margin-bottom: 40px"
  />
  <CTA
    :button-text="'Zapisz i przejdź do tworzenia przepisu'"
    @click="saveDumpling"
  />
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import DumplingGenerator from "@/components/DumplingGenerator.vue";
import InputPromp from "@/components/InputPromp.vue";
import CTA from "@/components/CTA.vue";
import SectionHeader from "@/components/SectionHeader.vue";
import Button from "@/components/Button.vue";
import { useDumplingsStore } from "../store/dumplings.store";
import { Recipe } from "@/models/Recipe";
import { Ingredients } from "@/models/Ingredients";

const InputsPrompt = reactive({
  cake: { val: "", isDisable: false },
  feelings: { val: "", isDisable: false },
  factors: { val: "", isDisable: false },
});

const dumplingStore = useDumplingsStore();
const testRecipe = new Recipe();

testRecipe.setName("test recipe...");
testRecipe.setImageSrc(
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5v3ZBADao2HdMWOdHdwDrMYoWFIApd_mXfQYZFCTaIw&s"
);

testRecipe.setIngredients({
  dough: [{ name: "kakao", quantity: "1 łyzka" }],
  filling: [{ name: "budyń", quantity: "15 opakowań" }],
});

testRecipe.setInstructions({
  dough_preparation: ["doug preparation"],
  filling_preparation: ["some filling prep #1", "filling prep #2"],
  forming_and_cooking_dumplings: ["forming _____ 123"],
  serving: ["podawać z colą"],
});

function saveDumpling(): void {
  dumplingStore.addDumpling(testRecipe);
}

const sendPrompt = (e: Event) => {
  console.log("form was send!");
  console.log(InputsPrompt.cake.val);
};
</script>
<style lang="scss" scoped></style>
