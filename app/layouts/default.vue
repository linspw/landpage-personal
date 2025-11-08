<template>
  <div class="flex min-h-screen flex-col bg-slate-50">
    <app-header v-model="drawerIsOpen" />

    <main id="main-content">
      <slot />
    </main>

    <app-footer />

    <ClientOnly>
      <lazy-app-drawer v-model="drawerIsOpen" />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
const drawerIsOpen = ref<boolean>(false)
</script>

<style lang="scss">
#main-content {
  display: flex;
  position: relative;
  flex-direction: column;
  min-height: 100dvh;
  width: 100%;
  max-width: 100dvw;
  overflow-x: hidden;
  top: 0;
  left: 0;
}
</style>
