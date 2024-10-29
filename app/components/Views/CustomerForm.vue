<script setup lang="ts">
const form = defineModel<{
  name: string;
  corporate_number: string;
  status: string;
  country: string;
}>({ required: true });
</script>

<template>
  <v-card>
    <template #title> <span class="font-weight-black">Welcome to Vuetify</span></template>

    <v-card-text>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field v-model="form.name" label="取引先名" required />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
