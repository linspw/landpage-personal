<template>
  <div class="pa-3">
    <div class="d-flex gap-2">
      <v-icon v-if="icon" :icon="icon" />

      {{ skillName }}
    </div>
  </div>
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

