<template>
  <div class="skill-item pa-3">
    <div class="d-flex gap-2 align-center mb-2">
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
})
</script>

<style scoped>
.skill-item {
  /* Add styling as needed */
}
</style>