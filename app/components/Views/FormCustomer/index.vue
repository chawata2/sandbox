<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import z from "zod";

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

const schema = toTypedSchema(
  z.object({
    id: z.string(),
    name: z.string().min(1),
    corporate_number: z.string().length(13),
    invoices: z.array(
      z.object({
        start_date: z.string().min(2).max(5),
        end_date: z.string().nullable(),
      }),
    ),
  }),
);

const { handleSubmit } = useForm({ validationSchema: schema, initialValues: modelValue.value });

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
            <SharedTextField :name="`name`" label="取引先名" />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <SharedTextField :name="`corporate_number`" label="法人番号" />
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
