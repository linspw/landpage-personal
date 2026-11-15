<template>
  <img
    v-if="!ready"
    class="scroll-landscape-still"
    src="/images/home-particle-sphere.webp"
    alt=""
    width="640"
    height="640"
  >
  <canvas
    ref="canvas"
    class="scroll-landscape"
    :class="{ 'scroll-landscape--ready': ready }"
    aria-hidden="true"
    @webglcontextlost.prevent="contextLost = true"
    @webglcontextrestored="contextLost = false"
  />
</template>

<script setup lang="ts">
import {
  useDocumentVisibility,
  useIntersectionObserver,
  usePreferredReducedMotion,
  useResizeObserver,
} from '@vueuse/core'
import type { ScrollLandscapeRenderer } from '~/utils/home-scroll-landscape'

const props = defineProps<{ progress: number }>()
const emit = defineEmits<{ ready: [ready: boolean] }>()
const canvas = useTemplateRef('canvas')
const motion = usePreferredReducedMotion()
const visibility = useDocumentVisibility()
const inView = ref(false)
const ready = ref(false)
const contextLost = ref(false)
const playing = computed(() => ready.value && inView.value && visibility.value === 'visible')

let renderer: ScrollLandscapeRenderer | null = null
let width = 0
let height = 0
let frame = 0
let lastTime = 0
let elapsed = 0

function animate(time: number) {
  if (lastTime) elapsed += Math.min(0.05, (time - lastTime) / 1000)
  lastTime = time
  renderer?.draw(width, height, props.progress, elapsed)
  frame = requestAnimationFrame(animate)
}

watch(playing, (active, _, onCleanup) => {
  if (!active) return

  frame = requestAnimationFrame(animate)
  onCleanup(() => {
    cancelAnimationFrame(frame)
    lastTime = 0
  })
})

useIntersectionObserver(canvas, ([entry]) => {
  inView.value = Boolean(entry?.isIntersecting)
})

useResizeObserver(canvas, ([entry]) => {
  if (!entry) return
  width = Math.round(entry.contentRect.width)
  height = Math.round(entry.contentRect.height)
})

watch(
  [canvas, motion, contextLost],
  ([element, preference, lost], _, onCleanup) => {
    if (!element || preference === 'reduce' || lost) return

    let disposed = false
    void import('~/utils/home-scroll-landscape').then(({ createScrollLandscape }) => {
      if (disposed) return
      renderer = createScrollLandscape(element)
      if (!renderer) return
      renderer.draw(width, height, props.progress, elapsed)
      ready.value = true
      emit('ready', true)
    }).catch(() => {
      if (!disposed) emit('ready', false)
    })

    onCleanup(() => {
      disposed = true
      renderer?.dispose()
      renderer = null
      ready.value = false
      emit('ready', false)
    })
  },
  { flush: 'post' },
)
</script>

<style scoped>
.scroll-landscape,
.scroll-landscape-still {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.scroll-landscape {
  opacity: 0;
}

.scroll-landscape--ready {
  opacity: 1;
}

.scroll-landscape-still {
  object-fit: contain;
}
</style>
