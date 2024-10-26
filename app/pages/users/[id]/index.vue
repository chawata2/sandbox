<script setup lang="ts">
useHead({
  title: "My page",
});

const route = useRoute();
const { id } = route.params;
if (typeof id !== "string") {
  // TODO: 例外定義
  throw showError("idが不正です");
}

const { data, error } = await useFetch(`/api/users/${id}`);

if (error.value) {
  // TODO: 例外定義
  throw showError(error.value);
}
</script>
<template>
  <div>
    <p>user page</p>
    <div>{{ data?.id }}</div>
    <div>{{ data?.email }}</div>
    <div>{{ data?.name }}</div>
  </div>
</template>
