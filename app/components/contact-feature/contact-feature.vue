<template>
  <Transition name="contact-feature-fade">
    <div
      v-if="isVisibleOnce"
      class="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)]"
    >
      <contact-feature-details />
      <contact-feature-form />
    </div>
  </Transition>
</template>

<script setup lang="ts">
const { isVisibleOnce } = useVisibilityOnce()
</script>

<style scoped>
.contact-feature-fade-enter-active,
.contact-feature-fade-leave-active {
  transition: opacity 0.35s ease;
}

.contact-feature-fade-enter-from,
.contact-feature-fade-leave-to {
  opacity: 0;
}
</style>
