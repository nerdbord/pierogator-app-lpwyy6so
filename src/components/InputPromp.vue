<template>
  <div class="d-flex input-prompt">
    <label v-if="label">{{ label }}</label>
    <div
      class="prepand-Icon__prompt"
      :class="{ active: isDisabled }"
      @click="handleDisableField"
    >
      <v-img :src="padlockImgSrc" width="18" height="18" />
    </div>
    <input
      :type="fieldType"
      placeholder="Enter a Tag"
      :value="modelValue"
      :class="class"
      v-bind="$attrs"
      :disabled="isDisabled"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import padlock_open from "@/assets/icons/padlock_open.svg";
import padlock_close from "@/assets/icons/padlock_close.svg";

defineProps({
  label: { type: [String, Boolean], default: false },
  modelValue: { type: String, default: "" },
  class: { type: String, default: "input-prompt" },
  fieldType: { type: String, default: "text" },
});
const isDisabled = ref(false);

const padlockImgSrc = computed(() => {
  return isDisabled.value ? padlock_close : padlock_open;
});
const handleDisableField = () => {
  isDisabled.value = !isDisabled.value;
};
</script>

<style lang="scss" scoped>
.prepand-Icon__prompt {
  background-color: #d3d3d3;
  border-radius: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 34px;
  height: 34px;
}
.active {
  background-color: yellow;
}
</style>
