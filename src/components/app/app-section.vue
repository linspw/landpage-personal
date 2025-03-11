<template>
  <v-sheet
    class="app-section"
    :class="{
      [`app-section--custom-color-${customColor}`]: customColor,
    }"
    tag="section"
  >
    <v-container class="app-section__header" data-aos="fade" data-aos-once="true">
      <v-breadcrumbs v-if="breadcrumbs.length" :items="breadcrumbs" class="mb-2">
        <template #divider>
          <v-icon>mdi-chevron-right</v-icon>
        </template>
      </v-breadcrumbs>

      <h2 v-if="title" class="text-h4 font-weight-bold text-uppercase mb-2">
        {{ title }}
      </h2>

      <p v-if="description" class="text-h6 text-md-h5 font-weight-medium text-secondary">
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
  breadcrumbs: {
    type: Array as () => { title: string; to?: string }[],
    default: () => [],
  },
  customColor: {
    type: String,
    default: undefined,
  },
});
</script>

<style lang="scss" scoped>
.app-section {
  backdrop-filter: saturate(180%) blur(8px);
  padding: 32px 0;

  &--custom-color-gradient-primary {
    background: linear-gradient(
      125deg,
      white 0%,
      rgba(var(--v-theme-primary), 0.2) 90%
    );
    color: rgb(var(--v-theme-secondary));
  }

  &--custom-color-white {
    background-color: rgba(255, 255, 255, 0.8);
    color: rgb(var(--v-theme-secondary));
  }
}

.app-section__header {
  text-align: left;
  margin-bottom: 16px;
}

.v-breadcrumbs {
  font-size: 14px;
  color: rgb(var(--v-theme-primary));
}
</style>
