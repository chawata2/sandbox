<script setup lang="ts">
const form = ref({
  name: "",
  corporate_number: "",
  status: "",
  country: "",
});
</script>

<template>
  <ViewsCustomerForm v-model="form" />
</template>
