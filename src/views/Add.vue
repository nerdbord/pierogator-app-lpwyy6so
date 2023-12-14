<template>
  <div>
    <form @submit.prevent="sendPrompt">
      <SectionHeader
        :header-text="'Składniki'"
        :is-loading="isFetchingIngredients"
      >
        <Button :button-text="'Generuj'" :is-disabled="isFetchingIngredients" />
      </SectionHeader>
      <InputPromp
        v-model="InputsPrompt.cake.val"
        label="Ciasto"
        @toogleState="toogleCakeInput"
        :is-disabled="InputsPrompt.cake.isDisable"
      />
      <InputPromp
        v-model="InputsPrompt.feelings.val"
        label="Nadzienie"
        @toogleState="toogleFeelingsInput"
        :is-disabled="InputsPrompt.feelings.isDisable"
      />
      <InputPromp
        v-model="InputsPrompt.factors.val"
        label="Składniki"
        @toogleState="toogleFactorsInput"
        :is-disabled="InputsPrompt.factors.isDisable"
      />
    </form>
  </div>
  <DumplingGenerator
    :ingredients="[InputsPrompt.factors.val]"
    :img-src="dumplingStore.currentRecipe?.imageSrc || ''"
    :name="dumplingStore.currentRecipe?.name || ''"
    style="margin-bottom: 40px"
    @update-img-src="updateImg"
    @update-name="updateName"
  />
  <CTA
    :button-text="'Zapisz i przejdź do tworzenia przepisu'"
    @click="saveDumpling"
  />
</template>

<script setup lang="ts">
import router from "@/router";
import { ref, reactive, toRaw } from "vue";
import DumplingGenerator from "@/components/DumplingGenerator.vue";
import InputPromp from "@/components/InputPromp.vue";
import CTA from "@/components/CTA.vue";
import SectionHeader from "@/components/SectionHeader.vue";
import Button from "@/components/Button.vue";
import { useDumplingsStore } from "../store/dumplings.store";
import { Recipe } from "@/models/Recipe";
import { getFactors } from "@/api/openai/getFactors";
import { RoutesNames } from "@/enums/RoutesNames.enum";

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

const InputsPrompt: IInputPrompts = reactive({
  cake: { val: "", isDisable: false },
  feelings: { val: "", isDisable: false },
  factors: { val: "", isDisable: false },
});

const isFetchingIngredients = ref(false);
const testRecipe = ref(new Recipe());
const dumplingStore = useDumplingsStore();
dumplingStore.currentRecipe = new Recipe();

function updateImg(url: string): void {
  dumplingStore.currentRecipe?.setImageSrc(url);

  testRecipe.value.imageSrc = url;
}

function updateName(name: string): void {
  dumplingStore.currentRecipe?.setName(name);
  testRecipe.value.name = name;
}

function saveDumpling(): void {
  dumplingStore.saveFactorsForRecipe(
    testRecipe.value.imageSrc,
    toRaw(InputsPrompt),
    testRecipe.value.name
  );
  router.push({ name: RoutesNames.Recipe });
}

const toogleCakeInput = () => {
  if (InputsPrompt.cake.val === "") {
    return;
  }
  InputsPrompt.cake.isDisable = !InputsPrompt.cake.isDisable;
};

const toogleFeelingsInput = () => {
  if (InputsPrompt.feelings.val === "") {
    return;
  }
  InputsPrompt.feelings.isDisable = !InputsPrompt.feelings.isDisable;
};

const toogleFactorsInput = () => {
  if (InputsPrompt.factors.val === "") {
    return;
  }
  InputsPrompt.factors.isDisable = !InputsPrompt.factors.isDisable;
};

function translateKeyName(key: string): string {
  switch (key) {
    case "cake":
      return "ciasto";
    case "feelings":
      return "nadzienie";
    case "factors":
      return "składniki";
    default:
      return "nieznany klucz";
  }
}

function filterAndTransform(inputPrompts: IInputPrompts): IFactor[] {
  return Object.entries(inputPrompts)
    .filter(([key, value]) => !value.isDisable)
    .map(([key, value]) => ({
      ...value,
      name: translateKeyName(key),
    }));
}
type Message = {
  role: "system" | "user" | "assistant";
  content: string;
};

function generatePromptMsgList(inputPrompts: IFactor[]): string[] {
  const res: string[] = inputPrompts.map((item) => {
    const promptContent =
      item.val !== ""
        ? `Wygeneruj ogolny opis ${item.name} na pierogi, uwzględniając następujące informacje: ${item.val} maxymalnie 60 znaków`
        : `Wygeneruj ogolny opis  ${item.name} na pierogi ,maxymalnie 60 znaków kazdy po przecinku`;

    return promptContent;
  });

  return res;
}

async function callToAllPrompts(promptList: string[]) {
  const promises = promptList.map((prompt) => getFactors(prompt));
  isFetchingIngredients.value = true;
  const dataTest = await Promise.all(promises);
  isFetchingIngredients.value = false;
  return dataTest;
}

const sendPrompt = (e: Event) => {
  const unlockedPromptsMsg = filterAndTransform(InputsPrompt);
  const promptList = generatePromptMsgList(unlockedPromptsMsg);

  callToAllPrompts(promptList).then((dataTest) => {
    let arrayIndex = 0;
    for (let key in InputsPrompt) {
      if (!InputsPrompt[key].isDisable && arrayIndex < dataTest.length) {
        InputsPrompt[key].val = dataTest[arrayIndex++];
      }
    }
  });
};

// const InputsPrompt: IInputPrompts = reactive({
//   cake: { val: "", isDisable: false },
//   feelings: { val: "", isDisable: false },
//   factors: { val: "", isDisable: false },
// });

onMounted(() => {
  console.log("Addvue mounted");
  if (dumplingStore.generatingRecipe) {
    InputsPrompt.cake.isDisable =
      dumplingStore.generatingRecipe.factors.cake.isDisable;
    InputsPrompt.cake.val = dumplingStore.generatingRecipe.factors.cake.val;
    InputsPrompt.feelings.val =
      dumplingStore.generatingRecipe.factors.feelings.val;
    InputsPrompt.feelings.isDisable =
      dumplingStore.generatingRecipe.factors.feelings.isDisable;
    InputsPrompt.factors.val =
      dumplingStore.generatingRecipe.factors.factors.val;
    InputsPrompt.factors.isDisable =
      dumplingStore.generatingRecipe.factors.factors.isDisable;
    dumplingStore.currentRecipe = new Recipe();
    dumplingStore.currentRecipe
      .setName(dumplingStore.generatingRecipe.recipeName)
      .setImageSrc(dumplingStore.generatingRecipe.imgSrc);
  }
});
</script>
<style lang="scss" scoped></style>
