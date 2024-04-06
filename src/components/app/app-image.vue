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
    // sizes: 'xs:100vw sm:100vw md:100vw lg:100vw xl:100vw',
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

const handleClick = () => {
  if ($props.zoomable || isFullscreen.value) toggle()
}
</script>
<template>
  <v-img
    class="app-image"
    transition="fade-transition"
    :src="_src"
    :srcset="_srcset.srcset"
    :height="height"
    :cover="!isFullscreen && cover"
    :class="{
      'app-image--zoomable': zoomable,
      'app-image--fullscreen': isFullscreen,
    }"
    @click="handleClick"
  >
    <v-btn
      v-if="isFullscreen"
      icon
      class="app-image__button"
      @click.stop="exit"
    >
      <v-icon icon="fas fa-xmark" />
    </v-btn>
    <slot />
  </v-img>
</template>

<style lang="scss">
.app-image {
  &--zoomable {
    cursor: zoom-in;
  }

  &--fullscreen {
    cursor: zoom-out;
  }
}

.app-image__button {
  position: absolute !important;
  right: 24px;
  top: 24px;
}
</style>
