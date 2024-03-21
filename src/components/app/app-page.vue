<template>
  <div
    class="app-page d-flex flex-column flex-1-0"
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

<style>
.app-page--with-top-margin {
  margin-top: 80px;
}
</style>
