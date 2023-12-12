<template>
  <div class="d-flex flex-column input-prompt mt-4" style="gap: 7px">
    <div>
      <label v-if="label">{{ label }}</label>
    </div>
    <div class="d-flex px-4 py-4 input-prompt__wrapper">
      <div
        class="prepand-Icon__prompt mr-2"
        :class="{ active: isDisabled }"
        @click="toogleDisabled"
      >
        <v-img
          :src="padlockImgSrc"
          width="18"
          height="18"
          class="z-index:0 !imprtant"
        />
      </div>
      <input
        style="width: 100%; outline: none"
        :type="fieldType"
        placeholder="Enter a Tag"
        :value="modelValue"
        :class="class"
        v-bind="$attrs"
        :disabled="isDisabled"
        @input="$emit('update:modelValue', $event.target.value)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import padlock_open from "@/assets/icons/padlock_open.svg";
import padlock_close from "@/assets/icons/padlock_close.svg";

const emit = defineEmits<{
  (event: "toogleState"): void;
}>();

const props = defineProps({
  label: { type: [String, Boolean], default: false },
  modelValue: { type: String, default: "" },
  class: { type: String, default: "input-prompt" },
  fieldType: { type: String, default: "text" },
  isDisabled: { type: Boolean, default: false },
});

const padlockImgSrc = computed(() => {
  return props.isDisabled ? padlock_close : padlock_open;
});

const toogleDisabled = () => {
  emit("toogleState");
};
</script>

<style lang="scss" scoped>
.input-prompt {
  .input-prompt__wrapper {
    background: linear-gradient(0deg, #f9f9f9, #f9f9f9),
      linear-gradient(0deg, #e8e8e8, #e8e8e8);
    border: 1px solid #e8e8e8;
    border-radius: 4px;
  }
}
.prepand-Icon__prompt {
  background-color: #d6d6d6;
  border-radius: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 34px;
  height: 34px;
  cursor: pointer;
}
.active {
  background-color: #ffe5b2;
}
</style>
