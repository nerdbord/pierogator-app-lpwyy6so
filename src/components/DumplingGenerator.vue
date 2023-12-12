<template>
  <section>
    <SectionHeader :header-text="'Pieróg'">
      <Button
        :button-text="'Generuj'"
        :is-disabled="globalStore.isLoading"
        @click="generateImage"
      />
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
import { PropType, ref, watch } from "vue";
import SectionHeader from "./SectionHeader.vue";
import Input from "./Input.vue";
import Button from "./Button.vue";
import { getImage } from "../api/openai/getImage";
import { getName } from "../api/openai/getName";
import { useGlobalStore } from "@/store/app";

const emit = defineEmits<{
  (e: "updateImgSrc", url: string): void;
  (e: "updateName", name: string): void;
}>();

const props = defineProps({
  ingredients: { type: Array as PropType<string[]>, required: true },
  imgSrc: { type: String, required: true },
  name: { type: String, required: true },
});

const globalStore = useGlobalStore();
const dumplingName = ref();
const pictureUrl = ref();

watch(
  () => props,
  () => {
    dumplingName.value = props.name;
    pictureUrl.value = props.imgSrc;
  },
  { deep: true, immediate: true }
);

function handleNameUpdate(value: string): void {
  console.log(value);
  emit("updateName", value);
}

function handleImgSrcUpdate(value: string): void {
  emit("updateImgSrc", value);
}

async function generateImage(): Promise<void> {
  const [imgUrl, name] = await Promise.all([
    getImage(props.ingredients),
    getName(props.ingredients.join(", ")),
  ]);
  globalStore.setLoading(false);
  if (name && imgUrl) {
    handleImgSrcUpdate(imgUrl);
    handleNameUpdate(name.replaceAll(`"`, ""));
  }
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
