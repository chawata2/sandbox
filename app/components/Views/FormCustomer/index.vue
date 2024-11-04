<script setup lang="ts">
export type CustomerForm = {
  name: string;
  corporate_number: string;
  invoices: {
    start_date: string;
    end_date: string | null;
  }[];
};

const modelValue = defineModel<CustomerForm>({ required: true });
const emits = defineEmits<{ (e: "submit"): void }>();

const { name, corporateNumber, errors, handleSubmit } = useCustomerForm(modelValue.value);

const onSubmit = handleSubmit(async (values) => {
  modelValue.value = values;
  emits("submit");
});
</script>

<template>
  <v-form @submit="onSubmit">
    <v-card>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field v-model="name" label="取引先名" :error-messages="errors.name" />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field v-model="corporateNumber" label="法人番号" :error-messages="errors.corporate_number" />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <ViewsFormCustomerInvoice />
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" type="submit">登録</v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>
