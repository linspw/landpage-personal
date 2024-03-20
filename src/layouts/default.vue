<template>
  <v-app>
    <app-header v-model="drawerIsOpen" />

    <main id="main-content">
      <slot />
    </main>

    <app-footer />

    <ClientOnly>
      <lazy-app-drawer v-model="drawerIsOpen" />
    </ClientOnly>
  </v-app>
</template>

<script setup lang="ts">
const drawerIsOpen = ref<boolean>(false)
</script>

<style lang="scss">
#main-content {
  position: relative;
  min-height: 100dvh;
  width: 100%;
  max-width: 100dvw;
  overflow-x: hidden;
}
</style>
