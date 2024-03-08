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
      class="app-section__header"
      data-aos="fade-up"
    >
      <h2
        v-if="title"
        class="text-h4 font-weight-bold text-uppercase text-primary"
      >
        {{ title }}
      </h2>

      <p v-if="description" class="text-h6 text-md-h5 font-weight-medium">
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
  margin-bottom: 64px;

  & h2 {
    text-transform: uppercase !important;
  }
}
</style>
