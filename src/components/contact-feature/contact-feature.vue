<template>
  <v-fade-transition>
    <v-row v-if="isVisibleOnce">
      <v-col cols="12" md="4">
        <contact-feature-details />
      </v-col>

      <v-col cols="12" md="8">
        <contact-feature-form />
      </v-col>
    </v-row>
  </v-fade-transition>
</template>

<script setup lang="ts">
const { isVisibleOnce } = useVisibilityOnce()
</script>
