<template>
  <v-card
    :color="color"
    rounded="xl"
    class="portifolio-feature-card p-10 h-100"
    :href="linkUrl"
    target="_blank"
  >
    <v-card-item class="h-100">
      <app-image
        :src="imageUrl"
        :height="90"
        :width="300"
        :class="{ 'mb-4': description }"
        :zoomable="false"
      />

      <p v-if="description" class="font-weight-semi-bold">
        {{ description }}
      </p>

      <div v-if="tags.length" class="flex flex-wrap gap-1 mt-4">
        <v-chip v-for="tag in tags" :key="tag">{{ tag }}</v-chip>
      </div>

      <template #append>
        <div class="flex items-center">
          <v-icon icon="fas fa-chevron-right" />
        </div>
      </template>
    </v-card-item>
  </v-card>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'

defineProps({
  linkUrl: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: undefined,
  },
  tags: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  description: {
    type: String,
    default: undefined,
  },
})
</script>

<style>
.portifolio-feature-card {
  & .v-card-item,
  & .v-card-item__content {
    height: 100%;
  }

  & .v-card-item {
    padding: 0;
  }

  & .v-card-item__content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
}
</style>
