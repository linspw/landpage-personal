<template>
  <div
    class="app-page flex min-h-screen flex-1 flex-col"
    :class="{ 'app-page--with-top-margin': withTopMargin }"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps({
  withTopMargin: {
    type: Boolean,
    default: false,
  },
})
</script>

<style scoped>
.app-page {
  min-height: 100%;
}

.app-page--with-top-margin {
  margin-top: 80px;
}
</style>
