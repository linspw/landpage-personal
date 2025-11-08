<script setup lang="ts">
import { useFullscreen, useCurrentElement } from '@vueuse/core'

const $props = defineProps({
  height: {
    type: [Number, String],
    default: 500,
  },
  src: {
    type: String,
    required: true,
  },
  quality: {
    type: Number,
    default: 70,
  },
  cover: {
    type: Boolean,
    default: undefined,
  },
  perfomance: {
    type: Boolean,
    default: true,
  },
  zoomable: {
    type: Boolean,
    default: true,
  },
})

const img = useImage()

const _srcset = computed(() => {
  return img.getSizes($props.src, {
    modifiers: {
      quality: $props.quality,
    },
  })
})
type ImageOptions = Parameters<typeof img>[1]

const _src = computed(() => {
  const config = { quality: $props.quality } as ImageOptions

  if ($props.perfomance && $props.height && typeof $props.height === 'number') {
    config!.height = $props.height
  }

  return img($props.src, config)
})

const element = useCurrentElement()
const { isFullscreen, toggle, exit } = useFullscreen(element as any)

const numericHeight = computed(() =>
  typeof $props.height === 'number' ? $props.height : undefined,
)
const inlineHeight = computed(() =>
  typeof $props.height === 'string' ? $props.height : undefined,
)

const handleClick = () => {
  if ($props.zoomable || isFullscreen.value) toggle()
}
</script>
<template>
  <figure
    class="app-image relative w-full overflow-hidden rounded-3xl transition-all"
    :class="{
      'cursor-zoom-in': zoomable && !isFullscreen,
      'cursor-zoom-out': isFullscreen,
    }"
    @click="handleClick"
  >
    <img
      class="h-full w-full object-contain"
      :class="{ 'object-cover': cover && !isFullscreen }"
      :src="_src"
      :srcset="_srcset.srcset"
      :height="numericHeight"
      :style="inlineHeight ? { height: inlineHeight } : undefined"
      loading="lazy"
      decoding="async"
      alt=""
    />
    <UButton
      v-if="isFullscreen"
      icon="i-heroicons-x-mark-20-solid"
      variant="soft"
      color="white"
      class="absolute right-3 top-3"
      @click.stop="exit"
    />
    <slot />
  </figure>
</template>

<style scoped>
.app-image {
  background-color: rgba(255, 255, 255, 0.02);
}
</style>
