<script setup lang="ts">
import { useField, useFieldArray } from "vee-validate";

const { value } = useField<{ id: string; start_date: string | null; end_date: string | null }[]>("invoices");

const { push, remove } = useFieldArray<{ id: string; start_date: string | null; end_date: string | null }>("invoices");

const add = () => {
  push({
    id: crypto.randomUUID(),
    start_date: null,
    end_date: null,
  });
};
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
      <tr v-for="(field, idx) in value" :key="field.id">
        <td>
          <SharedTextField :name="`invoices[${idx}].start_date`" />
        </td>
        <td>
          <SharedTextField :name="`invoices[${idx}].end_date`" />
        </td>
        <td>
          <v-btn @click="remove(idx)">削除</v-btn>
        </td>
      </tr>
    </tbody>
  </v-table>
  <v-btn @click="add">追加</v-btn>
</template>
