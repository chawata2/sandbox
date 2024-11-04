<script setup lang="ts">
import { useFieldArray } from "vee-validate";

defineProps<{ errors: ReturnType<typeof useCustomerForm>["errors"]["value"] }>();

const { remove, push, fields } = useFieldArray<{ start_date: string | null; end_date: string | null }>("invoices");
</script>
<template>
  <v-table>
    <thead>
      <tr>
        <th>開始日</th>
        <th>終了日</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(field, idx) in fields" :key="field.key">
        <td>
          <v-text-field
            v-model="field.value.start_date"
            type="date"
            label="開始日"
            :error-messages="errors[`invoices[${idx}].start_date` as any]"
          />
        </td>
        <td>
          <v-text-field
            v-model="field.value.end_date"
            type="date"
            label="終了日"
            :error-messages="errors[`invoices[${idx}].end_date` as any]"
          />
        </td>
        <td>
          <v-btn @click="remove(idx)">削除</v-btn>
        </td>
      </tr>
    </tbody>
  </v-table>
  <v-btn @click="push({ start_date: null, end_date: null })">追加</v-btn>
</template>
