<template>
  <div class="skill-item flex items-center gap-2 rounded-2xl border border-slate-200 bg-white/80 px-4 py-2 text-secondary shadow-sm">
    <span
      v-if="icon"
      class="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary"
    >
      <i :class="icon" aria-hidden="true" />
    </span>
    <span class="text-sm font-semibold">
      {{ skillName }}
    </span>
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
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.skill-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(15, 23, 42, 0.08);
}
</style>
