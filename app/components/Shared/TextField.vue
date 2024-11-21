<script setup>
import { useField } from "vee-validate";

const props = defineProps({
  name: String,
});

const { value, errorMessage, handleChange, validate } = useField(() => props.name);

const handleChangeWithoutValidate = (e) => {
  handleChange(e, false);
};
</script>
<template>
  <v-text-field
    :value="value"
    @update:modelValue="handleChangeWithoutValidate"
    @blur="validate"
    :error-messages="errorMessage"
  />
</template>
