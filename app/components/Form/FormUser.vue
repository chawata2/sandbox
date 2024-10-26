<script setup lang="ts">
export type UserForm = { name: string; email: string };

const form = defineModel<UserForm>({ required: true });
defineProps<{ validationIssues: FlatValidationIssues }>();
defineEmits(["submit-form"]);

/** バリデーション */
const requiredString = (s: string) => {
  return s.length > 0 || "必須項目です";
};

const nameRules = computed(() => {
  return [requiredString];
});
const emailRules = computed(() => {
  return [requiredString];
});
</script>
<template>
  <v-form class="w-50" @submit.prevent="$emit('submit-form')">
    <v-text-field
      v-model="form.name"
      density="compact"
      label="Your name"
      :error-messages="validationIssues.fieldErrors['name']"
      :rules="nameRules"
    />
    <v-text-field
      v-model="form.email"
      density="compact"
      label="Your email"
      :error-messages="validationIssues.fieldErrors['email']"
      :rules="emailRules"
    />
    <BtnSubmit type="submit" class="d-block mx-auto">Create</BtnSubmit>
  </v-form>
</template>
