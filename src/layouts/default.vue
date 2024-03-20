<template>
  <v-app>
    <app-header v-model="drawerIsOpen" order="1" />

    <v-main id="main-content" order="2">
      <slot />

      <app-footer />
    </v-main>

    <ClientOnly>
      <lazy-app-drawer v-model="drawerIsOpen" order="0" />
    </ClientOnly>
  </v-app>
</template>

<script setup lang="ts">
const drawerIsOpen = ref<boolean>(false)
</script>

<style lang="scss">
#main-content {
  position: absolute;
  min-height: 100dvh;
  width: 100%;
}
</style>
