<template>
  <div
    ref="stage"
    class="infinite-drift"
    role="group"
    :class="{ 'drift-ready': ready, 'drift-dragging': dragging }"
    :aria-label="label"
    :tabindex="ready ? 0 : undefined"
    :style="{
      height: typeof height === 'number' ? `${height}px` : height,
      '--drift-image-height': `${imageHeight}px`,
      '--drift-gap': `${gap}px`,
      '--drift-radius': `${imageRadius}px`,
    }"
    @pointerdown="startDrag"
    @pointermove="drag"
    @pointerup="stopDrag"
    @pointercancel="stopDrag"
    @lostpointercapture.self="stopDrag"
    @pointerleave="leaveStage"
    @keydown="handleKey"
  >
    <div v-if="!ready" class="drift-still" aria-hidden="true">
      <div
        v-for="(band, index) in activeBands"
        :key="index"
        class="drift-still-row"
        :style="{
          top: `${stillRowTop(band, index)}%`,
          '--drift-row-angle': `${-(band.rotation ?? 0)}deg`,
        }"
      >
        <img
          v-for="(source, tile) in [
            ...band.images,
            ...band.images,
            ...band.images,
          ]"
          :key="tile"
          :src="source"
          alt=""
          loading="lazy"
          decoding="async"
          draggable="false"
        >
      </div>
    </div>
    <canvas
      ref="canvas"
      class="drift-canvas"
      aria-hidden="true"
      @webglcontextlost.prevent="contextLost = true"
      @webglcontextrestored="contextLost = false"
    />
  </div>
</template>

<script setup lang="ts">
import {
  useDocumentVisibility,
  useEventListener,
  useIntersectionObserver,
  usePreferredReducedMotion,
  useResizeObserver,
} from '@vueuse/core'
import type {
  createDriftRenderer,
  InfiniteDriftBand,
} from '~/utils/infinite-drift'

const props = withDefaults(
  defineProps<{
    bands: readonly InfiniteDriftBand[]
    label?: string
    height?: number | string
    imageHeight?: number
    gap?: number
    imageRadius?: number
    inertia?: number
    scrollStrength?: number
  }>(),
  {
    label: 'Infinite Drift',
    height: 760,
    imageHeight: 100,
    gap: 20,
    imageRadius: 14,
    inertia: 0.92,
    scrollStrength: 2.5,
  },
)

const stage = useTemplateRef('stage')
const canvas = useTemplateRef('canvas')
const activeBands = computed(() =>
  props.bands.filter((band) => band.images.length > 0),
)
const visibility = useDocumentVisibility()
const reducedMotion = usePreferredReducedMotion()
const inView = ref(false)
const hasEntered = ref(false)
const ready = ref(false)
const dragging = ref(false)
const contextLost = ref(false)
const canMove = computed(
  () => inView.value && visibility.value === 'visible' && ready.value,
)

let renderer: Awaited<ReturnType<typeof createDriftRenderer>> = null
let stageWidth = 0
let stageHeight = 0
let position = 0
let target = 0
let velocity = 0
let frame = 0
let lastFrameTime = 0
let lastScroll = 0
let pointer: { id: number; x: number; y: number; axis?: 'x' | 'y' } | undefined

function stillRowTop(band: InfiniteDriftBand, index: number) {
  return band.offsetY === undefined
    ? ((index + 0.5) / activeBands.value.length) * 100
    : 50 - (band.offsetY / 760) * 100
}

useIntersectionObserver(stage, ([entry]) => {
  inView.value = Boolean(entry?.isIntersecting)
  if (inView.value) hasEntered.value = true
})

function draw() {
  renderer?.draw(stageWidth, stageHeight, position)
}

useResizeObserver(stage, ([entry]) => {
  if (!entry) return
  stageWidth = Math.round(entry.contentRect.width)
  stageHeight = Math.round(entry.contentRect.height)
  if (inView.value) draw()
})

watch(
  [
    canvas,
    hasEntered,
    reducedMotion,
    contextLost,
    activeBands,
    () => props.gap,
    () => props.imageHeight,
    () => props.imageRadius,
  ],
  (
    [element, entered, motion, lost, bands, gap, imageHeight, imageRadius],
    _,
    onCleanup,
  ) => {
    if (!element || !entered || motion === 'reduce' || lost || !bands.length)
      return

    const abort = new AbortController()
    onCleanup(() => {
      abort.abort()
      renderer?.dispose()
      renderer = null
      ready.value = false
    })

    void import('~/utils/infinite-drift')
      .then(async ({ createDriftRenderer }) => {
        const next = await createDriftRenderer(
          element,
          bands,
          {
            gap: Math.max(0, gap),
            imageHeight: Math.max(1, imageHeight),
            imageRadius: Math.max(0, imageRadius),
          },
          abort.signal,
        )
        if (abort.signal.aborted) {
          next?.dispose()
          return
        }
        if (!next) return
        renderer = next
        draw()
        ready.value = true
      })
      .catch(() => {
        // Server-rendered stills remain available if WebGL cannot start.
      })
  },
)

