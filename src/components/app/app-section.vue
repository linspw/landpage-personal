<template>
  <v-sheet
    class="app-section"
    :class="{
      [`app-section--custom-color-${customColor}`]: customColor,
    }"
    tag="section"
  >
    <v-container
      v-if="title || description"
      class="app-section__header mb-8 md:mb-16"
      data-aos="fade-up"
    >
      <h2
        v-if="title"
        class="text-3xl md:text-4xl font-bold uppercase text-primary"
      >
        {{ title }}
      </h2>

      <p v-if="description" class="text-xl md:text-2xl font-medium">
        {{ description }}
      </p>
    </v-container>

    <slot />
  </v-sheet>
</template>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    default: undefined,
  },
  description: {
    type: String,
    default: undefined,
  },
  customColor: {
    type: String,
    default: undefined,
  },
})
</script>

<style lang="scss">
/* stylelint-disable */

.app-section {
  backdrop-filter: saturate(180%) blur(8px);

  &--custom-color-gradient-primary {
    background: linear-gradient(
      125deg,
      white 0%,
      rgba(var(--v-theme-primary), 0.2) 90%
    );
    color: rgb(var(--v-theme-secondary));
  }

  &--custom-color-gradient-quaternary {
    background: linear-gradient(
      125deg,
      rgba(var(--v-theme-quaternary), 0.4) 0%,
      rgba(var(--v-theme-primary), 0.4) 50%
    );
    color: rgb(var(--v-theme-secondary));
  }

  &--custom-color-white {
    background-color: rgba(255 255 255 / 44.5%);
    color: rgb(var(--v-theme-secondary));
  }

  &--custom-color-secondary {
    background-color: rgb(var(--v-theme-secondary));
    color: white;
  }
}

.app-section__header {
  & h2 {
    text-transform: uppercase !important;
  }
}
</style>
