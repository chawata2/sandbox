<script setup lang="ts">
import type { CustomerStatus } from "@prisma/client";

export type CustomerForm = {
  name: string;
  corporate_number: string;
  status: CustomerStatus;
  country: string;
  invoices: {
    start_date: string | null;
    end_date: string | null;
  }[];
};

const form = defineModel<CustomerForm>({ required: true });
defineEmits(["submit"]);
const valid = ref(false);

const nameRule = (v: string) => !!v || "取引先名は必須です";
</script>

<template>
  <v-form v-model="valid" @submit.prevent="valid ? $emit('submit') : undefined">
    <v-card>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field v-model="form.name" label="取引先名" :rules="[nameRule]" />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field v-model="form.corporate_number" label="法人番号" required />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="form.country" label="国" required />
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" type="submit">登録</v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>
