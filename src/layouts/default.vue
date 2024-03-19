<template>
  <v-app style="--v-layout-top: 80px">
    <app-header v-model="drawerIsOpen" order="1" />

    <v-main id="main-content">
      <slot />
    </v-main>

    <ClientOnly>
      <lazy-app-drawer v-model="drawerIsOpen" order="0" />
    </ClientOnly>

    <app-footer />
  </v-app>
</template>

<script setup lang="ts">
const drawerIsOpen = ref<boolean>(false)
</script>

<style lang="scss">
#main-content {
  --v-layout-top: 80px !important;

  min-height: 100vh;
}
</style>
