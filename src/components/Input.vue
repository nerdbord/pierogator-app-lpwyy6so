<template>
  <div class="d-flex flex-column">
    <label v-if="!isDisabled" :for="inputId"> {{ labelText }} </label>
    <input
      v-model="inputValue"
      :id="inputId"
      :class="{ disabled: isDisabled }"
      :disabled="isDisabled"
      :placeholder="placeholder"
      :maxlength="maxLength"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { v4 as uuidv4 } from "uuid";

const emit = defineEmits<{
  (e: "updateInputValue", value: string): void;
}>();

const props = defineProps({
  value: { type: String, required: true },
  labelText: { type: String, default: "" },
  isDisabled: { type: Boolean, default: false },
  maxLength: { type: Number, default: null },
  placeholder: { type: String, default: null },
});

const inputId = `input-${uuidv4().slice(0, 8)}`;
const inputValue = ref("");

watch(
  () => inputValue.value,
  () => {
    emit("updateInputValue", inputValue.value);
  }
);

watch(
  () => props.value,
  (value) => {
    inputValue.value = value;
  },
  { immediate: true }
);
</script>

<style scoped lang="scss">
@import "../styles/variables.scss";

label {
  font-family: "Poppins";
  color: $col-dark-green;
  font-size: $font-size-root;
  font-weight: 500;
  line-height: 16px;
  margin-bottom: 7px;
}

input {
  background: $col-gray-background;
  border-radius: $border-radius-base;
  border: 1px solid $col-gray-light;
  padding: 16px;
  color: $col-dark-green;
  font-weight: 400;
  line-height: 20px;
  &:active,
  &:focus {
    outline: none;
  }
}
.disabled {
  border: 1px solid transparent;
}
</style>
