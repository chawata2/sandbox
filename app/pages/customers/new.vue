<script setup lang="ts">
import type { CustomerForm } from "~/components/Views/FormCustomer/index.vue";

const form = ref<CustomerForm>({
  name: "",
  corporate_number: "",
  invoices: [],
});

const errorMessage = ref<string | null>(null);

const { data, error, execute } = useFetch("/api/customers", {
  method: "POST",
  body: form,
  immediate: false,
  watch: false,
});

const onSubmit = async () => {
  console.log("onSubmit");
  console.log(form.value);

  errorMessage.value = null;

  await execute();

  if (error.value) {
    console.error(error.value);
    if (error.value.statusCode === 422) {
      errorMessage.value = [
        `statusCode: ${error.value.data.statusCode}`,
        `message: ${error.value.data.message}`,
        `${JSON.stringify(error.value.data.data)}`,
      ].join("\n");
    } else {
      errorMessage.value = "エラーが発生しました";
    }
    return;
  }

  console.log(data);
};
</script>

<template>
  <div>
    <v-alert v-if="errorMessage" type="error" class="text-pre-wrap">{{ errorMessage }}</v-alert>
    <ViewsFormCustomer v-model="form" @submit="onSubmit" />
  </div>
</template>
