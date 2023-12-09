<template>
  <div>
    <v-img :src="headerSrc"></v-img>
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue";
import pierogator_swiateczny from "@/assets/header/pierogator_swiateczny.svg";
import pierogarnia from "@/assets/header/pierogarnia.svg";
import { TitleTypeEnum } from "@/enums/TitleType.enum";
import { useRoute } from "vue-router";

const router = useRoute();

const headerSrc = computed(() => {
  return router.meta.titleType === TitleTypeEnum.a
    ? pierogator_swiateczny
    : pierogarnia;
});
</script>

<style lang="scss" scoped></style>