function queueFrame() {
  if (!canMove.value || frame) return
  lastFrameTime = performance.now()
  frame = requestAnimationFrame(animate)
}

function animate(time: number) {
  frame = 0
  if (!canMove.value) return
  const frames = Math.min(3, (time - lastFrameTime) / (1000 / 60))
  lastFrameTime = time

  if (!dragging.value) {
    target += velocity * frames
    velocity *= Math.pow(Math.min(0.98, Math.max(0, props.inertia)), frames)
    if (Math.abs(velocity) < 0.08) velocity = 0
  }

  position += (target - position) * (1 - Math.pow(0.79, frames))
  const settled = !velocity && Math.abs(target - position) < 0.2
  if (settled) position = target
  draw()
  if (!settled) frame = requestAnimationFrame(animate)
}

watch(canMove, (active) => {
  if (!active) {
    cancelAnimationFrame(frame)
    frame = 0
    target = position
    velocity = 0
    dragging.value = false
    pointer = undefined
    return
  }
  lastScroll = window.scrollY
  draw()
})

useEventListener(
  'scroll',
  () => {
    const nextScroll = window.scrollY
    const delta = nextScroll - lastScroll
    lastScroll = nextScroll
    if (!canMove.value || !delta || dragging.value) return
    // Let the page keep scrolling. Its position supplies the input for the bands.
    target += Math.min(160, Math.max(-160, delta)) * props.scrollStrength
    velocity = Math.min(12, Math.max(-12, delta * 0.19))
    queueFrame()
  },
  { passive: true },
)

function startDrag(event: PointerEvent) {
  if (!canMove.value || !event.isPrimary || event.button !== 0) return
  pointer = { id: event.pointerId, x: event.clientX, y: event.clientY }
}

function drag(event: PointerEvent) {
  if (!pointer || event.pointerId !== pointer.id) return
  const dx = event.clientX - pointer.x
  const dy = event.clientY - pointer.y

  if (!pointer.axis) {
    if (Math.max(Math.abs(dx), Math.abs(dy)) < 7) return
    if (event.pointerType === 'touch' && Math.abs(dy) > Math.abs(dx)) return
    pointer.axis = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y'
    stage.value?.setPointerCapture(event.pointerId)
    dragging.value = true
  }

  const movement = pointer.axis === 'x' ? dx : dy
  pointer.x = event.clientX
  pointer.y = event.clientY
  target -= movement * 1.7
  velocity = Math.min(15, Math.max(-15, -movement * 0.35))
  queueFrame()
}

function stopDrag(event: PointerEvent) {
  if (pointer?.id !== event.pointerId) return
  pointer = undefined
  dragging.value = false
  if (event.type === 'pointercancel') velocity = 0
  queueFrame()
}

function leaveStage() {
  if (!dragging.value) pointer = undefined
}

function handleKey(event: KeyboardEvent) {
  if (!ready.value || !['ArrowLeft', 'ArrowRight'].includes(event.key)) return
  event.preventDefault()
  target += event.key === 'ArrowRight' ? 125 : -125
  velocity = 0
  queueFrame()
}
</script>

<style scoped>
.infinite-drift {
  position: relative;
  isolation: isolate;
  overflow: clip;
  width: 100%;
  container-type: size;
  background: var(--site-soft, #eff4fb);
}

.drift-ready {
  touch-action: pan-y pinch-zoom;
  cursor: grab;
  user-select: none;
}

.drift-dragging {
  cursor: grabbing;
}

.infinite-drift:focus-visible {
  outline: 2px solid var(--site-link, #064dcd);
  outline-offset: 4px;
}

.drift-still,
.drift-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.drift-canvas {
  display: block;
  visibility: hidden;
}

.drift-ready .drift-canvas {
  visibility: visible;
}

.drift-still-row {
  position: absolute;
  left: 50%;
  display: flex;
  align-items: center;
  gap: var(--drift-gap);
  width: max-content;
  transform: translate(-50%, -50%) rotate(var(--drift-row-angle));
}

.drift-still-row img {
  width: auto;
  height: min(var(--drift-image-height), 18cqh, 17cqw);
  max-width: min(calc(var(--drift-image-height) * 2.5), 46cqw);
  object-fit: cover;
  border-radius: var(--drift-radius);
}
</style>
