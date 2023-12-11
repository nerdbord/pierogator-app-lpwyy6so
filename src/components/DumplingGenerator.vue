<template>
  <section>
    <SectionHeader :header-text="'Pieróg'">
      <Button :button-text="'Generuj'" @click="generateImage" />
    </SectionHeader>
    <main v-if="pictureUrl" class="picture--container">
      <v-img :width="'100%'" :max-height="300" :src="pictureUrl" cover></v-img>
    </main>
    <footer v-if="pictureUrl" class="d-flex flex-column" style="gap: 15px">
      <Input
        :value="dumplingName"
        :label-text="'Nazwa'"
        :input-id="dumplingName"
        :max-length="40"
        @update-input-value="handleNameUpdate"
      />
    </footer>
  </section>
</template>

<script setup lang="ts">
import { PropType, ref } from "vue";
import SectionHeader from "./SectionHeader.vue";
import Input from "./Input.vue";
import Button from "./Button.vue";
import { getImage } from "../api/openai/getImage";
import { getName } from "../api/openai/getName";

const props = defineProps({
  ingredients: { type: Array<string>, required: true },
});

const dumplingName = ref();
const pictureUrl = ref();

function handleNameUpdate(value: string): void {
  dumplingName.value = value;
}

async function generateImage(): Promise<void> {
  const [imgUrl, name] = await Promise.all([
    getImage(props.ingredients),
    getName(),
  ]);
  handleNameUpdate(name.replace(`"`, ""));
  pictureUrl.value = imgUrl;
}
</script>

<style scoped lang="scss">
@import "../styles/variables.scss";

section {
  display: flex;
  flex-direction: column;
  gap: 16px;

  main.picture--container {
    max-height: 300px;
    width: 100%;
    border-radius: $border-radius-base;
  }
}
</style>
