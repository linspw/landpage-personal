<template>
  <v-card rounded="xl" class="pa-3" variant="tonal" color="tertiary-darken-4">
    <div class="d-flex gap-2">
      <v-icon v-if="icon" :icon="icon" />

      {{ skillName }}
    </div>
  </v-card>
</template>

<script setup lang="ts">
defineProps({
  skillName: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    default: undefined,
  },
  experienceTime: {
    type: Number,
    default: undefined,
  },
  personalGrade: {
    type: Number,
    required: true,
  },
  expert: {
    type: Boolean,
    default: undefined,
  },
  experimenting: {
    type: Boolean,
    default: undefined,
  },
  inLove: {
    type: Boolean,
    default: undefined,
  },
})
</script>

