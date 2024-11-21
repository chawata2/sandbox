<script setup lang="ts">
import type {CustomerForm} from "~/components/Views/FormCustomer/index.vue";

const form = ref<CustomerForm>({
	name: "",
	corporate_number: "",
	invoices: [],
});

//const errorMessage = ref<string | null>(null);

//const { data, error, execute } = useFetch("/api/customers", {
//  method: "POST",
//  body: form,
//  immediate: false,
//  watch: false,
//});

const onSubmit = async () => {
	console.log("onSubmit");
	console.log(form.value);
};
</script>

<template>
	<div>
		<ViewsFormCustomer v-model="form" @submit="onSubmit" />
	</div>
</template>
